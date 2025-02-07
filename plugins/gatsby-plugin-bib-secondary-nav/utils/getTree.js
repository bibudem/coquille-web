import directoryTree from 'directory-tree'

// export default () => directoryTree('content', { extensions: /\.mdx?$/ })

export default () => {


  return directoryTree('content', { extensions: /\.mdx?$/ })
}