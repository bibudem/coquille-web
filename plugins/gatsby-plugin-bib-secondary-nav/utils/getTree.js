import directoryTree from 'directory-tree'
import getLinks from './getLinks.js'

function parseTree() {
  return directoryTree('content', { extensions: /\.mdx?$/, attributes: ['type'], normalizePath: true, exclude: [/^content\/consent/i] })
}

export default function getTree() {
  const tree = parseTree()
  const links = getLinks(tree)

  return Array
    .from(links)
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