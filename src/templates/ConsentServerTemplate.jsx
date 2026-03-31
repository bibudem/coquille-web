import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Container } from '@mui/material'
import Debug from '@/components/_layout/Debug'

export default function PageTemplate({ children }) {
  return (
    <MDXProvider>
      {process.env.NODE_ENV !== 'production' && <Debug />}
      <Container component="main" role="main">
        {children}
      </Container>
    </MDXProvider>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`

export function Head({ pageContext }) {
  const { frontmatter } = pageContext
  return (
    <>
      <html lang="fr" />
      <title>{frontmatter?.title}</title>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@1.3.10/dist/bib-consent-server.js"></script>
      <meta name="robots" content="noindex"></meta>
    </>
  )
}
