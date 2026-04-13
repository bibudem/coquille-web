import { Box, ButtonBase, SvgIcon } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useSmall } from '@/hooks/use-small'
import ByIcon from '@/icons/by.svg'
import CcIcon from '@/icons/cc.svg'
import FooterLink from './FooterLink'
import FooterContainer from './FooterContainer'

function Copyright() {
  const namespaces = {
    'xmlns:cc': 'http://creativecommons.org/ns#',
    'xmlns:dct': 'http://purl.org/dc/terms/',
  }

  return (
    <div {...namespaces} style={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}>
      <FooterLink to="/conditions-utilisation" target="_blank" rel="license noopener noreferrer">
        <SvgIcon component={CcIcon} inheritViewBox sx={{ width: '1ex', height: '1ex', marginRight: '4px', fill: 'currentColor', circle: { fill: 'none' } }} />
        <SvgIcon component={ByIcon} inheritViewBox sx={{ width: '1ex', height: '1ex', marginRight: '4px', fill: 'currentColor', circle: { fill: 'none' } }} />
        <span property="dct:title">Sauf indications contraires, ce site</span> est sous licence CC BY 4.0
      </FooterLink>
    </div>
  )
}

function Divider() {
  return <Box flexItem aria-hidden="true" sx={{ borderRight: '1px solid currentColor', height: '1lh' }} />
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
      <Box
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
          <Box>
            <Copyright />
          </Box>
        )}
        {!isSmall && <Divider />}
        <Box>
          <FooterLink to="https://vie-privee.umontreal.ca/confidentialite/">Confidentialité</FooterLink>
        </Box>
        {!isSmall && <Divider />}
        <Grid>
          <FooterLink to="/conditions-utilisation">Conditions d'utilisation</FooterLink>
        </Grid>
        {!isSmall && <Divider />}
        <Grid>
          <FooterLink to="/accessibilite-web">Accessibilité</FooterLink>
        </Grid>
        {!isSmall && <Divider />}
        <Box>
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
        </Box>
        {isSmall && (
          <Box>
            <Copyright />
          </Box>
        )}
      </Box>
    </FooterContainer>
  )
}
