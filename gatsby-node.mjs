/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import { resolve } from 'node:path'
import { mkdir, writeFile } from 'node:fs/promises'
import slugify from '@sindresorhus/slugify'
import { bibliotheques } from './src/utils/bibliotheques.js'

// Define the template for pages
const pageTemplate = resolve('./src/templates/PageTemplate.jsx')
const nouvelleTemplate = resolve('./src/templates/NouvelleTemplate.jsx')

// ---------------------------------------------------------------------------
// Moteur de recherche du site (voir aussi src/hooks/use-search-index.jsx et
// src/components/_layout/AppBar/SearchOverlay.jsx pour la partie client).
//
// Principe : à chaque build (ou redémarrage de `gatsby develop`), on constitue
// ici un tableau plat `searchEntries` à partir des différentes sources de
// contenu du site (pages, nouvelles, bibliothèques, personnel), puis on
// l'écrit tel quel dans public/search-index.json. Ce fichier statique est
// ensuite chargé et indexé côté navigateur avec MiniSearch — il n'y a donc
// aucun service de recherche externe à maintenir.
// ---------------------------------------------------------------------------

// Entrées accumulées pour l'index de recherche du site, écrites dans public/search-index.json
const searchEntries = []

// Pages utilitaires/démo à ne jamais exposer dans la recherche du site
const SEARCH_EXCLUDED_DIR_PREFIXES = ['dev', 'consent']
const SEARCH_EXCLUDED_NAMES = ['tests', 'fiche-personnel', 'widget-horaire']

// N'indexer que le contenu réellement destiné au grand public : en plus des
// dossiers/fichiers de démo ci-dessus, on exclut toute page marquée `noIndex`
// (ou `noindex`, la casse est incohérente selon les fichiers de contenu) —
// ce champ existant sert déjà à dire aux moteurs de recherche externes de ne
// pas indexer la page (voir HtmlHead.jsx) ; la recherche interne du site doit
// respecter le même signal plutôt que de la faire ressortir quand même.
function isSearchExcluded(node) {
  const dir = node.relativeDirectory ?? ''
  if (SEARCH_EXCLUDED_DIR_PREFIXES.some(prefix => dir === prefix || dir.startsWith(`${prefix}/`))) {
    return true
  }
  if (SEARCH_EXCLUDED_NAMES.includes(node.name)) {
    return true
  }
  const frontmatter = node.childMdx?.frontmatter
  return Boolean(frontmatter?.noIndex || frontmatter?.noindex)
}

