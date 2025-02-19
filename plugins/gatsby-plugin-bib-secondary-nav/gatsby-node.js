import { writeFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { createFilePath } from 'gatsby-source-filesystem'
import getTree from './utils/getTree.js'
import getLinks from './utils/getLinks.js'
import sortLinks from './utils/sortLinks.js'
import createNodes from './utils/createNodes.js'
import markRoots from './utils/markRoots.js'
import { SITE_NAVIGATION_FILE_PATH } from './constants.js'

const __dirname = dirname(resolve(fileURLToPath(import.meta.url), '..', '..'))

const navigationFilePath = resolve(__dirname, SITE_NAVIGATION_FILE_PATH)

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
  console.log('tree:', tree.length)
  const links = getLinks(tree)
  console.log('links:', links.length)
  const sortedLinks = sortLinks(links)
  // const sortedLinks = [...links]
  console.log('------------------------------- sortedLinks:', JSON.stringify(sortedLinks))

  createNodes(sortedLinks, getNode, createContentDigest, createNode, createParentChildLink, createNodeId)
  markRoots(getNodes, createNodeField)
}

export const createPages = async ({ graphql }) => {
  // allSiteNavigation(filter: { fields: { isRoot: { eq: true } } }) {

  const { errors, data } = await graphql(`
    {
      allSiteNavigation {
        edges {
          node {
            id
            title
            pathname
            #childrenSiteNavigation {
            #  title
            #  pathname
            #  order
            #    # fields {
            #    #   isRoot
            #    # }
            #}
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

  console.log('Writing site navigation to file:', navigationFilePath, reducedData)
  writeFileSync(navigationFilePath, JSON.stringify(reducedData))
}