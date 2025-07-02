import { forwardRef, useState } from 'react'
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography, ListItemIcon, useMediaQuery, useTheme, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from '@/components/Link'
import Close from '@mui/icons-material/Close'
import noop from '@/utils/noop'
import { ArrowRightIcon, ArrowUpRightIcon, CalendarPlusIcon, ClockCountdownIcon, LifebuoyIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react'
import { SofiaIcon } from '@/components/CustomIcons'
import LogoUdeM from '@/images/logo-udem/logo-udem-blanc.svg'
import LogoBibUBlanc from '@/images/logo-bib/logo-bib-U-blanc.svg'

const SideNavHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '21px 21px 32px',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.bleuFonce.main,
  },
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

  return (
    <StyledNav
      {...props}
      sx={{
        backgroundColor: bg ? theme.palette.bleuFonce.main : theme.palette.bleuPrincipal.main,
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
          [theme.breakpoints.down('md')]: {
            py: '8px',
          },
        }}
      >
        {icon && (
          <ListItemIcon
            sx={{
              minWidth: 'unset',
              color: 'inherit',
              [theme.breakpoints.down('md')]: {
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
              [theme.breakpoints.down('md')]: {
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
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
        <StyledLogoLink to="https://www.umontreal.ca/">
          <LogoUdeM
            style={{
              height: 'auto',
            }}
          />
        </StyledLogoLink>
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
            href="https://monudem.umontreal.ca/"
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
                padding: '5px 8px',
                '& .MuiButton-endIcon': {
                  marginLeft: '4px',
                  '& svg': {
                    fontSize: '12px',
                  },
                },
              },
            }}
            endIcon={<ArrowUpRightIcon size={28} />}
          >
            Mon UdeM
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
          [theme.breakpoints.down('md')]: {
            overflow: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            [theme.breakpoints.down('md')]: {
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
          <Nav aria-label="À propos">
            <NavHeader>À propos</NavHeader>
            <NavList>
              <NavListItem href="/a-propos/notre-organisation/">Notre organisation</NavListItem>
              <NavListItem href="/a-propos/nos-collections">Nos collections</NavListItem>
              <NavListItem href="/a-propos/mission-vision-valeur">Mission, vision, valeurs et objectifs</NavListItem>
              <NavListItem href="/a-propos/rapports-annuels">Rapports annuels</NavListItem>
              <NavListItem href="/a-propos/politiques-reglement">Politiques et règlement</NavListItem>
              <NavListItem href="/nouvelles/">Nouvelles</NavListItem>
              <NavListItem href="/a-propos/carriere">Carrière</NavListItem>
            </NavList>
          </Nav>

          <Nav aria-label="Plateformes" bg>
            <NavHeader>Plateformes</NavHeader>
            <NavList>
              <NavListItem href="https://studio.bib.umontreal.ca/">Studio•bib - écosystème numérique</NavListItem>
              <NavListItem href="https://boite-outils.bib.umontreal.ca/c.php?g=739631">La boîte à outils - guides</NavListItem>
              <NavListItem href="https://umontreal.on.worldcat.org/discovery?lang=fr">Sofia - outil de découverte</NavListItem>
              <NavListItem href="https://boite-outils.bib.umontreal.ca/az.php">Bases de données de A à Z</NavListItem>
              <NavListItem href="https://umontreal.scholaris.ca/">Papyrus - dépôt institutionnel</NavListItem>
              <NavListItem href="https://geoapp.bibl.ulaval.ca/">GéoIndex - données géospatiales</NavListItem>
              <NavListItem href="https://calypso.bib.umontreal.ca/">Calypso - objets numériques</NavListItem>
            </NavList>
          </Nav>

          <Nav aria-label="Obtenir un document">
            <NavHeader>Obtenir un document</NavHeader>
            <NavList>
              <NavListItem href="/obtenir/pret-renouvellement-retour/">Prêt, renouvellement, retour</NavListItem>
              <NavListItem href="/obtenir/numerisation">Demande de numérisation</NavListItem>
              <NavListItem href="/obtenir/peb/">Prêt entre bibliothèques</NavListItem>
              <NavListItem href="/obtenir/frais-avis">Frais et avis de retard</NavListItem>
              <NavListItem href="/nous-joindre/suggestion-achat/">Suggestion d'achat</NavListItem>
            </NavList>
          </Nav>

          <Nav aria-label="Liens rapides" bg>
            <NavHeader sx={{ visibility: 'hidden' }}>Liens rapides</NavHeader>
            <NavList>
              <NavListItem href="https://umontreal.on.worldcat.org/discovery?lang=fr" icon={<SofiaIcon color="white" fontSize="24px" />}>
                Sofia
              </NavListItem>
              <NavListItem href="/horaires" icon={<ClockCountdownIcon color="white" size={24} />}>
                Horaires
              </NavListItem>
              <NavListItem href="https://calendrier.bib.umontreal.ca/r" icon={<CalendarPlusIcon color="white" size={24} />}>
                Réserver une salle
              </NavListItem>
              <NavListItem href="https://studio.bib.umontreal.ca/informatique/" icon={<LifebuoyIcon color="white" size={24} />}>
                Soutien informatique
              </NavListItem>
            </NavList>
          </Nav>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: isMobile ? theme.palette.bleuFonce.main : 'transparent',
          [theme.breakpoints.down('md')]: {
            borderTop: `1px solid ${theme.palette.common.white}`,
          },
        }}
      >
        <SideNavHeaderContainer>
          <Box>
            <Link to="/" aria-label="Accueil" sx={{ display: 'block' }}>
              <LogoBibUBlanc
                style={{
                  width: '200px',
                  height: 'auto',
                  pointerEvents: 'none',
                  [theme.breakpoints.down('md')]: {
                    width: '150px',
                  },
                }}
              />
            </Link>
          </Box>
          <Box>
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
            >
              Nous joindre
            </Button>
          </Box>
        </SideNavHeaderContainer>
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
