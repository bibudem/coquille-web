import { AppBar, Box, Container, Slide, Toolbar, useScrollTrigger } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from '@/components/Link'
import LogoBib from '@/images/logo-bib.svg'
import LogoUdeM from '@/images/logo-udem.svg'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

function HideOnScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

/**
 * Primary search app bar component for mobile devices
 */
export default function TopAppBarSm(props) {
  return (
    <>
      <Offset />
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            borderBottom: '1px solid silver',
            bgcolor: 'white',
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              '&.MuiContainer-maxWidthXl': {
                maxWidth: '1500px',
              },
              py: 0.5,
            }}
          >
            <Toolbar sx={{ justifyContent: 'center' }}>
              <Link
                aria-label="Accueil"
                variant="h6"
                noWrap
                to="/"
                sx={{
                  display: 'flex',
                  color: 'inherit',
                }}
              >
                <LogoUdeM style={{ height: '33px', marginRight: '20px', color: '#000' }} />
                <LogoBib style={{ height: '35px' }} />
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  )
}
