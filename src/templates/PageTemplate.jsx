import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Box, Container, Divider, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import TopAppBar from '@/components/AppBar/TopAppBar'
import TopAppBarSm from '@/components/AppBar/TopAppBarSm'
import BottomAppBarSm from '@/components/AppBar/BottomAppBarSm'
import Footer from '@/components/Footer'
import Link from '@/components/Link'
import SEO from '@/components/SEO'
import Debug from '@/components/Debug'
import RetroactionUsager from '@/components/RetroactionUsager'

const shortcodes = { Link, Accordion, AccordionDetails, AccordionSummary, Button, Box, Divider, Tab, Tabs } // Provide common components here

export default function PageTemplate({ children }) {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  const theme = useTheme()
  console.log('theme: ', theme)
  return (
    <MDXProvider components={shortcodes}>
      {process.env.NODE_ENV !== 'production' && <Debug />}
      <udem-urgence></udem-urgence>

      {isSmall ? <TopAppBarSm /> : <TopAppBar />}

      <bib-avis bouton-fermer />
      <Container component="main" role="main">
        {children}
        <RetroactionUsager />
      </Container>
      <Footer />
      {isSmall && <BottomAppBarSm />}
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
      <title>{frontmatter?.title}</title>
      <SEO title={frontmatter?.title} pathname={pathname} />
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-avis.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-retroaction-usager.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/udem-urgence.js"></script>
    </>
  )
}
