import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import { Info } from '@phosphor-icons/react/dist/csr/Info'
import { PaperPlaneTilt } from '@phosphor-icons/react/dist/csr/PaperPlaneTilt'
import { Phone } from '@phosphor-icons/react/dist/csr/Phone'
import { Siren } from '@phosphor-icons/react/dist/csr/Siren'
import { YoutubeLogo } from '@phosphor-icons/react/dist/csr/YoutubeLogo'
import { User } from '@phosphor-icons/react/dist/csr/User'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'

import BibFooterLink from './FooterLink'
import FooterContainer from './FooterContainer'

// Logos du pied de page servis comme fichiers statiques (<img>) plutôt
// qu'importés comme composants SVG : importés, ils étaient intégrés à la
// fois au JavaScript commun et au HTML de chaque page (~50 Ko). En <img>,
// le navigateur les télécharge une fois pour tout le site et les garde en
// cache ; `loading="lazy"` les charge seulement à l'approche du pied de page.
const LOGO_BIB_SCEAU_BLEU = '/images/logo-bib/logo-bib-sceau-bleu.svg'
const LOGO_BIB_U_BLANC = '/images/logo-bib/logo-bib-U-blanc.svg'

const FooterLink = styled(BibFooterLink)(({ theme }) => ({
  display: 'inline-flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.6,
  textDecorationSkipInk: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const Col = ({ sx, children, ...props }) => (
  <Box
    {...props}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      ...sx,
    }}
  >
    {children}
  </Box>
)

const Header = ({ children }) => <Typography component="h3">{children}</Typography>

const Ul = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  fontSize: '16px',
}))

const VerticalDivider = styled(Box)(({ theme }) => ({
  width: '1px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  margin: theme.spacing(0, 4),
  alignSelf: 'stretch',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export default function LocalFooter() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <FooterContainer
      sx={{
        backgroundColor: 'bleuFonce.main',
        color: 'bleuFonce.contrastText',
        pt: 4,
      }}
    >
      {!isSmall && (
        <>
          {/* Titre principal */}
          <Typography
            variant="h4"
            sx={{
              px: { xs: 3, md: 8 },
              mb: 4,
              paddingTop: 1,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Les bibliothèques de l'Université de Montréal
          </Typography>
        </>
      )}

      {/* Contenu principal */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'flex-start' },
          px: { xs: 3, md: 8 },
          pb: 4,
          gap: { xs: 4, md: 0 },
        }}
      >
        {/* Logo - visible sur mobile en haut */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            width: '100%',
            textAlign: 'center',
            mb: 3,
          }}
        >
          <FooterLink to="/" aria-label="Accueil" sx={{ justifyContent: 'left' }}>
            <img
              src={LOGO_BIB_U_BLANC}
              alt=""
              width="255"
              height="71"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                maxWidth: '250px',
                height: 'auto',
              }}
            />
          </FooterLink>
        </Box>

        {/* Colonne 1 - Liens principaux */}
        <Col
          sx={{
            flex: 1,
            minWidth: 0,
            alignItems: { xs: 'flex-start', md: 'flex-start' },
          }}
        >
          <Ul>
            <li>
              <FooterLink to="/nous-joindre/">
                <PaperPlaneTilt color="currentColor" size={18} />
                Nous joindre
              </FooterLink>
            </li>
            <li>
              <FooterLink to="https://umontreal.account.worldcat.org/account" rel="noopener noreferrer">
                <User color="currentColor" size={18} />
                Votre dossier
              </FooterLink>
            </li>
            <li>
              <FooterLink to="/a-propos/">
                <Info color="currentColor" size={18} />À propos
              </FooterLink>
            </li>
            <li>
              {' '}
              {/* Padding-top ajouté ici */}
              <Box
                sx={{
                  display: 'flex',
                  marginTop: '30px',
                  justifyContent: 'center',
                  gap: 3 /* Espacement entre les icônes augmenté */,
                }}
              >
                <FooterLink to="https://www.youtube.com/user/BibliothequesUdeM">
                  <YoutubeLogo color="currentColor" size={24} /> {/* Taille 24px */}
                </FooterLink>
                <FooterLink to="https://www.instagram.com/umontreal/">
                  <InstagramLogo color="currentColor" size={24} /> {/* Taille 24px */}
                </FooterLink>
              </Box>
            </li>
          </Ul>
        </Col>

        <VerticalDivider />

        {/* Colonne 2 - Catalogue */}
        <Col
          sx={{
            flex: 1,
            minWidth: 0,
            alignItems: { xs: 'flex-start', md: 'flex-start' },
          }}
        >
          <Ul>
            <li>
              <FooterLink to="/">Site des bibliothèques</FooterLink>
            </li>
            <li>
              <FooterLink to="https://umontreal.on.worldcat.org/discovery?lang=fr" rel="noopener noreferrer">
                Catalogue Sofia
              </FooterLink>
            </li>
            <li>
              <FooterLink to="https://boite-outils.bib.umontreal.ca/az.php?_gl=1*h6zdx1*_ga*MjA0NjEwOTk1MC4xNzQ4Mzc3Mzk0*_ga_V8J6YFFD4F*czE3NTUxNzk5NzAkbzEwMyRnMSR0MTc1NTE4MjIxMSRqMzUkbDAkaDA.">Base de données A-Z</FooterLink>
            </li>
          </Ul>
        </Col>

        <VerticalDivider />

        {/* Colonne 3 - Outils */}
        <Col
          sx={{
            flex: 1,
            minWidth: 0,
            alignItems: { xs: 'flex-start', md: 'flex-start' },
          }}
        >
          <Ul>
            <li>
              <FooterLink to="https://boite-outils.bib.umontreal.ca/">Boite à outils </FooterLink>
            </li>
            <li>
              <FooterLink to="https://studio.bib.umontreal.ca/">Studio-bib</FooterLink>
            </li>
            <li>
              <FooterLink to="https://umontreal.scholaris.ca/">Papyrus</FooterLink>
            </li>
            <li>
              <FooterLink to="https://geoapp.bibl.ulaval.ca/" rel="noopener noreferrer">
                Géolndex
              </FooterLink>
            </li>
            <li>
              <FooterLink to="https://calypso.bib.umontreal.ca/?_gl=1*qh4l8s*_ga*MjA0NjEwOTk1MC4xNzQ4Mzc3Mzk0*_ga_V8J6YFFD4F*czE3NTUxNzk5NzAkbzEwMyRnMSR0MTc1NTE4MjM1OSRqMTkkbDAkaDA.">Calypso</FooterLink>
            </li>
          </Ul>
        </Col>

        {/* Logo - visible sur desktop à droite */}
        {!isSmall && (
          <>
            <Col
              sx={{
                flex: 1,
                minWidth: 0,
                alignItems: 'flex-end',
                pl: 4,
              }}
            >
              <FooterLink to="/" aria-label="Accueil">
                <img
                  src={LOGO_BIB_SCEAU_BLEU}
                  alt=""
                  width="302"
                  height="302"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '200px',
                    height: 'auto',
                    maxWidth: '100%',
                  }}
                />
              </FooterLink>
            </Col>
          </>
        )}
      </Box>

      {/* Pied de page - sans ligne horizontale */}
      <Box
        sx={{
          px: { xs: 3, md: 8 },
          py: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <FooterLink to="tel:+15143437771">
          <Siren color="#f04e24" size={24} />
          Urgence UdeM 514 343-7771
        </FooterLink>
      </Box>
    </FooterContainer>
  )
}
