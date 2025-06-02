import { forwardRef, useState } from 'react'
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography, ListItemIcon } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from '@/components/Link'
import Close from '@/components/Close'
// import Button from '@/components/Button'
import noop from '@/utils/noop'
import { ArrowRightIcon, ArrowUpRightIcon, CalendarPlusIcon, ClockCountdownIcon, LifebuoyIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react'
import { SofiaIcon } from '@/components/CustomIcons'
import LogoUdeM from '@/images/logo-udem/logo-udem-blanc.svg'
import LogoBibUBlanc from '@/images/logo-bib/logo-bib-U-blanc.svg'

const SideNavHeaderContainer = styled(Box)({
  display: 'flex',
  padding: '21px 21px 32px',
  alignItems: 'center',
  justifyContent: 'space-between',
})

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
  return <List disablePadding {...props} />
}

function NavListItem({ href, children, icon, ...props }) {
  return (
    <ListItem disablePadding {...props}>
      <ListItemButton
        disableGutters
        component="a"
        to={href}
        sx={{
          gap: '15px',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
            backgroundColor: 'unset',
          },
        }}
      >
        {icon && <ListItemIcon sx={{ minWidth: 'unset' }}>{icon}</ListItemIcon>}
        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  )
}

export default forwardRef(function SideNavContent({ close = noop, onClose = noop, ...props }, ref) {
  const [open, setOpen] = useState(false)
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  function onDrawerClick(event) {
    // console.log('onClose...', event)
    let { target: node } = event

    if (node.matches('a[href]')) {
      dispatchClose(event)
      return
    }

    while (node.parent) {
      if (node.matches('a[href]')) {
        dispatchClose(event)
        break
      }

      node = node.parent
    }
  }

  function dispatchClose(event) {
    event.preventDefault()
    event.stopPropagation()

    event.target.dispatchEvent(new Event('close', { bubbles: true }))
  }

  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        width: '100vw',
        height: '100vh',
        fontSize: '16px',
        fontFeatureSettings: '"liga" off, "clig" off',
        fontVariantNumeric: 'lining-nums tabular-nums',
        [theme.breakpoints.up('md')]: {
          minWidth: 'calc(100% - 30px)',
          width: '100%',
        },
        [theme.breakpoints.up('xl')]: {
          minWidth: '1380px',
          width: '80vw',
        },
      })}
      role="presentation"
      onClick={onDrawerClick}
    >
      <SideNavHeaderContainer>
        <StyledLogoLink to="https://umontreal.ca">
          <LogoUdeM style={{ height: '60px' }} />
        </StyledLogoLink>
        <Box
          sx={{
            display: 'flex',
            gap: '22px',
          }}
        >
          <Button href="https://monudem.umontreal.ca/" variant="outlined" sx={{ color: '#fafdfe', border: '1px solid #e7ebee', fontSize: '14px' }} endIcon={<ArrowUpRightIcon size={28} />}>
            Mon UdeM
          </Button>
          <Button href="/nous-soutenir/" variant="contained" sx={(theme) => ({ fontSize: '14px', color: '#222930', backgroundColor: '#eef4f7' })} endIcon={<ArrowRightIcon size={28} />}>
            Je donne
          </Button>
          <Close aria-label="Fermer le menu" sx={{ color: '#fff' }} />
        </Box>
      </SideNavHeaderContainer>

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
            <NavListItem href="/a-propos/notre-organisation/">Notre organisation</NavListItem>
            <NavListItem href="/a-propos/nos-collections">Nos collections</NavListItem>
            <NavListItem href="/a-propos/mission-vision-valeur">Vision stratégique</NavListItem>
            <NavListItem href="/a-propos/rapports-annuels">Rapports annuels</NavListItem>
            <NavListItem href="/a-propos/politiques-reglement">Politiques et règlement</NavListItem>
            <NavListItem href="/nouvelles/">Nouvelles</NavListItem>
            <NavListItem href="/a-propos/carriere">Carrières</NavListItem>
          </NavList>
        </Nav>

        <Nav aria-label="Plateformes" bg>
          <NavHeader>Plateformes</NavHeader>
          <NavList>
            <NavListItem href="https://studio.bib.umontreal.ca/">Studio•bib - écosystème numérique</NavListItem>
            <NavListItem href="https://calypso.bib.umontreal.ca/">Calypso: objets numériques</NavListItem>
            <NavListItem href="https://boite-outils.bib.umontreal.ca/c.php?g=739631">La boîte à outils - guides</NavListItem>
            <NavListItem href="https://umontreal.on.worldcat.org/discovery?lang=fr">Sofia: outil de découverte</NavListItem>
            <NavListItem href="https://boite-outils.bib.umontreal.ca/az.php">Bases de données de A à Z</NavListItem>
            <NavListItem href="https://umontreal.scholaris.ca/">Papyrus: dépôt institutionnel</NavListItem>
            <NavListItem href="https://geoapp.bibl.ulaval.ca/">GéoIndex: données géospatiales</NavListItem>
          </NavList>
        </Nav>

        <Nav aria-label="Obtenir un document">
          <NavHeader>Obtenir un document</NavHeader>
          <NavList>
            <NavListItem href="/obtenir/pret-renouvellement-retour/">Prêt, renouvellement, retour</NavListItem>
            <NavListItem href="/obtenir/numerisation">Demande de numérisation</NavListItem>
            <NavListItem href="/obtenir/peb">Prêt entre bibliothèques</NavListItem>
            <NavListItem href="/obtenir/frais-avis">Frais et avis de retard</NavListItem>
            <NavListItem href="/nous-joindre/suggestion-achat">Suggestion d'achat</NavListItem>
          </NavList>
        </Nav>

        <Nav aria-label="Liens rapides" bg>
          <NavHeader sx={{ visibility: 'hidden' }}>Liens rapides</NavHeader>
          <NavList sx={{ color: '#fff' }}>
            <NavListItem href="https://umontreal.on.worldcat.org/discovery?lang=fr" icon={<SofiaIcon color="#fff" fontSize="24px" />}>
              Sofia
            </NavListItem>
            <NavListItem href="/horaires" icon={<ClockCountdownIcon color="#fff" size={24} />}>
              Horaires
            </NavListItem>
            <NavListItem href="https://calendrier.bib.umontreal.ca/r" icon={<CalendarPlusIcon color="#fff" size={24} />}>
              Réserver une salle
            </NavListItem>
            <NavListItem href="#" icon={<LifebuoyIcon color="#fff" size={24} />}>
              Soutien informatique
            </NavListItem>
          </NavList>
        </Nav>
      </Box>
      <SideNavHeaderContainer>
        <Box>
          <Link to="/" aria-label="Accueil">
            <LogoBibUBlanc style={{ width: '200px', height: 'auto', pointerEvents: 'none' }} />
          </Link>
        </Box>
        <Box>
          <Button href="/nous-joindre/" variant="outlined" sx={{ color: '#fafdfe', border: '1px solid #e7ebee', fontSize: '14px' }} endIcon={<PaperPlaneTiltIcon size={28} />}>
            Nous joindre
          </Button>
        </Box>
      </SideNavHeaderContainer>
    </Box>
  )
})
