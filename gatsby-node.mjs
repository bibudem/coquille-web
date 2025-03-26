/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import { resolve } from 'node:path'
import slugify from '@sindresorhus/slugify'
import readingTime from 'reading-time'

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
    // console.log(node.parent)

    const template = node.childMdx?.frontmatter?.template
    const templateFullPath = template ? resolve(`./src/templates/${template.substring(0, 1).toUpperCase()}${template.substring(1)}Template.jsx`) : pageTemplate

    const basePath = node.relativeDirectory ? `/${node.relativeDirectory}` : ''
    const path = `${basePath}/${(node.frontmatter?.slug ?? slugify(node.name)).replace(/index$/i, '')}`

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
              imageAlt
              imageCaption
              imageName
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

  // Create blog pages pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  pages.forEach(node => {
    // console.log(node.parent)

    const template = node.childMdx?.frontmatter?.template
    const templateFullPath = template ? resolve(`./src/templates/${template.substring(0, 1).toUpperCase()}${template.substring(1)}Template.jsx`) : nouvelleTemplate

    const basePath = node.relativeDirectory ? `/nouvelles/${node.relativeDirectory}` : '/nouvelles'
    const path = `${basePath}/${(node.frontmatter?.slug ?? slugify(node.name)).replace(/index$/i, '')}`

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

export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body)
    })
  }
}