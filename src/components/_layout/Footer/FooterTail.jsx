import Grid from '@mui/material/Grid2'
import FooterLink from './FooterLink'
import FooterContainer from './FooterContainer'
import Div from '@/components/utils/Div'

function Copyright() {
  const namespaces = {
    'xmlns:cc': 'http://creativecommons.org/ns#',
    'xmlns:dct': 'http://purl.org/dc/terms/',
  }

  return (
    <div {...namespaces} style={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}>
      <FooterLink to="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">
        <span property="dct:title">Ce site</span> est sous licence CC BY 4.0
      </FooterLink>
    </div>
  )
}

function Divider() {
  return <Div flexItem aria-hidden="true" sx={{ borderRight: '1px solid currentColor', height: '1lh' }} />
}

export default function FooterTail() {
  function handleOnConsentLinkClick(e) {
    e.preventDefault()
    e.stopPropagation()
    document.querySelector('bib-consent')?.showPreferences()
  }

  return (
    <FooterContainer
      sx={{
        backgroundColor: 'bleuPrincipal.main',
      }}
    >
      <Grid
        container
        sx={{
          padding: '8px 24px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          color: '#CCE2F3',
          fontSize: '14px',
          lineHeight: 1.2,
          letterSpacing: '0.14px',
          height: 50,
        }}
      >
        <Grid>
          <Copyright />
        </Grid>
        <Divider />
        <Grid>
          <FooterLink to="#">Confidentialité</FooterLink>
        </Grid>
        <Divider />
        <Grid>
          <FooterLink to="#">Conditions d'utilisation</FooterLink>
        </Grid>
        <Divider />
        <Grid>
          <FooterLink className="parametres-temoins" component="button" onClick={handleOnConsentLinkClick}>
            Paramètres des témoins
          </FooterLink>
        </Grid>
      </Grid>
    </FooterContainer>
  )
}
