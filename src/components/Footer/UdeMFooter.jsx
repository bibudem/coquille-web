import { forwardRef, useEffect, useState } from 'react'
import { Stack, Typography, Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import FooterLink from './FooterLink'
import FooterContainer from './FooterContainer'
import UdeMFooterButton from './UdeMFooterButton'
import { UdeMFooterNote } from './UdeMFooterNote'
import { useSmall } from '@/hooks/use-small'

export const FONT_OPACITY = 0.65

const UdeMFooter = styled('div', {
  name: 'BibFooter',
  slot: 'udem',
})(({ theme }) => ({
  backgroundColor: theme.palette.udemBleuFonce.main,
  color: `rgb(${theme.palette.udemBleuFonce.contrastTextChannel} / ${FONT_OPACITY})`,
}))

function UdeMFooterSectionHeader({ children, ...props }) {
  return (
    <Typography
      variant="body2"
      component="h2"
      sx={{
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
  const isSmall = useSmall()
  const [carreUdeMMondeSize, setCarreUdeMMondeSize] = useState(167)

  useEffect(() => {
    setCarreUdeMMondeSize(isSmall ? 135 : 167)
  }, [isSmall])

  return (
    <UdeMFooter ref={ref}>
      <FooterContainer>
        <Box paddingBlock="35px" width="100%">
          <Grid container width="100%" rowSpacing={2} columnSpacing={{ xs: 1.5, md: 2 }}>
            <Grid xs={12} md={5} display="flex" paddingBlockEnd={{ xs: 3, md: 0 }}>
              <a href="https://www.umontreal.ca" id="awef">
                <img src={'/images/carre-UdeM_monde-RGB.svg'} alt="Université de Montréal et du Monde" width={carreUdeMMondeSize} height={carreUdeMMondeSize} />
              </a>
            </Grid>
            <Grid xs={6} md>
              <Stack direction="column" component="section" aria-labelledby="udem-footer-aide-header">
                <UdeMFooterSectionHeader id="udem-footer-aide-header">Besoin d'aide?</UdeMFooterSectionHeader>
                <FooterLink to="https://umontreal.ca/">Sureté</FooterLink>
                <FooterLink to="https://umontreal.ca/">Cliniques et soutien</FooterLink>
                <FooterLink to="https://denonciation-udem.icotechnologies.com/">Signalement</FooterLink>
              </Stack>
            </Grid>
            <Grid xs={6} md>
              <Stack direction="column" component="section" aria-labelledby="udem-footer-info-header">
                <UdeMFooterSectionHeader id="udem-footer-info-header">Informations</UdeMFooterSectionHeader>
                <FooterLink to="https://bcrp.umontreal.ca/">Relations médias</FooterLink>
                <FooterLink to="https://nouvelles.umontreal.ca/">Nouvelles</FooterLink>
                <FooterLink to="https://calendrier.umontreal.ca/">Calendrier</FooterLink>
              </Stack>
            </Grid>
            <Grid xs={6} md>
              <Stack direction="column" component="section" aria-labelledby="udem-footer-engagement-header">
                <UdeMFooterSectionHeader id="udem-footer-engagement-header">Engagement</UdeMFooterSectionHeader>
                <FooterLink to="https://durable.umontreal.ca/">Durable</FooterLink>
                <FooterLink to="https://www.umontreal.ca/premierspeuples/">Premiers peuples</FooterLink>
                <FooterLink to="https://www.umontreal.ca/diversite/">Diversité</FooterLink>
              </Stack>
            </Grid>
            <Grid xs={6} md>
              <Stack direction="column" component="section" aria-labelledby="udem-footer-campus-header">
                <UdeMFooterSectionHeader id="udem-footer-campus-header">Campus</UdeMFooterSectionHeader>
                <FooterLink to="https://www.umontreal.ca/nos-campus/montreal/">Montréal</FooterLink>
                <FooterLink to="https://www.umontreal.ca/nos-campus/brossard/">Brossard</FooterLink>
                <FooterLink to="https://www.umontreal.ca/nos-campus/laval/">Laval</FooterLink>
              </Stack>
            </Grid>
            <Grid component="section" xs="12" md="auto" display="flex" justifyContent={isSmall ? 'flex-end' : null}>
              <Grid
                container
                component="ul"
                direction={{ xs: 'row', md: 'column' }}
                rowGap={{ xs: 2, md: 1.25 }}
                columnGap={{ xs: 2, md: 0 }}
                sx={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  paddingBlockStart: isSmall && 4,
                }}
              >
                <li>
                  <UdeMFooterButton to="tel:5143437771">Urgence 7771</UdeMFooterButton>
                </li>
                <li>
                  <UdeMFooterButton to="http://www.umontreal.ca/carrieres/">Carrière</UdeMFooterButton>
                </li>
                <li>
                  <UdeMFooterButton to="http://donner.umontreal.ca/">Je donne</UdeMFooterButton>
                </li>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FooterContainer>
      <UdeMFooterNote />
    </UdeMFooter>
  )
})

export default BibFooterUdeM
