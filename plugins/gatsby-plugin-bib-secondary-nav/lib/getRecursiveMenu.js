import directoryTree from 'directory-tree'
import getMenuData from '../utils/getMenuData.js'

function parseTree() {
  return directoryTree('content/pages', { extensions: /\.mdx?$/, attributes: ['type'], normalizePath: true, exclude: [/^content\/pages\/consent/i] })
}

function doGetRecursiveMenu(routes) {
  const recursiveMenu = []
  const rootNodes = routes.filter(({ isRoot, parentId }) => isRoot && !parentId)
}

export default function getRecursiveMenu(routes) {
  const tree = parseTree()
  // console.log('tree:', JSON.stringify(tree, null, 2))
  const menuData = getMenuData(tree)
  console.log('menuData:', JSON.stringify(menuData, null, 2))

  return menuData

  // return Array
  //   .from(menuData)
  //   .sort(({ path: path1 }, { path: path2 }) => {
  //     const pathArray1 = path1.split("/")
  //     const pathArray2 = path2.split("/")
  //     const length1 = pathArray1.length
  //     const length2 = pathArray2.length
  //     const lengthDiff = length1 - length2
  //     const lastPartLengthDiff = pathArray1.at(-1).length - pathArray2.at(-1).length

  //     return lengthDiff === 0 ? lastPartLengthDiff : lengthDiff
  //   })
}