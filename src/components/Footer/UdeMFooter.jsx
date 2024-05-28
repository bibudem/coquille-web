import { forwardRef } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Box, Divider, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles'
import FooterLink from './FooterLink'
import FooterContainer from './FooterContainer'
import UdeMFooterButton from './UdeMFooterButton'

const FONT_OPACITY = 0.65

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
        <img style={{ height: '1.125em', marginLeft: '3px', verticalAlign: 'text-bottom', opacity: FONT_OPACITY }} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" />
        <img style={{ height: '1.125em', marginLeft: '3px', verticalAlign: 'text-bottom', opacity: FONT_OPACITY }} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" />
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
  // color: theme.palette.udemBleuFonce.contrastText,
  color: `rgb(${theme.palette.udemBleuFonce.contrastTextChannel} / ${FONT_OPACITY})`,
}))

function UdeMFooterSectionHeader({ children, ...props }) {
  return (
    <Typography
      variant="body2"
      component="h2"
      sx={{
        // fontSize: '.685rem',
        fontSize: '.63rem',
        paddingBlockEnd: 1.5,
      }}
      {...props}
    >
      {children}
    </Typography>
  )
}

const BibFooterUdeM = forwardRef(function BibFooterUdeM(props, ref) {
  return (
    <UdeMFooter ref={ref}>
      <FooterContainer>
        <Grid container paddingBlock="35px" width="100%">
          <Grid xs={5} display="flex">
            <a href="https://www.umontreal.ca" id="awef">
              <StaticImage src="../../images/carre-UdeM_monde-RGB.svg" alt="Université de Montréal et du monde" layout="fixed" width={167} height={167} />
            </a>
          </Grid>
          <Grid xs>
            <Stack direction="column" component="section" aria-labelledby="udem-footer-aide-header">
              <UdeMFooterSectionHeader id="udem-footer-aide-header">Besoin d'aide?</UdeMFooterSectionHeader>
              <FooterLink href="https://umontreal.ca/">Sureté</FooterLink>
              <FooterLink href="https://umontreal.ca/">Cliniques et soutien</FooterLink>
              <FooterLink href="https://denonciation-udem.icotechnologies.com/">Signalement</FooterLink>
            </Stack>
          </Grid>
          <Grid xs>
            <Stack direction="column" component="section" aria-labelledby="udem-footer-info-header">
              <UdeMFooterSectionHeader id="udem-footer-info-header">Informations</UdeMFooterSectionHeader>
              <FooterLink href="https://bcrp.umontreal.ca/">Relations médias</FooterLink>
              <FooterLink href="https://nouvelles.umontreal.ca/">Nouvelles</FooterLink>
              <FooterLink href="https://calendrier.umontreal.ca/">Calendrier</FooterLink>
            </Stack>
          </Grid>
          <Grid xs>
            <Stack direction="column" component="section" aria-labelledby="udem-footer-engagement-header">
              <UdeMFooterSectionHeader id="udem-footer-engagement-header">Engagement</UdeMFooterSectionHeader>
              <FooterLink href="https://durable.umontreal.ca/">Durable</FooterLink>
              <FooterLink href="https://www.umontreal.ca/premierspeuples/">Premiers peuples</FooterLink>
              <FooterLink href="https://www.umontreal.ca/diversite/">Diversité</FooterLink>
            </Stack>
          </Grid>
          <Grid xs>
            <Stack direction="column" component="section" aria-labelledby="udem-footer-campus-header">
              <UdeMFooterSectionHeader id="udem-footer-campus-header">Campus</UdeMFooterSectionHeader>
              <FooterLink href="https://www.umontreal.ca/nos-campus/montreal/">Montréal</FooterLink>
              <FooterLink href="https://www.umontreal.ca/nos-campus/brossard/">Brossard</FooterLink>
              <FooterLink href="https://www.umontreal.ca/nos-campus/laval/">Laval</FooterLink>
            </Stack>
          </Grid>
          <Grid display="flex" justifyContent="flex-end">
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
          </Grid>
        </Grid>
      </FooterContainer>
      <FooterContainer>
        <Box
          sx={(theme) => ({
            py: 1.5,
            borderTop: '1px solid currentColor',
            width: '100%',
            fontSize: '.6875rem',
          })}
        >
          <Grid container width="100%" gap={2}>
            <Grid xs>
              <Copyright />
            </Grid>
            <Grid>
              <FooterLink to="#">Mentions légales</FooterLink>
            </Grid>
            <Grid>
              <FooterLink to="#">Confidentialité</FooterLink>
            </Grid>
            <Grid>
              <FooterLink to="#">Conditions d'utilisation</FooterLink>
            </Grid>
            <Grid>
              <FooterLink to="#">Paramètres des témoins</FooterLink>
            </Grid>
            <Grid>
              <FooterLink to="#">Accessibilité</FooterLink>
            </Grid>
          </Grid>
        </Box>
      </FooterContainer>
    </UdeMFooter>
  )
})

export default BibFooterUdeM
