import { forwardRef, useState } from 'react'
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography, ListItemIcon, useMediaQuery, useTheme, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from '@/components/Link'
import Close from '@mui/icons-material/Close'
import noop from '@/utils/noop'
import { ArrowRightIcon } from '@phosphor-icons/react'
import LogoBibUBlanc from '@/images/logo-bib/logo-bib-U-blanc.svg'
import pages from '../AppBar/menu'

const SideNavHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '21px 21px 32px',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.bleuFonce.main,
}))

const StyledLogoLink = styled(Link)({
  width: '100px',
  whiteSpace: 'nowrap',
})

const StyledNav = styled('nav')(({ theme }) => ({
  padding: '80px 48px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  [theme.breakpoints.down('md')]: {
    padding: '40px 24px',
    minWidth: '85vw',
    scrollSnapAlign: 'start',
    '&:first-of-type': {
      paddingLeft: '32px',
    },
    '&:last-child': {
      paddingRight: '32px',
    },
  },
}))

function Nav({ bg = false, ...props }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <StyledNav
      {...props}
      sx={{
        backgroundColor: isMobile 
          ? (bg ? theme.palette.bleuFonce.main : theme.palette.bleuPrincipal.main)
          : (bg ? theme.palette.bleuFonce.main : theme.palette.bleuPrincipal.main),
      }}
    />
  )
}

const StyledNavHeader = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 500,
  lineHeight: 1.2,
  color: theme.palette.common.white,
  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
  },
}))

function NavHeader({ children, ...props }) {
  return <StyledNavHeader {...props} component="h2" children={children} />
}

function NavList(props) {
  return <List disablePadding {...props} />
}

