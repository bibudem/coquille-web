import { Box, styled } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import FooterLink from './FooterLink'
import FooterContainer from './FooterContainer'
import { FONT_OPACITY } from './UdeMFooter'

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
        <img role="presentation" style={{ height: '1.125em', marginLeft: '3px', verticalAlign: 'text-bottom', opacity: FONT_OPACITY }} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" />
        <img role="presentation" style={{ height: '1.125em', marginLeft: '3px', verticalAlign: 'text-bottom', opacity: FONT_OPACITY }} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" />
      </FooterLink>
    </p>
  )
}

const StyledNoteCell = styled(Grid)(({ theme }) => ({
  [`${theme.breakpoints.down('md')}`]: {
    position: 'relative',
    '&:not(:last-child):not(:first-child)': {
      paddingInlineEnd: '8px',
      '::after': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        borderRight: '1px solid currentColor',
        transform: 'scaleY(.6)',
      },
    },
  },
}))

function NoteCell({ children, ...props }) {
  return <StyledNoteCell {...props}>{children}</StyledNoteCell>
}

export function UdeMFooterNote() {
  function handleOnConsentLinkClick(e) {
    e.preventDefault()
    e.stopPropagation()
    document.querySelector('bib-consent')?.showPreferences()
  }

  return (
    <FooterContainer>
      <Box
        sx={{
          py: 1.5,
          borderTop: '1px solid currentColor',
          width: '100%',
          fontSize: '.6875rem',
        }}
      >
        <Grid container width="100%" columnGap={{ xs: 1, md: 2 }}>
          <NoteCell xs={12} md={true} order={{ xs: 1, md: 0 }} sx={{ paddingBlockStart: { xs: '1em', md: 0 } }}>
            <Copyright />
          </NoteCell>
          <NoteCell>
            <FooterLink to="#">Mentions légales</FooterLink>
          </NoteCell>
          <NoteCell>
            <FooterLink to="#">Confidentialité</FooterLink>
          </NoteCell>
          <NoteCell>
            <FooterLink to="#">Conditions d'utilisation</FooterLink>
          </NoteCell>
          <NoteCell>
            <FooterLink className="parametres-temoins" component="button" onClick={handleOnConsentLinkClick}>
              Paramètres des témoins
            </FooterLink>
          </NoteCell>
          <NoteCell>
            <FooterLink component="bib-consent-preferences-btn" sx={{ textDecoration: 'none' }}>
              Paramètres des témoins
            </FooterLink>
          </NoteCell>
          <NoteCell>
            <FooterLink to="#">Accessibilité</FooterLink>
          </NoteCell>
        </Grid>
      </Box>
    </FooterContainer>
  )
}
