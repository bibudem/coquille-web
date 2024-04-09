import React, { useState } from 'react'
import { Box, Divider as MUIDivider, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, SwipeableDrawer } from '@mui/material'
import { styled } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import Link from '@/components/Link'
import Close from './Close'
import LogoBib from '../images/logo-bib.svg'

const StyledBox = styled(Box)(
  ({ theme }) => `
${theme.breakpoints.up('sm')} {
  padding: 2rem;
}
`
)

function Divider({ children, ...props }) {
  return (
    <Box py={2}>
      <MUIDivider {...props}>{children}</MUIDivider>
    </Box>
  )
}

function NavList({ children, ...props }) {
  return (
    <List
      {...props}
      children={children}
      sx={
        {
          // pt: 3,
        }
      }
    />
  )
}

function NavListItem({ href, children, ...props }) {
  return (
    <ListItem disablePadding {...props}>
      <ListItemButton component={Link} to={href}>
        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  )
}

const StyledNavHeader = styled(Typography)(
  ({ theme }) => `
  font-weight: bold;
`
)

const StyledLogoLink = styled(Link)(
  ({ theme }) => `
  width: 100px;
  white-space: nowrap;
`
)

const Nav = styled('nav')(
  ({ theme }) => `
  margin-top: 1rem;
  `
)

function NavHeader({ children, ...props }) {
  return <StyledNavHeader {...props} component="h2" children={children} />
}

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false)
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <IconButton size="large" edge="start" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer open={open} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)} disableBackdropTransition={!iOS} disableDiscovery={iOS}>
        <Box
          sx={(theme) => ({
            width: '100vw',
            [theme.breakpoints.up('sm')]: {
              width: '32.8125rem',
            },
          })}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <StyledBox
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '3rem',
              [theme.breakpoints.up('sm')]: {
                height: '5rem',
              },
            })}
          >
            <StyledLogoLink to="/">
              <LogoBib style={{ height: '1.5rem' }} />
            </StyledLogoLink>
            <Close />
          </StyledBox>
          <MUIDivider />
          <StyledBox>
            <Nav aria-label="À propos">
              <NavHeader>À propos</NavHeader>
              <NavList>
                <NavListItem href="/a-propos/notre-equipe.mdx">Notre équipe</NavListItem>
                <NavListItem href="#">Mission, vision, valeur, objectifs</NavListItem>
                <NavListItem href="#">Rapports annuels</NavListItem>
                <NavListItem href="#">Carrières</NavListItem>
              </NavList>
            </Nav>

            <Divider />

            <Nav aria-label="Ce qui se passe aux bibliothèques">
              <NavHeader>Ce qui se passe aux bibliothèques</NavHeader>
              <NavList>
                <NavListItem href="#">Nouvelles</NavListItem>
                <NavListItem href="#">Formations</NavListItem>
                <NavListItem href="#">Activités</NavListItem>
                <NavListItem href="#">Expositions</NavListItem>
              </NavList>
            </Nav>

            <Divider />

            <Nav aria-label="Outils de recherche">
              <NavHeader>Outils de recherche</NavHeader>
              <NavList>
                <NavListItem href="#">Sofia: outil de découverte</NavListItem>
                <NavListItem href="#">Bases de données Z à Z</NavListItem>
                <NavListItem href="#">Papyrus: dépôt institutionnel</NavListItem>
                <NavListItem href="#">Calypso: Collections spéciales</NavListItem>
              </NavList>
            </Nav>

            <Divider />

            <Nav aria-label="Technologies">
              <NavHeader>Technologies</NavHeader>
              <NavList>
                <NavListItem href="#">Soutien informatique</NavListItem>
                <NavListItem href="#">Création numérique</NavListItem>
                <NavListItem href="#">Équipements</NavListItem>
                <NavListItem href="#">Accès aux ressources hors campus (Proxy)</NavListItem>
              </NavList>
            </Nav>

            <Divider />

            <Nav aria-label="Obtenir un document">
              <NavHeader>Obtenir un document</NavHeader>
              <NavList>
                <NavListItem href="#">Prêt, renouvellement, retour</NavListItem>
                <NavListItem href="#">Demande de numérisation</NavListItem>
                <NavListItem href="#">Suggestion d'achat</NavListItem>
                <NavListItem href="#">Frais et avis de retard</NavListItem>
              </NavList>
            </Nav>

            <Divider />

            <Nav aria-label="Guides / Contenus détaillés">
              <NavHeader>Guides / Contenus détaillés</NavHeader>
              <NavList>
                <NavListItem href="#">Recherche par discipline </NavListItem>
                <NavListItem href="#">Recherche documentaire </NavListItem>
                <NavListItem href="#">Soutien à la recherche</NavListItem>
              </NavList>
            </Nav>

            <Divider />

            <NavList>
              <NavListItem href="https://www.umontreal.ca">Site principal de l'udeM</NavListItem>
              <NavListItem href="#">Accessibilité</NavListItem>
            </NavList>
          </StyledBox>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
