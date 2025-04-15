import { styled, Typography } from '@mui/material'
import { Chats, PaperPlaneTilt, Phone, Siren, YoutubeLogo } from '@phosphor-icons/react'
import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'

import FooterLink from './FooterLink'
import FooterContainer from './FooterContainer'
import LogoBibSceauBleu from '@/images/logo-bib/logo-bib-sceau-bleu.svg'

const logoStyle = {
  height: {
    xs: 125,
    md: 252,
  },
  width: {
    xs: 'auto',
  },
  fill: 'currentColor',
}

const linkStyles = {
  display: 'inline-flex',
  gap: 8,
  alignItems: 'center',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.6,
  textDecorationSkipInk: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}

const FooterLink1 = styled(FooterLink)({
  ...linkStyles,
  color: '#fafdfe',
})

const FooterLink2 = styled(FooterLink)({
  ...linkStyles,
  color: '#cce2f3',
})

function Col({ sx, children, ...props }) {
  return (
    <Div
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        ...sx,
      }}
    >
      {children}
    </Div>
  )
}

function Header({ children }) {
  return (
    <Typography sx={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, color: '#e5f0f8' }} component="h3">
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
      <Div
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'stretch',
          padding: '0 20px',
          [theme.breakpoints.up('md')]: {
            padding: '0 64px',
          },
          justifyContent: 'space-between',
        })}
      >
        <Col>
          <Header>Nous joindre</Header>
          <Ul>
            <li>
              <FooterLink2 to="/nous-joindre">
                <Chats color="currentColor" size={24} />
                Clavarder avec nous
              </FooterLink2>
            </li>
            <li>
              <FooterLink2 to="/nous-joindre">
                <PaperPlaneTilt color="currentColor" size={24} />
                Nous écrire
              </FooterLink2>
            </li>
            <li>
              <FooterLink2 to="tel:+15143437643">
                <Phone color="currentColor" size={24} />
                514 343-7643
              </FooterLink2>
            </li>
          </Ul>
          <FooterLink1 to="https://www.youtube.com/user/BibliothequesUdeM" sx={{ lineHeight: 1 }}>
            <YoutubeLogo color="currentColor" size={28} />
            YouTube
          </FooterLink1>
          <Div>
            <FooterLink1 to="tel:+1514347771">
              <Siren color="#f04e24" size={28} />
              Urgence 514 343-7771
            </FooterLink1>
          </Div>
        </Col>
        <Col>
          <Header>À propos</Header>
          <Div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Div
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
                  <FooterLink2 to="#">Notre équipe</FooterLink2>
                </li>
                <li>
                  <FooterLink2 to="#">Mission, vision, valeurs et objectifs</FooterLink2>
                </li>
                <li>
                  <FooterLink2 to="#">Rapports annuels</FooterLink2>
                </li>
                <li>
                  <FooterLink2 to="#">Politique et règlement</FooterLink2>
                </li>
                <li>
                  <FooterLink2 to="#">Carrières</FooterLink2>
                </li>
              </Ul>
              <Ul>
                <li>
                  <FooterLink2 to="#">Nouvelles</FooterLink2>
                </li>
                <li>
                  <FooterLink2 to="#">Nous soutenir</FooterLink2>
                </li>
                <li>
                  <FooterLink2 to="#">Accessibilité Web</FooterLink2>
                </li>
              </Ul>
            </Div>
          </Div>
        </Col>
        <Col>
          <Div
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
              sx={(theme) => ({
                display: 'flex',
              })}
            >
              <LogoBibSceauBleu
                style={{
                  width: isSmall ? '100%' : 'auto',
                  height: isSmall ? 'auto' : '100%',
                  maxWidth: isSmall ? 200 : 'none',
                }}
              />
            </FooterLink>
          </Div>
        </Col>
      </Div>
    </FooterContainer>
  )
}
