import { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Container, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { IconContext } from '@phosphor-icons/react'

import TopAppBar from '@/components/AppBar/TopAppBar'
import TopAppBarSm from '@/components/AppBar/TopAppBarSm'
import MenuLatteral from '@/components/MenuLatteral/MenuLatteral'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import SEO from '@/components/SEO'
import Debug from '@/components/Debug'
import RetroactionUsager from '@/components/RetroactionUsager'

import { useSmall } from '@/hooks/use-small'
import { SecondaryNav } from '@/components/SecondaryNav/SecondaryNav'

import commonComponents from './commonComponents'

function getCurrentPageLevel(location) {
  return location.pathname.split('/').length - 1
}

export default function PageTemplate({ pageContext, children, data, location }) {
  const isSmall = useSmall('lg')
  const theme = useTheme()
  const [hasSecondaryNav, setHasSecondaryNav] = useState(false)
  const [lvl, setLvl] = useState(getCurrentPageLevel(location))

  useEffect(() => {
    setLvl(getCurrentPageLevel(location))
  }, [location])

  useEffect(() => {
    const navLvl = location.pathname.split('/').length
    setHasSecondaryNav(navLvl > 2)
  }, [location])

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
    <MDXProvider components={commonComponents}>
      <IconContext.Provider
        value={{
          size: '2rem',
          color: theme.palette.grey['700'],
        }}
      >
        {process.env.NODE_ENV !== 'production' && <Debug />}

        <udem-urgence></udem-urgence>

        {isSmall ? <TopAppBarSm /> : <TopAppBar lvl={lvl} />}

        {/* <bib-avis bouton-fermer /> */}

        <MenuLatteral />

        {hasSecondaryNav ? (
          <Container maxWidth="xl" sx={{ px: '64px' }}>
            <Grid
              container
              spacing={{
                xs: 1,
                sm: 3,
                lg: 4,
              }}
            >
              <Grid size={3}>
                <SecondaryNav currentLocation={location} />
              </Grid>
              <Grid size={9}>{mainContent}</Grid>
            </Grid>
          </Container>
        ) : (
          <>{mainContent}</>
        )}

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
