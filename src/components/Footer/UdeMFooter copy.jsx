import { forwardRef } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Box, Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import FooterLink from './FooterLink'
import FooterContainer from './FooterContainer'
import UdeMFooterButton from './UdeMFooterButton.jsx'

function Copyright() {
  const namespaces = {
    'xmlns:cc': 'http://creativecommons.org/ns#',
    'xmlns:dct': 'http://purl.org/dc/terms/',
  }

  return (
    <p {...namespaces} style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}>
      <span property="dct:title">Ce site</span> est sous licence{' '}
      <FooterLink to="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">
        CC BY 4.0
        <img style={{ height: '1.125em', marginLeft: '3px', verticalAlign: 'text-bottom' }} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" />
        <img style={{ height: '1.125em', marginLeft: '3px', verticalAlign: 'text-bottom' }} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" />
      </FooterLink>
    </p>
  )
}

const UdeMFooterContent = styled(Box)(
  ({ theme }) => `
  padding-top: 1.3rem;
  height: 60px;
  padding-left: 2rem;
`
)

const UdeMFooter = styled('div', {
  name: 'BibFooter',
  slot: 'udem',
})(({ theme }) => ({
  backgroundColor: theme.palette.udemBleuFonce.main,
  color: theme.palette.udemBleuFonce.contrastText,
}))

const BibFooterUdeM = forwardRef(function BibFooterUdeM(props, ref) {
  return (
    <UdeMFooter ref={ref} id="t">
      <FooterContainer>
        <Box display="flex" paddingBlock="35px" width="100%" component="article">
          <Box flexGrow={1}>
            <a href="https://www.umontreal.ca">
              <StaticImage src="../../images/carre-UdeM_monde-RGB.svg" alt="Université de Montréal et du monde" layout="fixed" width={167} height={167} />
            </a>
          </Box>
          <Stack direction="column" component="section" aria-labelledby="udem-footer-aide-header">
            <Typography variant="body2" component="h2" id="udem-footer-aide-header">
              Besoin d'aide?
            </Typography>
            <FooterLink href="">Sureté</FooterLink>
            <FooterLink href="">Cliniques et soutien</FooterLink>
            <FooterLink href="">Signalement</FooterLink>
          </Stack>
          <Stack direction="column" component="section" aria-labelledby="udem-footer-info-header">
            <Typography component="h2" variant="body2" id="udem-footer-info-header">
              Informations
            </Typography>
            <FooterLink href="https://bcrp.umontreal.ca/">Relations médias</FooterLink>
            <FooterLink href="https://nouvelles.umontreal.ca/">Nouvelles</FooterLink>
            <FooterLink href="https://calendrier.umontreal.ca/">Calendrier</FooterLink>
          </Stack>
          <Stack direction="column" component="section" aria-labelledby="udem-footer-engagement-header">
            <Typography component="h2" variant="body2" id="udem-footer-engagement-header">
              Engagement
            </Typography>
            <FooterLink href="https://durable.umontreal.ca/">Durable</FooterLink>
            <FooterLink href="https://www.umontreal.ca/premierspeuples/">Premiers peuples</FooterLink>
            <FooterLink href="https://www.umontreal.ca/diversite/">Diversité</FooterLink>
          </Stack>
          <Stack direction="column" component="section" aria-labelledby="udem-footer-campus-header">
            <Typography component="h2" variant="body2" id="udem-footer-campus-header">
              Campus
            </Typography>
            <FooterLink href="https://www.umontreal.ca/nos-campus/montreal/">Montréal</FooterLink>
            <FooterLink href="https://www.umontreal.ca/nos-campus/brossard/">Brossard</FooterLink>
            <FooterLink href="https://www.umontreal.ca/nos-campus/laval/">Laval</FooterLink>
          </Stack>
          <section>
            <Stack
              direction="column"
              component="ul"
              spacing={1.25}
              sx={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <UdeMFooterButton href="tel:5143437771">Urgence 7771</UdeMFooterButton>
              </li>
              <li>
                <UdeMFooterButton href="http://www.umontreal.ca/carrieres/">Carrière</UdeMFooterButton>
              </li>
              <li>
                <UdeMFooterButton href="http://donner.umontreal.ca/">Je donne</UdeMFooterButton>
              </li>
            </Stack>
          </section>
        </Box>
      </FooterContainer>
      <Box display="flex" flexGrow="1">
        <UdeMFooterContent>
          <FooterLink to="#">Politique de confidentialité</FooterLink>
        </UdeMFooterContent>
        <UdeMFooterContent>
          <FooterLink to="#">Paramètres des témoins</FooterLink>
        </UdeMFooterContent>
        <UdeMFooterContent>
          <Copyright />
        </UdeMFooterContent>
      </Box>
      <FooterContainer></FooterContainer>
    </UdeMFooter>
  )
})

export default BibFooterUdeM
