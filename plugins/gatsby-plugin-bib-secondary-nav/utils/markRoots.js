import { NODE_TYPE } from '../constants.js'

const markRoots = (getNodes, createNodeField) => {
  const nodes = getNodes()

  console.log('nodes:', JSON.stringify(nodes, null, 2))

  nodes
    .filter(({ internal: { type } }) => type === NODE_TYPE)
    .forEach(node => {
      if (!node.parent || node.children.length) {
        createNodeField({
          node,
          name: "isRoot",
          value: true
        })
      }
    })
}

export default markRoots
