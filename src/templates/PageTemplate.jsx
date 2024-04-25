import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Box, Container, Divider, Tab, Tabs } from '@mui/material'
import '@bibudem/ui/dist/bib-avis.js'
import AppBar from '@/components/AppBar'
import Footer from '@/components/Footer'
import Link from '@/components/Link'
import SEO from '@/components/SEO'
import RetroactionUsager from '@/components/RetroactionUsager'

const shortcodes = { Link, Accordion, AccordionDetails, AccordionSummary, Button, Box, Divider, Tab, Tabs } // Provide common components here

export default function PageTemplate({ children }) {
  return (
    <MDXProvider components={shortcodes}>
      <AppBar />
      <bib-avis bouton-fermer />
      <Container component="main">{children}</Container>
      <RetroactionUsager />
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
  return <SEO title={frontmatter?.title} pathname={pathname} />
}
