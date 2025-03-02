import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Tab, Tabs, useTheme } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import Carousel from 'react-material-ui-carousel'
import { IconContext } from '@phosphor-icons/react'

import TopAppBar from '@/components/AppBar/TopAppBar'
import TopAppBarSm from '@/components/AppBar/TopAppBarSm'
import MenuLatteral from '@/components/MenuLatteral/MenuLatteral'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import Link from '@/components/Link'
import SEO from '@/components/SEO'
import Debug from '@/components/Debug'
import RetroactionUsager from '@/components/RetroactionUsager'
import Section from '@/components/Section'
import CallToAction1 from '@/components/CallToAction1'
import CallToAction2 from '@/components/CallToAction2'
import Button from '@/components/Button'
import IconInSquare from '@/components/IconInSquare'
import Card1 from '@/components/Card1'
import Card2 from '@/components/Card2'
import Card3 from '@/components/Card3'
import Carousel1 from '@/components/Carousel1/Carousel1'

import CommentIcon from '@mui/icons-material/Comment'

import { useSmall } from '@/hooks/use-small'
import { Hero, Bloc } from '@/components/dummy-components'

const components = { Link, Accordion, AccordionDetails, AccordionSummary, Button, Box, CallToAction1, CallToAction2, Card1, Card2, Card3, Carousel, Carousel1, Divider, Grid, IconInSquare, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CommentIcon, Section, Tab, Tabs, Typography, /* Dummies: */ Hero, Bloc } // Provide common components here

export default function PageTemplate({ pageContext, children, data, location }) {
  const isSmall = useSmall('lg')
  const theme = useTheme()

  if (typeof window !== 'undefined') {
    window.bib = window.bib || {}
    window.bib.theme = theme
    console.log('window.bib.theme:', window.bib.theme)
  }

  const {
    breadcrumb: { crumbs },
  } = pageContext

  const mainContent = (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <main role="main">
        {children}
        <RetroactionUsager />
      </main>
    </>
  )

  return (
    <MDXProvider components={components}>
      <IconContext.Provider
        value={{
          size: '2rem',
          color: theme.palette.grey['700'],
        }}
      >
        {process.env.NODE_ENV !== 'production' && <Debug />}

        <udem-urgence></udem-urgence>

        {isSmall ? <TopAppBarSm /> : <TopAppBar />}

        {/* <bib-avis bouton-fermer /> */}

        <MenuLatteral />

        {mainContent}

        <Footer />

        <bib-consent server-request-timeout="5000"></bib-consent>
      </IconContext.Provider>
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
      <SEO title={frontmatter?.title} pathname={pathname} />
      <bib-gtm></bib-gtm>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-gtm.js"></script>
      {/* <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-avis.js"></script> */}
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-retroaction-usager.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/udem-urgence.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-consent.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-consent-preferences-btn.js"></script>
    </>
  )
}
