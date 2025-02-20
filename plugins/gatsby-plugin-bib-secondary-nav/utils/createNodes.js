import { ID_PREFIX, NODE_TYPE } from '../constants.js'

export default function createNodes(
  sortedLinks,
  getNode,
  createContentDigest,
  createNode,
  createParentChildLink,
  createNodeId
) {

  function getId(pathname) {
    return createNodeId(`${ID_PREFIX} >>> ${pathname}`)
  }

  sortedLinks.forEach(link => {
    const { isRoot, pathname } = link
    const nodeContent = JSON.stringify(link)
    const id = getId(pathname)

    // const parentId = isRoot ? getId(`${pathname
    //   .split('/')
    //   .slice(0, -2)
    //   .join('/')}/`) : getId(`${pathname
    //     .split('/')
    //     .slice(0, -1)
    //     .join('/')}/`)

    const parentPathname = `${pathname.split('/').slice(0, isRoot ? -2 : -1).join('/')}/`
    const parentId = getId(`${pathname.split('/').slice(0, isRoot ? -2 : -1).join('/')}/`)
    // console.log('Parent of %s is %s', pathname, parentPathname)

    const parent = pathname === '/' ? undefined : getNode(parentId)

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
