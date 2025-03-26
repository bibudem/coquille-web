import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Container } from '@mui/material'
import SEO from '@/components/_layout/SEO'
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

export function Head({ pageContext, location }) {
  const { frontmatter } = pageContext
  const { pathname } = location
  return (
    <>
      <html lang="fr" />
      <SEO title={frontmatter?.title} pathname={pathname}>
        <meta name="robots" content="noindex"></meta>
      </SEO>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-consent-server.js"></script>
    </>
  )
}
