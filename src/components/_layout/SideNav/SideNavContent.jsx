import { forwardRef, useState } from 'react'
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography, ListItemIcon } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CalendarPlus, ClockCountdown, Lifebuoy } from '@phosphor-icons/react'
import Link from '@/components/Link'
import Close from '@/components/Close'
import LogoBib from '@/images/logo-bib/logo-bib.svg'
import { SofiaIcon } from '@/components/CustomIcons'

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    padding: '2rem',
  },
}))

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

function NavListItem({ href, children, icon, ...props }) {
  return (
    <ListItem disablePadding {...props}>
      <ListItemButton component={Link} to={href}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
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

const Nav = styled('nav')(({ theme }) => ({
  margin: '80px 48px',
}))

function NavHeader({ children, ...props }) {
  return <StyledNavHeader {...props} component="h2" children={children} />
}

export default forwardRef(function SideNavContent({ close, onClose, ...props }, ref) {
  const [open, setOpen] = useState(false)
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  function closeDrawer() {
    close()
    onClose()
  }

  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        backgroundColor: theme.palette.bleuFonce.main,
        color: theme.palette.bleuFonce.contrastText,
        width: '100vw',
        [theme.breakpoints.up('md')]: {
          width: '80vw',
        },
      })}
      role="presentation"
      onClick={() => closeDrawer()}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          padding: '21px 21px 32px',
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
        <Close aria-label="Fermer le menu" />
      </Box>

      <Box
        sx={{
          display: 'flex',
          borderTop: '1px solid #fff',
          borderBottom: '1px solid #fff',
        }}
      >
        <Nav aria-label="À propos">
          <NavHeader>À propos</NavHeader>
          <NavList>
            <NavListItem href="/a-propos/notre-equipe.mdx">Notre équipe</NavListItem>
            <NavListItem href="#">Vision stratégique</NavListItem>
            <NavListItem href="#">Rapports annuels</NavListItem>
            <NavListItem href="#">Politiques et règlement</NavListItem>
            <NavListItem href="#">Nouvelles</NavListItem>
            <NavListItem href="#">Carrières</NavListItem>
          </NavList>
        </Nav>

        <Nav aria-label="Plateformes" sx={(theme) => ({ backgroundColor: theme.palette.bleuPrincipal.main })}>
          <NavHeader>Plateformes</NavHeader>
          <NavList>
            <NavListItem href="#">Le studio - écosystème numérique</NavListItem>
            <NavListItem href="#">Calypso: Collections spéciales</NavListItem>
            <NavListItem href="#">La boîte à outils - guides</NavListItem>
            <NavListItem href="#">Sofia: outil de découverte</NavListItem>
            <NavListItem href="#">Bases de données de A à Z</NavListItem>
            <NavListItem href="#">Papyrus: dépôt institutionnel</NavListItem>
            <NavListItem href="#">GéoIndex: données géospatiales</NavListItem>
          </NavList>
        </Nav>

        <Nav aria-label="Obtenir un document">
          <NavHeader>Obtenir un document</NavHeader>
          <NavList>
            <NavListItem href="#">Prêt, renouvellement, retour</NavListItem>
            <NavListItem href="#">Demande de numérisation</NavListItem>
            <NavListItem href="#">Suggestion d'achat</NavListItem>
            <NavListItem href="#">Frais et avis de retard</NavListItem>
          </NavList>
        </Nav>

        <Nav aria-label="Liens rapides" sx={(theme) => ({ backgroundColor: theme.palette.bleuPrincipal.main })}>
          <NavHeader sx={{ visibility: 'hidden' }}>Liens rapides</NavHeader>
          <NavList>
            <NavListItem href="#" icon={<SofiaIcon color="#fff" />}>
              Sofia
            </NavListItem>
            <NavListItem href="#" icon={<ClockCountdown color="#fff" size={24} />}>
              Horaires
            </NavListItem>
            <NavListItem href="#" icon={<CalendarPlus color="#fff" size={24} />}>
              Réserver une salle
            </NavListItem>
            <NavListItem href="#" icon={<Lifebuoy color="#fff" size={24} />}>
              Soutien informatique
            </NavListItem>
          </NavList>
        </Nav>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '32px 21px' }}>
        <Box>[LOGO]</Box>
        <Box>[nous joindre]</Box>
      </Box>
    </Box>
  )
})
