/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import { resolve } from 'node:path'
import slugify from '@sindresorhus/slugify'

// Define the template for pages
const pageTemplate = resolve('./src/templates/PageTemplate.jsx')
const nouvelleTemplate = resolve('./src/templates/NouvelleTemplate.jsx')

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export async function createPages() {
  await doCreatePages(...arguments)
  await doCreateNouvelles(...arguments)
}

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
              secondaryNav {
                hidden
                title
                order
              }
            }
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
            }
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

export const fetchUdeMNews = async () => {
  const RSS_URL = 'https://nouvelles.umontreal.ca/recherche/export.rss?tx_solr[filter][0]=types:udem_article&q=bibliotheques/'

  try {
    const response = await fetch(RSS_URL)
    if (!response.ok) {
      console.warn(`Flux RSS indisponible (HTTP ${response.status}), retour d'une liste vide`)
      return []
    }

    const xmlText = await response.text()
    const result = await parseStringPromise(xmlText, { trim: true, explicitArray: false })

    const items = result?.rss?.channel?.item
    if (!items) return []

    return (Array.isArray(items) ? items : [items]).map(item => {
      const description = item.description || ''
      const cdataMatch = description.match(/<!\[CDATA\[(.*?)\]\]>/s)
      const cleanDescription = cdataMatch?.[1] || description

      const pubDate = item.pubDate || new Date().toISOString()
      const dateObj = new Date(pubDate)

      return {
        title: item.title?.trim() || 'Sans titre',
        link: item.link?.trim() || '#',
        description: cleanDescription.replace(/<[^>]+>/g, '').trim(),
        pubDate,
        formattedDate: dateObj.toLocaleDateString('fr', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        enclosure: item.enclosure?.$.url || null,
        creator: item['dc:creator'] || null,
        category: item.category || null,
        media: item['media:content']?.$.url || null,
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