// Motifs identifiant une ligne entièrement composée de code JS/JSX (pas de texte à en tirer)
const CODE_LINE_PATTERNS = [
  /^(import|export)\b/,
  /^(const|let|var|return)\b/,
  /=>|function\s*\(|useEffect\(|useState\(|require\(/,
  /^(document|window|script)\./,
  /^[\w-]+=("[^"]*"|'[^']*'|\{[^{}]*\})\s*$/, // ligne = un seul attribut JSX, ex: title="Aménagement"
  /^("[\w-]+"|'[\w-]+'|[\w-]+):\s+\S/, // ligne = une propriété d'objet JS, ex: width: '100%', ou 'aria-label': ariaLabel || label,
  /^["'][\w-]+["'],?$/, // ligne = un seul token entre guillemets, ex: "top" (valeur de template literal CSS)
]

function isCodeLikeLine(line) {
  const trimmed = line.trim()
  if (!trimmed) return true
  return CODE_LINE_PATTERNS.some(pattern => pattern.test(trimmed))
}

/**
 * Construit un extrait texte à partir du MDX brut, sans passer par la compilation
 * MDX (qui retraiterait les images via gatsby-remark-images/sharp pour chaque page
 * et fait exploser la mémoire du build). Le contenu de ce site mélange du texte
 * narratif avec beaucoup de composants JSX imbriqués sur plusieurs lignes ; on
 * traite donc chaque ligne individuellement : on écarte les lignes 100% code,
 * on retire les balises/expressions des lignes restantes (en gardant le texte
 * qu'elles enveloppent, ex. `<p>Bibliothèque d'aménagement</p>`), puis on ne
 * garde que ce qui contient encore du vrai texte une fois nettoyé.
 */
function makeExcerpt(rawBody, length = 200) {
  if (!rawBody) return ''

  const plainText = rawBody
    .split('\n')
    .filter(line => !isCodeLikeLine(line))
    .map(line => line.replace(/<[^>]*>/g, ' ').replace(/\{[^{}]*\}/g, ' '))
    .filter(line => !/[<>{}]/.test(line)) // reste d'une balise/prop JSX étalée sur plusieurs lignes
    .filter(line => /\p{L}{3,}/u.test(line)) // ne garder que les lignes avec du texte réel
    .join(' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (plainText.length <= length) return plainText
  return `${plainText.slice(0, length).trim()}…`
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export async function createPages(api) {
  await doCreatePages(api) // alimente searchEntries avec la section "Pages"
  await doCreateNouvelles(api) // alimente searchEntries avec la section "Nouvelles"
  indexBibliotheques() // alimente searchEntries avec la section "Bibliothèques"
  await doIndexPersonnel(api) // alimente searchEntries avec la section "Personnel"
  await writeSearchIndex(api.reporter) // écrit le tout dans public/search-index.json
}

/**
 * Les fiches de bibliothèques (content/bibliotheques/*.mdx) ne sont pas des
 * pages autonomes : ce sont des composants JSX (props sur plusieurs lignes,
 * pas de frontmatter) assemblés dans une seule page "/espaces/", chaque fiche
 * étant une simple ancre (id="amenagement", etc.). Plutôt que de parser ce
 * JSX, on réutilise la liste déjà propre et structurée de
 * src/utils/bibliotheques.js (la même que celle utilisée par
 * RepertoirePersonnel.jsx pour faire correspondre une bibliothèque à son id).
 */
function indexBibliotheques() {
  bibliotheques.forEach(({ id, titre, autreTitre }) => {
    searchEntries.push({
      title: titre,
      excerpt: autreTitre && autreTitre !== titre ? autreTitre : '',
      url: `/espaces/#${id}`,
      section: 'Bibliothèques',
    })
  })
}

/**
 * Le répertoire du personnel n'est pas non plus composé de pages MDX : les
 * données viennent d'un fichier Excel (content/personnel/liste-personnel.xlsx)
 * exposé en GraphQL par gatsby-transformer-excel. Il n'existe pas de fiche/URL
 * par personne (voir RepertoirePersonnel.jsx, qui est un annuaire filtrable
 * côté client) : on pointe donc chaque entrée vers /nous-joindre/notre-equipe/?q=<nom>
 * — la vraie page de l'annuaire utilisée partout ailleurs sur le site (contrairement
 * à /personnel/, qui rend le même composant mais n'est pas la page promue) —
 * et RepertoirePersonnel.jsx se charge de préremplir sa recherche avec ce `q`.
 */
async function doIndexPersonnel({ graphql, reporter }) {
  const result = await graphql(`
    query SearchPersonnelQuery {
      allListePersonnelXlsxSheet1 {
        nodes {
          nom
          prenom
          fonction
          direction
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading the personnel directory for the search index`, result.errors)
    return
  }

  result.data.allListePersonnelXlsxSheet1.nodes.forEach(person => {
    const fullName = `${person.prenom ?? ''} ${person.nom ?? ''}`.trim()
    if (!fullName) return

    searchEntries.push({
      title: fullName,
      excerpt: [person.fonction, person.direction].filter(Boolean).join(' — '),
      url: `/nous-joindre/notre-equipe/?q=${encodeURIComponent(fullName)}`,
      section: 'Personnel',
    })
  })
}

// Écrit directement dans public/ (et non via onPostBuild) pour que le fichier
// soit aussi généré — et servi par le serveur de dev — en mode `gatsby develop`,
// pas seulement lors d'un `gatsby build` de production.
async function writeSearchIndex(reporter) {
  await mkdir('public', { recursive: true })
  await writeFile('public/search-index.json', JSON.stringify(searchEntries), 'utf-8')
  reporter.info(`[search] Index de recherche généré avec ${searchEntries.length} entrées`)
}

// Note pour l'index de recherche : le champ 'body' ci-dessous (MDX brut, sans
// frontmatter) est volontairement utilisé au lieu du champ 'excerpt' du plugin
// MDX. Ce dernier recompile toute la page (retraitement des images compris)
// juste pour produire l'extrait, ce qui fait exploser la mémoire du build sur
// l'ensemble des pages. 'body' est lu tel quel puis nettoyé par makeExcerpt().
async function doCreatePages({ graphql, actions, reporter }) {
  const { createPage } = actions

  // Get all markdown pages
  const result = await graphql(`
    query PagesQuery {
      allFile(filter: {sourceInstanceName: {eq: "pages"}, extension: {eq: "mdx"}}) {
        nodes {
          id
          name
          relativeDirectory
          absolutePath
          internal {
            contentFilePath
          }
          childMdx {
            frontmatter {
              slug
              title
              template
              noIndex
              noindex
              secondaryNav {
                hidden
                title
                order
              }
            }
            body
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your pages`, result.errors)
    return
  }

  const pages = result.data.allFile.nodes

  // Create blog pages pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  pages.forEach(node => {
    const template = node.relativeDirectory?.startsWith('nouvelles/') ? 'nouvelle' : node.childMdx?.frontmatter?.template
    const templateFullPath = template ? resolve(`./src/templates/${template.substring(0, 1).toUpperCase()}${template.substring(1)}Template.jsx`) : pageTemplate

    const basePath = node.relativeDirectory ? `/${node.relativeDirectory}` : ''
    //const path = `${basePath}/${(node.frontmatter?.slug ?? slugify(node.name)).replace(/index$/i, '')}`
    const slugPart = (node.frontmatter?.slug ?? slugify(node.name)).replace(/index$/i, '')
    const path = `${basePath}/${slugPart}`.replace(/\/+$/, '') + '/'

    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${templateFullPath}?__contentFilePath=${node.absolutePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id }
    })

    // On alimente l'index de recherche ici (plutôt que dans une passe séparée)
    // pour réutiliser exactement le `path` déjà calculé pour createPage — ainsi
    // l'URL indexée correspond toujours à la vraie page générée.
    const title = node.childMdx?.frontmatter?.title
    if (title && !isSearchExcluded(node)) {
      searchEntries.push({
        title,
        excerpt: makeExcerpt(node.childMdx?.body),
        url: path,
        section: 'Pages',
      })
    }
  })
}

async function doCreateNouvelles({ graphql, actions, reporter }) {
  const { createPage } = actions

  // Get all markdown pages
  const result = await graphql(`
    query NouvellesQuery {
      allFile(filter: {sourceInstanceName: {eq: "nouvelles"}, extension: {eq: "mdx"}}) {
        nodes {
          id
          name
          relativeDirectory
          absolutePath
          internal {
            contentFilePath
          }
          childMdx {
            frontmatter {
              authors
              date(formatString: "LL", locale: "fr")
              newsImage {
                name
                alt
                legend
                source
              }
              newsUrl
              slug
              source
              title
              template
              type
              noIndex
              noindex
            }
            body
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your pages`, result.errors)
    return
  }

  const pages = result.data.allFile.nodes

  // Create pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  pages.forEach(node => {

    const template = node.childMdx?.frontmatter?.template
    const templateFullPath = template ? resolve(`./src/templates/${template.substring(0, 1).toUpperCase()}${template.substring(1)}Template.jsx`) : nouvelleTemplate

    const basePath = node.relativeDirectory ? `/nouvelles/${node.relativeDirectory}` : '/nouvelles'
    //const path = `${basePath}/${(node.childMdx?.frontmatter?.slug ?? slugify(node.name)).replace(/index$/i, '')}`
    const rawSlug = (node.childMdx?.frontmatter?.slug ?? slugify(node.name)).replace(/index$/i, '')
    const path = `${basePath}/${rawSlug}`.replace(/\/+$/, '') + '/'

    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${templateFullPath}?__contentFilePath=${node.absolutePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id }
    })

    // Même principe que dans doCreatePages : on réutilise le `path` déjà calculé.
    const title = node.childMdx?.frontmatter?.title
    if (title && !isSearchExcluded(node)) {
      searchEntries.push({
        title,
        excerpt: makeExcerpt(node.childMdx?.body),
        url: path,
        section: 'Nouvelles',
      })
    }
  })
}

