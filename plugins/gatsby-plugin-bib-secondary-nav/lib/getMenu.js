import directoryTree from 'directory-tree'
import escape from 'regexp.escape'
import getMenuData from '../utils/getMenuData.js'

function parseTree() {
  return directoryTree('content/pages', { extensions: /\.mdx?$/, attributes: ['type'], normalizePath: true, exclude: [/^content\/pages\/consent/i] })
}

function buildRecursiveMenu(nodes, menuData) {

  function sortChildren(item1, item2) {
    const sortOrder1 = item1.order ?? Infinity
    const sortOrder2 = item2.order ?? Infinity

    return sortOrder1 - sortOrder2
  }

  function getChildrenNodes(node) {
    const childPathRegEx = new RegExp(`${escape(node.path)}[^\/]+(\/)?$`)

    return menuData.filter(item => childPathRegEx.test(item.path)).sort(sortChildren)
  }

  function doBuildRecursiveMenu(node) {
    const childrenNodes = getChildrenNodes(node)
    const children = childrenNodes.map(node => doBuildRecursiveMenu(node))
    const { isRoot, hidden, ...props } = node

    const menuItem = {
      ...props
    }

    if (children.length > 0) {
      menuItem.children = children
    }

    return menuItem
  }

  return nodes.map(node => doBuildRecursiveMenu(node, []))
}

export default function getMenu() {
  const tree = parseTree()
  const menuData = getMenuData(tree)
  // const menuIndex = new Map(menuData.map(item => ([item.path, item])))
  const rootNodes = menuData.filter(item => item.isRoot)
  const menu = buildRecursiveMenu(rootNodes, menuData)

  return menu
}