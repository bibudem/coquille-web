import { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, Divider, Stack, Toolbar } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import Link from '@/components/Link'
import SideNav from '@/components/SideNav/SideNav'
import SideNavContent from '@/components/SideNav/SideNavContent'
import Div from '@/components/utils/Div'
import LogoUdeMMonochrome from '@/images/logo-udem-monochrome.svg'
import LogoUdeM from '@/images/logo-udem.svg'
import MenuFab from './MenuButton'

const pages = [
  { url: '/espaces', label: 'Espaces' },
  { url: '/etudes', label: 'Études' },
  { url: '/recherche', label: 'Recherche' },
  { url: '/enseignement', label: 'Enseignement' },
  { url: '/engagements', label: 'Engagements' },
  { url: '/tests', label: 'Tests' },
]

const styles = {}

const StyledButton = styled(Button)(({ theme }) => ({
  alignContent: 'center',
  my: 2,
  color: theme.palette.text.primary,
  fontSize: '0.875rem',
  fontWeight: 400,
  display: 'block',
  textTransform: 'none',
}))

export const appBarHeight = '5rem'

function Logo({ lvl }) {
  const theme = useTheme()
  const logoUdeMBaseStyles = {
    height: '3.5625rem',
    outline: '1px solid red',
    fill: 'currentColor',
    color: lvl === 1 ? theme.palette.grey['50'] : 'inherit',
  }
  console.log('---------------------------- lvll', lvl)
  return (
    <Div
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        color: lvl === 1 ? theme.palette.grey['50'] : 'inherit',
      })}
    >
      {lvl === '1' ? (
        <LogoUdeMMonochrome
          style={{
            ...logoUdeMBaseStyles,
            color: 'red',
          }}
        />
      ) : (
        <LogoUdeM
          style={{
            ...logoUdeMBaseStyles,
          }}
        />
      )}
      <Divider orientation="vertical" flexItem />
      Les bibliothèques
    </Div>
  )
}

/**
 * Primary search app bar component
 */
export default function TopAppBar({ lvl }) {
  const [open, setOpen] = useState(false)
  const theme = useTheme()

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
      <AppBar
        position="sticky"
        elevation={0}
        color={theme.palette.grey['50']}
        sx={{
          '--AppBar-background': lvl < 2 ? 'transparent' : '#fff',
          '.MuiToolbar-root': {
            height: appBarHeight,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: 0.5,
            px: '0!important',
          }}
        >
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <Link
                aria-label="Accueil"
                variant="h6"
                noWrap
                to="/"
                sx={{
                  display: { xs: 'none', sm: 'block', color: 'inherit' },
                }}
              >
                {/* <LogoBib style={{ height: '35px' }} /> */}
                <Logo lvl={lvl} />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {pages.map(({ url, label }) => {
                return (
                  <StyledButton size="large" href={url} key={url}>
                    {label}
                  </StyledButton>
                )
              })}
              <Button variant="contained" disableElevation size="large" href="/connexion" sx={{ bgcolor: 'bleuFonce.main' }}>
                Je donne
              </Button>
            </Stack>
            <Box>
              <MenuFab onClick={toggleDrawer(true)} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <SideNav open={open} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
        <SideNavContent />
      </SideNav>
    </>
  )
}
