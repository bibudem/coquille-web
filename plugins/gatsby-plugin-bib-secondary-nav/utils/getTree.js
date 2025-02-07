import directoryTree from 'directory-tree'

export default () => {


  return directoryTree('content', { extensions: /\.mdx?$/, attributes: ['type'], normalizePath: true, exclude: [/^\/consent\/i/] })
}