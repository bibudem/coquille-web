import { createFilePath } from 'gatsby-source-filesystem'
import { trailingSlash } from '../../gatsby-config.mjs'

export const onPreInit = () => console.log("################################ Loaded gatsby-plugin-bib-secondary-nav")

export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx' /* && node.fileAbsolutePath?.includes('/content/') */) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `content`
    })

    createNodeField({
      node,
      name: 'awef',
      value: slug,
      trailingSlash
    })

    console.log('node:', node)
  }
}