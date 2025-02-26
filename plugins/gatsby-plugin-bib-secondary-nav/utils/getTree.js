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
    .sort(({ route: route1 }, { route: route2 }) => {
      const routeArray1 = route1.split("/")
      const routeArray2 = route2.split("/")
      const length1 = routeArray1.length
      const length2 = routeArray2.length
      const lengthDiff = length1 - length2
      const lastPartLengthDiff = routeArray1.at(-1).length - routeArray2.at(-1).length

      return lengthDiff === 0 ? lastPartLengthDiff : lengthDiff
    })
}