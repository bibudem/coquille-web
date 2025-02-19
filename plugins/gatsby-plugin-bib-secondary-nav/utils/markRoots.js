import { NODE_TYPE } from '../constants.js'

const markRoots = (getNodes, createNodeField) => {
  const nodes = getNodes()

  // console.log('nodes:', JSON.stringify(nodes, null, 2))

  nodes
    .filter(({ internal: { type } }) => type === 'Mdx')
    .forEach(node => {
      // console.log('### node:', JSON.stringify(node, null, 2))
      // if (!node.parent || node.children.length) {
      // console.log('node:', JSON.stringify(node, null, 2))
      createNodeField({
        node,
        name: "isRoot",
        value: true
      })
      // }
    })
}

export default markRoots
