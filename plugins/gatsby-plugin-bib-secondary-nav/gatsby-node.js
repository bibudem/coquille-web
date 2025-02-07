import { createFilePath } from 'gatsby-source-filesystem'
import { NODE_TYPE } from './constants.js'
import getTree from './utils/getTree.js'

export const onPreInit = () => console.log("################################ Loaded gatsby-plugin-bib-secondary-nav")

export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx' /* && node.fileAbsolutePath?.includes('/content/') */) {
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

    // console.log('node:', node)
  }
}

export const sourceNodes = ({ actions, createContentDigest, createNodeId, getNode, getNodes, graphql }) => {
  const { createNode, createParentChildLink, createNodeField } = actions
  console.log('graphql:', graphql)
  const tree = getTree()
  console.log('tree:', JSON.stringify(tree, null, 2))
  // Your arbitrary, serializable data
  const yourData = {
    hello: `world`,
  }

  const node = {
    ...yourData,
    // Required fields
    id: createNodeId(`some-string`),
    internal: {
      type: NODE_TYPE,
      contentDigest: createContentDigest(yourData)
    }
  }

  createNode(node)
}