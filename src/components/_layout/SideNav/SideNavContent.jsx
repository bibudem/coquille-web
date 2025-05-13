import { forwardRef, useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, ListItemIcon } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from '@/components/Link'
import Close from '@/components/Close'
import Button from '@/components/Button'
import noop from '@/utils/noop'
import { CalendarPlus, ClockCountdown, Lifebuoy } from '@phosphor-icons/react'
import { SofiaIcon } from '@/components/CustomIcons'
import LogoBib from '@/images/logo-bib/logo-bib.svg'
import LogoBibUBlanc from '@/images/logo-bib/logo-bib-U-blanc.svg'

const StyledLogoLink = styled(Link)({
  width: '100px',
  whiteSpace: 'nowrap',
})

const StyledNav = styled('nav')({
  padding: '80px 48px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
})

function Nav({ bg = false, ...props }) {
  return (
    <StyledNav
      {...props}
      sx={(theme) => ({
        ...(bg && { backgroundColor: theme.palette.bleuPrincipal.main }),
      })}
    />
  )
}

const StyledNavHeader = styled(Typography)({
  color: '#fff',
  fontSize: '28px',
  fontWeight: 500,
  lineHeight: 1.2,
})

function NavHeader({ children, ...props }) {
  return <StyledNavHeader {...props} component="h2" children={children} />
}

function NavList(props) {
  return (
    <List
      disablePadding
      {...props}
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
      <ListItemButton
        /*disableGutters*/ /*alignItems="flex-start"*/ component="a"
        to={href}
        sx={{
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
            backgroundColor: 'unset',
          },
        }}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  )
}

export default forwardRef(function SideNavContent({ close = noop, onClose = noop, ...props }, ref) {
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
        color: theme.palette.bleu200.main,
        width: '100vw',
        height: '100%',
        fontSize: '16px',
        fontFeatureSettings: '"liga" off, "clig" off',
        fontVariantNumeric: 'lining-nums tabular-nums',
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
            <NavListItem href="/a-propos/notre-equipe">Notre équipe</NavListItem>
            <NavListItem href="/a-propos/mission-vision-valeur">Vision stratégique</NavListItem>
            <NavListItem href="/a-propos/rapports-annuels">Rapports annuels</NavListItem>
            <NavListItem href="/a-propos/politiques-reglement">Politiques et règlement</NavListItem>
            <NavListItem href="/nouvelles/">Nouvelles</NavListItem>
            <NavListItem href="/a-propos/carriere.mdx">Carrières</NavListItem>
          </NavList>
        </Nav>

        <Nav aria-label="Plateformes" bg>
          <NavHeader>Plateformes</NavHeader>
          <NavList>
            <NavListItem href="#">Le studio - écosystème numérique</NavListItem>
            <NavListItem href="#">Calypso: Collections spéciales</NavListItem>
            <NavListItem href="#">La boîte à outils - guides</NavListItem>
            <NavListItem href="https://umontreal.on.worldcat.org/discovery?lang=fr">Sofia: outil de découverte</NavListItem>
            <NavListItem href="#">Bases de données de A à Z</NavListItem>
            <NavListItem href="https://umontreal.scholaris.ca/">Papyrus: dépôt institutionnel</NavListItem>
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

        <Nav aria-label="Liens rapides" bg>
          <NavHeader sx={{ visibility: 'hidden' }}>Liens rapides</NavHeader>
          <NavList>
            <NavListItem href="https://umontreal.on.worldcat.org/discovery?lang=fr" icon={<SofiaIcon color="#fff" />}>
              Sofia
            </NavListItem>
            <NavListItem href="/horaires" icon={<ClockCountdown color="#fff" size={24} />}>
              Horaires
            </NavListItem>
            <NavListItem href="https://calendrier.bib.umontreal.ca/r" icon={<CalendarPlus color="#fff" size={24} />}>
              Réserver une salle
            </NavListItem>
            <NavListItem href="#" icon={<Lifebuoy color="#fff" size={24} />}>
              Soutien informatique
            </NavListItem>
          </NavList>
        </Nav>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '32px 21px' }}>
        <Box>
          <Link to="/" aria-label="Accueil">
            <LogoBibUBlanc style={{ width: '200px', height: 'auto' }} />
          </Link>
        </Box>
        <Box>
          <Button href="/nous-joindre/" variant="outlined" sx={{ color: '#fafdfe', border: '1px solid #e7ebee' }}>
            Nous joindre
          </Button>
        </Box>
      </Box>
    </Box>
  )
})
