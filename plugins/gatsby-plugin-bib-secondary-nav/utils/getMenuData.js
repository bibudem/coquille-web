import getPageAttrs from './getPageAttrs.js'
import getNormalPath from './getNormalPath.js'

function isRoot(path) {
  // Get all paths pointing to a section
  return path.endsWith('index.mdx') && path.replace(/^content\/pages\//i, '').split('/').filter(item => item).length === 2
}

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
    // const lvl = getNormalPath(path).split('/').filter(item => item).length

    links.push({
      ...pageAttrs,
      path: getNormalPath(path),
      isRoot: isRoot(path),
      // lvl
    })
  }

  return links
}



