import { ID_PREFIX, NODE_TYPE } from '../constants.js'

export default function createNodes(
  sortedLinks,
  getNode,
  createContentDigest,
  createNode,
  createParentChildLink,
  createNodeId
) {

  function getId(path) {
    return createNodeId(`${ID_PREFIX} >>> ${path}`)
  }

  sortedLinks.forEach(link => {
    const { isRoot, path } = link
    const nodeContent = JSON.stringify(link)
    const id = getId(path)

    // const parentId = isRoot ? getId(`${path
    //   .split('/')
    //   .slice(0, -2)
    //   .join('/')}/`) : getId(`${path
    //     .split('/')
    //     .slice(0, -1)
    //     .join('/')}/`)

    const parentId = getId(`${path.split('/').slice(0, isRoot ? -2 : -1).join('/')}/`)

    const parent = path === '/' ? undefined : getNode(parentId)

    const nodeMeta = {
      id,
      parentId: parent && parentId,
      internal: {
        type: NODE_TYPE,
        content: nodeContent,
        contentDigest: createContentDigest(link)
      },
    }

    const node = Object.assign({}, link, nodeMeta)

    // console.log('new node:', JSON.stringify(node, null, 2))

    createNode(node)

    if (parent) {
      const child = getNode(id)

      if (child) {
        createParentChildLink({ parent, child })
      }
    }
  })
}