function NavListItem({ href, children, icon, ...props }) {
  const theme = useTheme()

  return (
    <ListItem disablePadding {...props}>
      <ListItemButton
        disableGutters
        component={Link}
        to={href}
        sx={{
          gap: '15px',
          textDecoration: 'none',
          color: theme.palette.common.white,
          '&:hover': {
            textDecoration: 'underline',
            backgroundColor: 'unset',
            color: theme.palette.common.white,
          },
          [theme.breakpoints.down('lg')]: {
            py: '8px',
          },
        }}
      >
        {icon && (
          <ListItemIcon
            sx={{
              minWidth: 'unset',
              color: 'inherit',
              [theme.breakpoints.down('lg')]: {
                '& svg': {
                  fontSize: '20px',
                },
              },
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={children}
          slotProps={{
            primary: {
              color: 'inherit',
              [theme.breakpoints.down('lg')]: {
                fontSize: '15px',
                color: 'red!important',
              },
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default forwardRef(function SideNavContent({ close = noop, onClose = noop, ...props }, ref) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft
    setScrollPosition(scrollLeft)

    const newActiveIndex = Math.round(scrollLeft / (e.target.scrollWidth / 4))
    setActiveIndex(Math.min(3, Math.max(0, newActiveIndex)))
  }

  const handleCloseClick = (e) => {
    e.stopPropagation()
    onClose(e)
  }

  return (
    <Box
      ref={ref}
      sx={{
        width: '100vw',
        height: '100vh',
        fontSize: '16px',
        fontFeatureSettings: '"liga" off, "clig" off',
        fontVariantNumeric: 'lining-nums tabular-nums',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        [theme.breakpoints.up('md')]: {
          minWidth: 'calc(100% - 30px)',
          width: '100%',
        },
        [theme.breakpoints.up('xl')]: {
          minWidth: '1380px',
          width: '80vw',
        },
      }}
      role="presentation"
    >
      <SideNavHeaderContainer>
        <Link to="/" aria-label="Accueil" sx={{ display: 'block' }}>
          <LogoBibUBlanc
            style={{
              width: '170px',
              height: 'auto',
              pointerEvents: 'none',
              [theme.breakpoints.down('md')]: {
                width: '90px',
              },
            }}
          />
        </Link>
        
        {/* Menu principal desktop */}
        {!isMobile && (
           <NavList 
              sx={{ 
                display: 'flex', 
                gap: 3,       
                px: 3  
              }}
            >
              {pages.map((page) => (
                <NavListItem 
                  key={page.url} 
                  href={page.url}
                >
                  {page.label}
                </NavListItem>
              ))}
            </NavList>

        )}
        <Box
          sx={{
            display: 'flex',
            gap: '22px',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
              gap: '10px',
            },
          }}
        >
          <Button
            href="/nous-joindre/"
            variant="outlined"
            sx={{
              color: theme.palette.common.white,
              borderColor: theme.palette.grey[300],
              '&:hover': {
                borderColor: theme.palette.grey[300],
              },
              fontSize: '14px',
              [theme.breakpoints.down('md')]: {
                fontSize: '12px',
                padding: '6px 12px',
                '& .MuiButton-endIcon': {
                  marginLeft: '4px',
                  '& svg': {
                    fontSize: '20px',
                  },
                },
              },
            }}
             endIcon={<ArrowRightIcon size={28} />}
          >
            Nous joindre
          </Button>
          <Button
            href="/nous-soutenir/"
            variant="contained"
            sx={{
              fontSize: '14px',
              color: theme.palette.grey[900],
              backgroundColor: theme.palette.grey[100],
              '&:hover': {
                backgroundColor: theme.palette.grey[200],
              },
              [theme.breakpoints.down('md')]: {
                fontSize: '12px',
                padding: '5px 8px',
                '& .MuiButton-endIcon': {
                  marginLeft: '4px',
                  '& svg': {
                    fontSize: '12px',
                  },
                },
              },
            }}
            endIcon={<ArrowRightIcon size={28} />}
          >
            Je donne
          </Button>
          <IconButton
            aria-label="Fermer le menu"
            onClick={handleCloseClick}
            sx={{
              color: '#fff',
              padding: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.1)',
                transition: 'all 0.2s ease-in-out',
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </SideNavHeaderContainer>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          borderTop: `1px solid ${theme.palette.common.white}`,
          borderBottom: `1px solid ${theme.palette.common.white}`,
          [theme.breakpoints.down('lg')]: {
            overflow: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            [theme.breakpoints.down('lg')]: {
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            },
          }}
          onScroll={isMobile ? handleScroll : undefined}
        >
          {/* Nouvelle section pour le menu principal mobile */}
          {isMobile && (
              <Nav aria-label="Menu principal" bg={false}>
                <NavHeader></NavHeader>
                <NavList>
                  {/* Lien vers l'accueil */}
                  <NavListItem href="/">
                    Accueil
                  </NavListItem>
                  {pages.map((page) => (
                    <NavListItem 
                      key={page.url} 
                      href={page.url}
                    >
                      {page.label}
                    </NavListItem>
                  ))}
                </NavList>
              </Nav>
          )}
          <Nav aria-label="Les bibliothèques" bg={true}>
            <NavHeader>Les bibliothèques</NavHeader>
            <NavList>
              <NavListItem href="/a-propos/notre-organisation/">Notre organisation</NavListItem>
              <NavListItem href="/a-propos/mission-vision-valeur">Notre mission, notre vision et nos valeurs</NavListItem>
              <NavListItem href="/a-propos/nos-collections">Nos collections</NavListItem>
              <NavListItem href="/a-propos/politiques-reglement">Nos politiques et règlement</NavListItem>
              <NavListItem href="/a-propos/rapports-annuels">Nos rapports annuels</NavListItem>
              <NavListItem href="/nouvelles/">Nouvelles</NavListItem>
              <NavListItem href="/a-propos/carriere">Carrière</NavListItem>
              <NavListItem href="/horaires">Nos heures d'ouverture</NavListItem>
              <NavListItem href="/nous-joindre/">Nous joindre</NavListItem>


            </NavList>
          </Nav>

          <Nav aria-label="Vos ressources" bg={false}>
            <NavHeader>Vos ressources</NavHeader>
            <NavList>
              <NavListItem href="https://calendrier.bib.umontreal.ca/r">Réservation de salles</NavListItem>
              <NavListItem href="https://umontreal.on.worldcat.org/discovery?lang=fr">Sofia - accès aux collections</NavListItem>
              <NavListItem href="https://boite-outils.bib.umontreal.ca/az.php">Bases de données de A à Z</NavListItem>
              <NavListItem href="https://boite-outils.bib.umontreal.ca/">La boîte à outils - ressources et guides spécialisés</NavListItem>
              <NavListItem href="https://studio.bib.umontreal.ca/">Studio•bib - soutien informatique et à la création numérique</NavListItem>
              <NavListItem href="https://geoapp.bibl.ulaval.ca/">GéoIndex - données géospatiales</NavListItem>
              <NavListItem href="https://umontreal.scholaris.ca/">Papyrus - dépôt institutionnel</NavListItem>
              <NavListItem href="https://calypso.bib.umontreal.ca/">Calypso - collections numérisées</NavListItem>
              <NavListItem href="https://studio.bib.umontreal.ca/informatique/">Soutien informatique</NavListItem>


            </NavList>
          </Nav>

          <Nav aria-label="Obtenir un document" bg={true}>
            <NavHeader>Obtenir un document</NavHeader>
            <NavList>
              <NavListItem href="/obtenir/pret-renouvellement-retour/">Prêt, renouvellement, retour</NavListItem>
              <NavListItem href="/obtenir/numerisation">Demande de numérisation</NavListItem>
              <NavListItem href="/obtenir/peb/">Prêt entre bibliothèques</NavListItem>
              <NavListItem href="/obtenir/frais-avis">Frais et avis de retard</NavListItem>
              <NavListItem href="/nous-joindre/suggestion-achat/">Suggestion d'achat</NavListItem>
              <NavListItem href="/service-accessibilite/">Service accessibilité</NavListItem>
            </NavList>
          </Nav>


        </Box>
      </Box>

      {isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            padding: 2,
            backgroundColor: theme.palette.bleuFonce.main,
          }}
        >
          {[0, 1, 2, 3].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: activeIndex === index ? theme.palette.common.white : 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  )
})
