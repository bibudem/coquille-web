import { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, Stack, Toolbar } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import Link from '@/components/Link'
import SideNav from '@/components/SideNav/SideNav'
import SideNavContent from '@/components/SideNav/SideNavContent'
import LogoBib from '@/images/logo-bib.svg'
import MenuFab from './MenuButton'

const pages = [
  { url: '/espaces', label: 'Espaces' },
  { url: '/etudes', label: 'Études' },
  { url: '/recherche', label: 'Recherche' },
  { url: '/enseignement', label: 'Enseignement' },
  { url: '/engagement', label: 'Engagement' },
  { url: '/tests', label: 'Tests' },
]

const StyledButton = styled(Button)(({ theme }) => ({
  alignContent: 'center',
  my: 2,
  color: theme.palette.text.primary,
  fontSize: '0.875rem',
  fontWeight: 400,
  display: 'block',
  textTransform: 'none',
}))

/**
 * Primary search app bar component
 */
export default function TopAppBar() {
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
        sx={(theme) => ({
          borderBottom: '1px solid silver',
          bgcolor: 'white',
          '.MuiToolbar-root': {
            [theme.breakpoints.up('sm')]: {
              minHeight: 89,
            },
          },
        })}
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
          <Toolbar>
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
                <LogoBib style={{ height: '35px' }} />
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
