import { writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { createFilePath } from 'gatsby-source-filesystem'
import getNavigationTree from './utils/getTree.js'
import getTree from './utils/getTree.js'
import createNodes from './utils/createNodes.js'
import markRoots from './utils/markRoots.js'
import { SITE_NAVIGATION_FILE_PATH } from './constants.js'

const __dirname = dirname(resolve(fileURLToPath(import.meta.url), '..', '..'))

const navigationFilePath = resolve(__dirname, SITE_NAVIGATION_FILE_PATH)

export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx' && node.internal.fileAbsolutePath?.includes('/content/')) {
    const path = createFilePath({
      node,
      getNode,
      basePath: `content`,
      trailingSlash: node.internal.contentFilePath.endsWith('index.mdx')
    })

    createNodeField({
      node,
      name: 'path',
      value: path
    })
  }
}

export const sourceNodes = ({ actions, createContentDigest, createNodeId, getNode, getNodes }) => {
  const { createNode, createParentChildLink, createNodeField } = actions
  const navigationTree = getTree()
  console.log('------------------------------- navigationTree:', JSON.stringify(navigationTree, null, 2))

  createNodes(navigationTree, getNode, createContentDigest, createNode, createParentChildLink, createNodeId)
  markRoots(getNodes, createNodeField)
}

// allSiteNavigation(filter: { fields: { isRoot: { eq: true } } }) {
export const createPages = async ({ graphql }) => {

  const { errors, data } = await graphql(`
    {
      allSiteNavigation {
        nodes {
          id
          title
          path
          hidden
          isRoot
          title
          order
          childrenSiteNavigation {
            id
            path
          }
        }
      }
    }
  `)

  if (errors) {
    errors.forEach((e) => console.error(e.toString()))
    return errors
  }

  const secondaryNavData = getNavigationTree(data.allSiteNavigation.nodes.map(({ node }) => node))

  writeFileSync(navigationFilePath, JSON.stringify(secondaryNavData))
}

export function createSchemaCustomization({ actions }) {
  const { createTypes } = actions
  createTypes(`
    type SiteNavigation implements Node {
      title: String!
      path: String
      secondaryNav: SecondaryNav
    }
    
    type SecondaryNav implements Node {
      title: String
      order: Int
      hidden: Boolean
      isRoot: Boolean
    }
  `)
}