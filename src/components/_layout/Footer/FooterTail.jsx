import Grid from '@mui/material/Grid2'
import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'
import FooterLink from './FooterLink'
import FooterContainer from './FooterContainer'
import { ButtonBase } from '@mui/material'

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
  const isSmall = useSmall('md')

  function handleOnConsentLinkClick(e) {
    e.preventDefault()
    e.stopPropagation()
    document.querySelector('bib-consent')?.showPreferences()
  }

  return (
    <FooterContainer
      sx={{
        backgroundColor: isSmall ? 'bleuFonce.main' : 'bleuPrincipal.main',
      }}
    >
      <Div
        sx={{
          padding: '8px 24px',
          width: '100%',
          display: 'flex',
          gap: '20px',
          ...(isSmall
            ? {
                flexDirection: 'column',
                paddingBottom: 'calc(100px + 1em)',
              }
            : {
                alignItems: 'center',
                height: 50,
              }),
          color: '#cce2f3',
          fontSize: '14px',
          lineHeight: 1.2,
          letterSpacing: '0.14px',
        }}
      >
        {!isSmall && (
          <Div>
            <Copyright />
          </Div>
        )}
        {!isSmall && <Divider />}
        <Div>
          <FooterLink to="#">Confidentialité</FooterLink>
        </Div>
        {!isSmall && <Divider />}
        <Grid>
          <FooterLink to="#">Conditions d'utilisation</FooterLink>
        </Grid>
        {!isSmall && <Divider />}
        <Div>
          <ButtonBase
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            className="parametres-temoins"
            onClick={handleOnConsentLinkClick}
          >
            Paramètres des témoins
          </ButtonBase>
        </Div>
        {isSmall && (
          <Div>
            <Copyright />
          </Div>
        )}
      </Div>
    </FooterContainer>
  )
}
