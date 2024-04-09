import { Box, Typography, Stack } from '@mui/material'
import styled from '@emotion/styled'
import FooterLink from '@/components/Footer/FooterLink'

function Copyright() {
  const namespaces = {
    'xmlns:cc': 'http://creativecommons.org/ns#',
    'xmlns:dct': 'http://purl.org/dc/terms/',
  }

  return (
    <>
      <p {...namespaces} style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}>
        <span property="dct:title">Ce site</span> est sous licence{' '}
        <FooterLink to="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">
          CC BY 4.0
          <img style={{ height: '1.125em', marginLeft: '3px', verticalAlign: 'text-bottom' }} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" />
          <img style={{ height: '1.125em', marginLeft: '3px', verticalAlign: 'text-bottom' }} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" />
        </FooterLink>
      </p>
    </>
  )
}

const FooterNoteContent = styled(Box)(
  ({ theme }) => `
  padding-top: 1.3rem;
  height: 60px;
  padding-left: 2rem;
`
)

export default function () {
  return (
    <Box
      display="flex"
      width="100%"
      sx={{
        backgroundColor: 'primary.main',
      }}
    >
      <Box
        sx={{
          width: {
            xs: '.75rem',
            lg: 'calc((100% - 1140px)/2 + var(--bs-gutter-x, 0.75rem)/2)',
          },
        }}
      />
      <Box
        display="flex"
        flexGrow="1"
        sx={{
          backgroundColor: '#0b113a',
        }}
      >
        <FooterNoteContent>
          <FooterLink to="#">Politique de confidentialité</FooterLink>
        </FooterNoteContent>
        <FooterNoteContent>
          <FooterLink to="#">Paramètres des témoins</FooterLink>
        </FooterNoteContent>
        <FooterNoteContent>
          <Copyright />
        </FooterNoteContent>
      </Box>
    </Box>
  )
}
