import { writeFileSync } from 'node:fs'
import { createFilePath } from 'gatsby-source-filesystem'
import getTree from './utils/getTree.js'
import getLinks from './utils/getLinks.js'
import sortLinks from './utils/sortLinks.js'
import createNodes from './utils/createNodes.js'
import markRoots from './utils/markRoots.js'

export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx' && node.internal.fileAbsolutePath?.includes('/content/')) {
    const pathname = createFilePath({
      node,
      getNode,
      basePath: `content`,
      trailingSlash: node.internal.contentFilePath.endsWith('index.mdx')
    })

    createNodeField({
      node,
      name: 'pathname',
      value: pathname
    })
  }
}

export const sourceNodes = ({ actions, createContentDigest, createNodeId, getNode, getNodes }) => {
  const { createNode, createParentChildLink, createNodeField } = actions

  const tree = getTree()
  const links = getLinks(tree)
  const sortedLinks = sortLinks(links)

  createNodes(sortedLinks, getNode, createContentDigest, createNode, createParentChildLink)
  markRoots(getNodes, createNodeField)
}

export const createPages = async ({ graphql }) => {
  const { errors, data } = await graphql(`
    {
      # allSiteNavigation(filter: { fields: { isRoot: { eq: true } } }) {
      allSiteNavigation {
        edges {
          node {
            title
            path
            childrenSiteNavigation {
              title
              path
              order
              # fields {
              #   isRoot
              # }
            }
          }
        }
      }
    }
  `)

  if (errors) {
    errors.forEach((e) => console.error(e.toString()))
    return errors
  }

  const reducedData = data.allSiteNavigation.edges.map(({ node }) => node)

  writeFileSync('public/site-navigation.json', JSON.stringify(reducedData))
}