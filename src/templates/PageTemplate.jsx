import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Box, Container, Divider, Tab, Tabs } from '@mui/material'
import AppBar from '@/components/AppBar'
import Footer from '@/components/Footer'
import Link from '@/components/Link'
import SEO from '@/components/SEO'
import Debug from '@/components/Debug'

const shortcodes = { Link, Accordion, AccordionDetails, AccordionSummary, Button, Box, Divider, Tab, Tabs } // Provide common components here

export default function PageTemplate({ children }) {
  return (
    <MDXProvider components={shortcodes}>
      {process.env.NODE_ENV !== 'production' && <Debug />}
      <udem-urgence></udem-urgence>
      <AppBar />
      <bib-avis bouton-fermer />
      <Container component="main">
        {children}

        <Box component="aside" className="article-footer" sx={{ pt: '2rem' }}>
          <bib-retroaction-usager />
        </Box>
      </Container>
      <Footer />
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
    <SEO title={frontmatter?.title} pathname={pathname}>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-avis.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-retroaction-usager.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/udem-urgence.js"></script>
    </SEO>
  )
}
