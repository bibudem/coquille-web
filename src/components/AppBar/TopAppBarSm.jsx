import { useEffect, useState } from 'react'
import { AppBar, Container, Slide, Toolbar, useScrollTrigger } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from '@/components/Link'
import SideNavSm from '@/components/SideNav/SideNavSm'
import SideNavContent from '@/components/SideNav/SideNavContent'
import MenuBurger from './MenuBurger'
import LogoUdeMMonochrome from '@/images/logo-udem/logo_udem-noir.svg'

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
            bgcolor: 'transparent',
            outline: '1px solid red',
            outlineOffset: '-1px',
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
            <Toolbar
              sx={{
                outline: '1px dotted blue',
                outlineOffset: '-1px',
              }}
            >
              <Link
                aria-label="Accueil"
                noWrap
                to="/"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#fff',
                  margin: '10px 0 0 14px',
                }}
              >
                <LogoUdeMMonochrome
                  style={{
                    width: 140,
                    height: 'auto',
                    fill: 'currentColor',
                  }}
                />
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                  }}
                >
                  les bibliothèques
                </span>
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
