import { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Container, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { IconContext } from '@phosphor-icons/react'

import TopAppBar from '@/components/_layout/AppBar/TopAppBar'
import TopAppBarSm from '@/components/_layout/AppBar/TopAppBarSm'
import { QuickLinks, QuickLinksSm } from '@/components/_layout/QuickLinks'
import Footer from '@/components/_layout/Footer/Footer'
import Breadcrumbs from '@/components/_layout/Breadcrumbs/Breadcrumbs'
import SEO from '@/components/_layout/SEO'
import Debug from '@/components/_layout/Debug'
import RetroactionUsager from '@/components/RetroactionUsager'

import { useSmall } from '@/hooks/use-small'
import { SecondaryNav } from '@/components/_layout/SecondaryNav/SecondaryNav'

import commonComponents from './commonComponents'

function getCurrentPageLevel(location) {
  // const pathname = location.pathname.endsWith('/') ? location.pathname.slice(1) : location.pathname
  return location.pathname.split('/').filter((item) => item).length
}

export default function PageTemplate({ pageContext, children, data, location }) {
  const isSmall = useSmall('md')
  const isMedium = useSmall('lg')
  const theme = useTheme()
  const [hasSecondaryNav, setHasSecondaryNav] = useState(false)
  const [lvl, setLvl] = useState(getCurrentPageLevel(location))

  useEffect(() => {
    setLvl(getCurrentPageLevel(location))
  }, [location])

  useEffect(() => {
    setHasSecondaryNav(lvl > 1)
  }, [lvl])

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
      {hasSecondaryNav && <Breadcrumbs crumbs={crumbs} />}
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
        <div style={{ position: 'absolute', background: '#fff', top: 0, right: 0, padding: '.5em' }}>{lvl}</div>

        <udem-urgence></udem-urgence>

        {isMedium ? <TopAppBarSm /> : <TopAppBar lvl={lvl} location={location} />}

        {/* <bib-avis bouton-fermer /> */}

        {isSmall ? <QuickLinksSm /> : <QuickLinks />}

        {hasSecondaryNav ? (
          <Container sx={{ px: '64px' }}>
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

        {/* <bib-consent server-request-timeout="5000"></bib-consent> */}
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
