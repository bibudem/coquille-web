import { Box, styled, Typography } from '@mui/material'
import { Chats, PaperPlaneTilt, Phone, Siren, YoutubeLogo, User } from '@phosphor-icons/react'
import { useSmall } from '@/hooks/use-small'

import BibFooterLink from './FooterLink'
import FooterContainer from './FooterContainer'
import LogoBibSceauBleu from '@/images/logo-bib/logo-bib-sceau-bleu.svg'
import LogoBibUBlanc from '@/images/logo-bib/logo-bib-U-blanc.svg'

const FooterLink = styled(BibFooterLink)({
  display: 'inline-flex',
  gap: 8,
  alignItems: 'center',
  fontSize: 'inherit',
  fontWeight: 400,
  lineHeight: 1.6,
  textDecorationSkipInk: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
})

function Col({ sx, children, ...props }) {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

function Header({ children }) {
  return (
    <Typography sx={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, color: '#fff' }} component="h3">
      {children}
    </Typography>
  )
}

const Ul = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

export default function LocalFooter() {
  const isSmall = useSmall('md')

  return (
    <FooterContainer sx={{ backgroundColor: 'bleuFonce.main', color: 'bleuFonce.contrastText' }}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          ...(isSmall && {
            flexDirection: 'column',
            gap: '45px',
          }),
          alignItems: 'stretch',
          padding: theme.spacing(3, 8, 3, 3.25),
          [theme.breakpoints.up('md')]: {
            padding: '24px 64px',
          },
          justifyContent: 'space-between',
        })}
      >
        {isSmall && (
          <Col>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <FooterLink
                to="/"
                aria-label="Accueil"
                sx={{
                  display: 'flex',
                }}
              >
                <LogoBibUBlanc
                  style={{
                    width: isSmall ? '100%' : 'auto',
                    height: isSmall ? 'auto' : '100%',
                    maxWidth: isSmall ? 270 : 'none',
                    padding: '12.715px 6.918px 5.36px 9.478px',
                  }}
                />
              </FooterLink>
            </Box>
          </Col>
        )}
        <Col>
          <Header>Nous joindre</Header>
          <Ul>
            <li>
              <FooterLink to="/nous-joindre/clavarder">
                <Chats color="currentColor" size={24} />
                Clavarder avec nous
              </FooterLink>
            </li>
            <li>
              <FooterLink to="/nous-joindre/nous-ecrire">
                <PaperPlaneTilt color="currentColor" size={24} />
                Nous écrire
              </FooterLink>
            </li>
            <li>
              <FooterLink to="/nous-joindre/notre-equipe">
                <User color="currentColor" size={24} />
                Contacter un membre de notre équipe
              </FooterLink>
            </li>
            <li>
              <FooterLink to="tel:+15143437643">
                <Phone color="currentColor" size={24} />
                514 343-7643
              </FooterLink>
            </li>
            <li>
              <FooterLink to="https://www.youtube.com/user/BibliothequesUdeM" sx={{ lineHeight: 1 }}>
            <YoutubeLogo color="currentColor" size={28} />
            YouTube
          </FooterLink>
            </li>
          </Ul>
          <Box>
            <FooterLink to="tel:+1514347771">
              <Siren color="#f04e24" size={28} />
              Urgence UdeM 514 343-7771
            </FooterLink>
          </Box>
        </Col>
        <Col>
          <Header>À propos</Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 0,
              }}
            >
              <Ul
                sx={(theme) => ({
                  [theme.breakpoints.up('md')]: {
                    maxWidth: '230px',
                  },
                })}
              >
                <li>
                  <FooterLink to="/a-propos/notre-organisation/">Notre organisation</FooterLink>
                </li>
                <li>
                  <FooterLink to="/a-propos/mission-vision-valeur">Mission, vision, valeurs et objectifs</FooterLink>
                </li>
                <li>
                  <FooterLink to="/a-propos/rapports-annuels">Rapports annuels</FooterLink>
                </li>
                <li>
                  <FooterLink to="/a-propos/politiques-reglement">Politique et règlement</FooterLink>
                </li>
                <li>
                  <FooterLink to="/a-propos/carriere/">Carrières</FooterLink>
                </li>
              </Ul>
              <Ul>
                <li>
                  <FooterLink to="/nouvelles/">Nouvelles</FooterLink>
                </li>
                <li>
                  <FooterLink to="/nous-soutenir/">Nous soutenir</FooterLink>
                </li>
                <li>
                  <FooterLink to="/service-accessibilite">Accessibilité Web</FooterLink>
                </li>
              </Ul>
            </Box>
          </Box>
        </Col>
        {!isSmall && (
          <Col>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <FooterLink
                to="/"
                aria-label="Accueil"
                sx={{
                  display: 'flex',
                  width: {
                    md: '200px',
                    lg: '250px',
                  },
                }}
              >
                <LogoBibSceauBleu
                  style={{
                    width: isSmall ? '100%' : 'auto',
                    height: isSmall ? 'auto' : '100%',
                    maxWidth: isSmall ? 200 : 'none',
                  }}
                />
              </FooterLink>
            </Box>
          </Col>
        )}
      </Box>
    </FooterContainer>
  )
}
