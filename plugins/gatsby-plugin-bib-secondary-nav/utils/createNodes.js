import { ID_PREFIX, NODE_TYPE } from '../constants.js'

const createNodes = (
  sortedLinks,
  getNode,
  createContentDigest,
  createNode,
  createParentChildLink
) =>
  sortedLinks.forEach(link => {
    const nodeContent = JSON.stringify(link)
    const id = `${ID_PREFIX}${link.path}`

    const parentId = `${id
      .split("/")
      .slice(0, -2)
      .join("/")}/`
    const parent = getNode(parentId)

    const nodeMeta = {
      id,
      parent: parent && parentId,
      internal: {
        type: NODE_TYPE,
        content: nodeContent,
        contentDigest: createContentDigest(link)
      }
    }

    const node = Object.assign({}, link, nodeMeta)

    createNode(node)

    if (parent) {
      const child = getNode(id)

      if (child) {
        createParentChildLink({ parent, child })
      }
    }
  })

export default createNodes
