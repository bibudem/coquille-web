import directoryTree from 'directory-tree'
import getMenuData from './getMenuData.js'

function parseTree() {
  return directoryTree('content/pages', { extensions: /\.mdx?$/, attributes: ['type'], normalizePath: true, exclude: [/^content\/pages\/consent/i] })
}

export default function getTree() {
  const tree = parseTree()
  const menuData = getMenuData(tree)

  return Array
    .from(menuData)
    .sort(({ path: path1 }, { path: path2 }) => {
      const pathArray1 = path1.split("/")
      const pathArray2 = path2.split("/")
      const length1 = pathArray1.length
      const length2 = pathArray2.length
      const lengthDiff = length1 - length2
      const lastPartLengthDiff = pathArray1.at(-1).length - pathArray2.at(-1).length

      return lengthDiff === 0 ? lastPartLengthDiff : lengthDiff
    })
}