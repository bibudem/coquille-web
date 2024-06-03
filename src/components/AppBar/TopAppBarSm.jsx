import { AppBar, Box, Button, Container, InputBase, Stack, Toolbar, useMediaQuery } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import Link from '@/components/Link'

import SearchIcon from '@mui/icons-material/Search'

import SideNav from '@/components/SideNav'
import LogoBib from '@/images/logo-bib.svg'

const pages = [
  { url: '/espaces', label: 'Espaces' },
  { url: '/etudes', label: 'Études' },
  { url: '/recherche', label: 'Recherche' },
  { url: '/enseignement', label: 'Enseignement' },
  { url: '/tests', label: 'Tests' },
]

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

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
 * Primary search app bar component for mobile devices
 */
export default function TopAppBarSm() {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <>
      {isSmall && <Offset />}
      <AppBar
        position={isSmall ? 'fixed' : 'sticky'}
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
          <Toolbar>
            <SideNav />
            <Box
              sx={{
                flexGrow: 0,
                mr: 5,
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
            <Stack direction="row" spacing={1}>
              {pages.map(({ url, label }) => (
                <Button
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
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Rechercher sur le site..." inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
