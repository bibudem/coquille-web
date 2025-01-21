import { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, InputBase, Stack, Toolbar } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'

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
  { url: '/tests', label: 'Tests' },
]

const Search = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    borderRadius: 'var(--bib-shape-corner-full)',
    backgroundColor: alpha(theme.palette.primary.main, 0.0875),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }
})

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

/**
 * Primary search app bar component
 */
export default function TopAppBar() {
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
            <Box width="15%"></Box>
            <Stack direction="row" spacing={1}>
              {pages.map(({ url, label }) => (
                <Button
                  size="large"
                  href={url}
                  key={url}
                  sx={{
                    my: 2,
                    // color: 'white',
                    fontWeight: 600,
                    display: 'block',
                    textTransform: 'none',
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', pr: 2 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Rechercher sur le site..." inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>
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