// export const onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `Mdx`) {
//     console.log('[onCreateNode]', node.frontmatter?.slug, node.name)
//     if (typeof node.frontmatter?.slug === 'undefined' && typeof node.name === 'undefined') {
//       console.log(Object.entries(node))
//     }
//     const basePath = node.relativeDirectory ? `/${node.relativeDirectory}` : ''
//     createNodeField({
//       node,
//       name: `pathz`,
//       value: `${basePath}/${(node.frontmatter?.slug ?? slugify(node.name)).replace(/index$/i, '')}`
//     })
//   }
// }

/**
 * Ce module gère la récupération et l’intégration des nouvelles externes provenant du flux RSS
 * des nouvelles de l’Université de Montréal (UdeM).
 * La liste des nouvelles se met à jour uniquement lorsqu’on fait un build du site.
 */
import { parseStringPromise } from 'xml2js'
import fetch from 'node-fetch'

const fetchUdeMNews = async () => {
  try {
    const response = await fetch('https://nouvelles.umontreal.ca/recherche/export.rss?tx_solr[filter][0]=types:udem_article&tx_solr[filter][1]=services:les-bibliotheques')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const xmlText = await response.text()
    const result = await parseStringPromise(xmlText)

    return result.rss.channel[0].item.map(item => {
      const pubDate = item.pubDate ? new Date(item.pubDate?.[0]) : new Date().toISOString()
      const description = item.description?.[0] || ''
      const cdataContent = description.match(/<!\[CDATA\[(.*?)\]\]>/s)?.[1] || description

      return {
        title: item.title?.[0]?.trim() || 'Sans titre',
        link: item.link?.[0]?.trim() || '#',
        description: cdataContent.trim(),
        pubDate: pubDate.toISOString(),
        enclosure: item.enclosure?.[0]?.$?.url || null,
        formattedDate: pubDate.toLocaleDateString('fr', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      }
    })
  } catch (error) {
    console.error('Erreur lors du fetch RSS UdeM:', error)
    return []
  }
}

function formatDate(dateString) {
  if (!dateString) return ''

  // Si la date est déjà formatée en français (venant de GraphQL)
  if (dateString.match(/\d{1,2} \w+ \d{4}/)) {
    return dateString
  }

  // Pour les dates ISO ou autres formats
  const date = new Date(dateString)
  return date.toLocaleDateString('fr', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export async function sourceNodes({ actions, createNodeId, createContentDigest }) {
  const { createNode } = actions

  const udeMNews = await fetchUdeMNews()

  udeMNews.forEach((item, index) => {
    const nodeData = {
      ...item,
      type: 'udem',
    }

    createNode({
      ...nodeData,
      id: createNodeId(`udem-news-${index}`),
      internal: {
        type: 'UdemNews',
        contentDigest: createContentDigest(nodeData),
      },
    })
  })
}