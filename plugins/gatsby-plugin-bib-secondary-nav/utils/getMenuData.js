import getPageAttrs from './getPageAttrs.js'
import getNormalPath from './getNormalPath.js'

export default function getMenuData(tree, links = []) {

  const { path, type, children: children = [] } = tree

  if (type === 'directory' && children) {
    children.forEach(child => {
      getMenuData(child, links)
    })

    return links
  }

  const pageAttrs = getPageAttrs(path)

  if (pageAttrs) {
    const { title, order, hidden } = pageAttrs

    links.push({
      path: getNormalPath(path),
      title,
      order,
      hidden,
      isRoot: path.endsWith('index.mdx'),
    })
  }

  return links
}

function sortFn(item1, item2) {
  const { order: sortOrder1 = Infinity } = item1
  const { order: sortOrder2 = Infinity } = item2

  return sortOrder1 - sortOrder2
}



