import getPageAttrs from './getPageAttrs.js'
import getNormalPath from './getNormalPath.js'

const getLinks = (tree, links = []) => {
  const { path, type, children: treeChildren = [] } = tree

  if (type === 'directory' && treeChildren) {
    treeChildren.forEach(child => {
      getLinks(child, links)
    })

    return links
  }

  const pageAttrs = getPageAttrs(path)
  if (pageAttrs) {
    const { title, order } = pageAttrs

    links.push({
      path: getNormalPath(path),
      title,
      order,
    })
  }
  return links
}

export default getLinks;

