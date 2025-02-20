import directoryTree from 'directory-tree'

function getTree() {
  return directoryTree('content', { extensions: /\.mdx?$/, attributes: ['type'], normalizePath: true, exclude: [/^\/consent\/i/] })
}

export function getSecondaryVavTree() {
  const tree = getTree()
}