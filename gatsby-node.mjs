/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import { resolve } from 'node:path'
import { createFilePath } from 'gatsby-source-filesystem'
import slugify from '@sindresorhus/slugify'

// Define the template for blog page
const pageTemplate = resolve('./src/templates/PageTemplate.jsx')

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export const createPages = async ({ graphql, actions, reporter, getNode }) => {
  const { createPage } = actions

  // Get all markdown blog pages sorted by date
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your pages`, result.errors)
    return
  }

  const pages = result.data.allMdx.nodes

  // Create blog pages pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  pages.forEach(node => {
    // console.log('node: %o', node)
    // console.log(node.parent)

    const basePath = node.parent ? `/${getNode(node.parent).relativeDirectory}` : ''
    const path = `${basePath}/${(node.frontmatter.slug ?? slugify(getNode(node.parent).name)).replace(/index$/i, '')}`

    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${pageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
// export const onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `Mdx`) {
//     console.log(getNode(node.parent))
//     // const slug = node.frontmatter.slug ?? `/${slugify(node.frontmatter.title)}`
//     const pathBase = node.relativeDirectory
//     const path = `/${getNode(node.parent).relativeDirectory}/${(node.frontmatter.slug ?? slugify(getNode(node.parent).name)).replace(/index$/i, '')}`

//     createNodeField({
//       node,
//       name: `path`,
//       value: path
//     })
//   }
// }

// /**
//  * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
//  */
// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions

//   // Explicitly define the siteMetadata {} object
//   // This way those will always be defined even if removed from gatsby-config.js

//   // Also explicitly define the Markdown frontmatter
//   // This way the "MarkdownRemark" queries will return `null` even when no
//   // blog pages are stored inside "content/blog" instead of returning an error
//   createTypes(`
//     type SiteSiteMetadata {
//       author: Author
//       siteUrl: String
//       social: Social
//     }

//     type Author {
//       name: String
//       summary: String
//     }

//     type Social {
//       twitter: String
//     }

//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//       fields: Fields
//     }

//     type Frontmatter {
//       title: String
//       description: String
//       date: Date @dateformat
//     }

//     type Fields {
//       slug: String
//     }
//   `)
// }