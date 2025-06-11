import { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Box, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { IconContext } from '@phosphor-icons/react'

import TopAppBar from '@/components/_layout/AppBar/TopAppBar'
import TopAppBarSm from '@/components/_layout/AppBar/TopAppBarSm'
import { QuickLinks, QuickLinksSm } from '@/components/_layout/QuickLinks'
import Footer from '@/components/_layout/Footer/Footer'
import Breadcrumbs from '@/components/_layout/Breadcrumbs/Breadcrumbs'
import SkipTo from '@/components/_layout/SkipTo'
import SEO from '@/components/_layout/SEO'
import Debug from '@/components/_layout/Debug'
import LayoutGrid from '../components/utils/LayoutGrid'
import RetroactionUsager from '@/components/RetroactionUsager'
import ConditionalWrapper from '@/components/utils/ConditionalWrapper'
import LayoutContainer from '@/components/utils/LayoutContainer'

import { useSmall } from '@/hooks/use-small'
import { SecondaryNav } from '@/components/_layout/SecondaryNav/SecondaryNav'
import { getLastSundayISODate } from '@/utils/dateTimeUtils'

import commonComponents from './commonComponents'
import SuperHero from '../components/_layout/SuperHeroLvl2'

function getCurrentPageLevel(location) {
  return location.pathname.split('/').filter((item) => item).length
}

export default function PageTemplate({ pageContext, children, data, location }) {
  const isSmall = useSmall('md')
  const isMedium = useSmall('lg')
  const theme = useTheme()
  const [hasSecondaryNav, setHasSecondaryNav] = useState(false)
  const [lvl, setLvl] = useState(getCurrentPageLevel(location))

  const { superHero } = pageContext.frontmatter

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
      <Box id="main-content" component="main" role="main" sx={{ '& > :first-child': { marginTop: 0, paddingTop: 0 } }}>
        {children}
        <ConditionalWrapper condition={lvl < 2} wrapper={(children) => <LayoutContainer>{children}</LayoutContainer>}>
          <RetroactionUsager />
        </ConditionalWrapper>
      </Box>
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

        <SkipTo href="#main-content">Aller au contenu</SkipTo>

        <udem-urgence></udem-urgence>

        {isMedium ? <TopAppBarSm /> : <TopAppBar lvl={lvl} location={location} />}

        {/* <bib-avis bouton-fermer /> */}

        {isSmall ? <QuickLinksSm /> : <QuickLinks />}

        {lvl > 1 && superHero && <SuperHero title={superHero.title} imageName={superHero.imageName} lvl={lvl} />}

        {hasSecondaryNav ? (
          <Box sx={{ paddingTop: '60px' }}>
            <LayoutContainer>
              <LayoutGrid>
                <Grid
                  sx={{ width: '100%' }}
                  container
                  spacing={{
                    xs: 1,
                    sm: 3,
                    lg: 4,
                  }}
                >
                  <Grid size={3} className="bib-secondary-nav-col">
                    <SecondaryNav currentLocation={location} className="bib-secondary-nav" />
                  </Grid>
                  <Grid size={9} className="bib-main-content-col">
                    <div>{mainContent}</div>
                  </Grid>
                </Grid>
              </LayoutGrid>
            </LayoutContainer>
          </Box>
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
  const { frontmatter = {} } = pageContext
  const { noIndex, title } = frontmatter
  const { pathname } = location

  return (
    <>
      <html lang="fr-CA" />
      <SEO title={title} pathname={pathname} />
      <bib-gtm></bib-gtm>
      {['/espaces', 'nous-joindre'].some((path) => pathname.startsWith(path)) && (
        <>
          <link rel="preload" href="https://api.bib.umontreal.ca/horaires/services" as="fetch" crossorigin="anonymous" />
          <link rel="preload" href={`https://api.bib.umontreal.ca/horaires/?debut=${getLastSundayISODate()}&fin=P7D`} as="fetch" crossorigin="anonymous" />
        </>
      )}
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-gtm.min.js"></script>
      {/* <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-avis.min.js"></script> */}
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-retroaction-usager.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/udem-urgence.min.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-consent.min.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@0/dist/bib-consent-preferences-btn.min.js"></script>

      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </>
  )
}
