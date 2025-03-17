import { useEffect, useState } from 'react'
import { AppBar, Container, Slide, Toolbar, useScrollTrigger } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from '@/components/Link'
import SideNavSm from '@/components/SideNav/SideNavSm'
import SideNavContent from '@/components/SideNav/SideNavContent'
import MenuBurger from './MenuBurger'
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
    threshold: 150,
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
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newState) => () => {
    setOpen(newState ?? !open)
  }

  useEffect(() => {
    function onClose() {
      setOpen(false)
    }

    document.documentElement.addEventListener('close', onClose)

    return () => {
      document.documentElement.removeEventListener('close', onClose)
    }
  }, [])
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
                  alignItems: 'flex-end',
                  color: 'inherit',
                }}
              >
                <LogoUdeM style={{ height: '33px', marginRight: '20px', color: '#000' }} />
                <LogoBib style={{ height: '33px' }} />
              </Link>
              <MenuBurger
                onClick={toggleDrawer(true)}
                sx={{
                  position: 'absolute',
                  zIndex: 1,
                  right: 16,
                }}
              />
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <SideNavSm open={open} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
        <SideNavContent />
      </SideNavSm>
    </>
  )
}
