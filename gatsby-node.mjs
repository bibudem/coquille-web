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
    const rawSlug = (node.childMdx?.frontmatter?.slug ?? slugify(node.name)).replace(/index$/i, '');
    const path = `${basePath}/${rawSlug}`.replace(/\/+$/, '') + '/';

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

const fetchUdeMNews = async () => {
  try {
    const response = await fetch('https://nouvelles.umontreal.ca/rss/sujets/bibliotheques/')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const xmlText = await response.text()
    const result = await parseStringPromise(xmlText)

    return result.rss.channel[0].item.map(item => {
      const description = item.description?.[0] || ''
      const cdataContent = description.match(/<!\[CDATA\[(.*?)\]\]>/s)?.[1] || description

      return {
        title: item.title?.[0]?.trim() || 'Sans titre',
        link: item.link?.[0]?.trim() || '#',
        description: cdataContent.trim(),
        pubDate: item.pubDate?.[0] || new Date().toISOString(),
        enclosure: item.enclosure?.[0]?.$?.url || null,
        formattedDate: new Date(item.pubDate?.[0] || Date.now()).toLocaleDateString('fr', {
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