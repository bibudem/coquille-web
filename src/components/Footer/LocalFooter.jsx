import { forwardRef } from 'react'
import { IconButton, SvgIcon, styled, useMediaQuery, useTheme } from '@mui/material'
import { Box, Stack, TextField, Typography } from '@mui/material'

import FooterLink from './FooterLink'
import FooterContainer from './FooterContainer'
import LogoBibSceauBlanc from '@/images/logo-bib-sceau-blanc.svg'

const logoStyle = {
  height: {
    xs: 125,
    md: 175,
  },
  width: {
    xs: 'auto',
  },
  fill: 'currentColor',
}

const BibFooterLocal = styled('div', {
  name: 'BibFooter',
  slot: 'local',
})(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}))

const FooterLocal = forwardRef(function FooterLocal(props, ref) {
  const theme = useTheme()
  const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <BibFooterLocal ref={ref}>
      <FooterContainer
        sx={{
          flexDirection: {
            xs: 'row',
            md: 'column',
          },
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ ml: '-15px' }}>
              <FooterLink
                to="/"
                aria-label="Accueil"
                sx={{
                  display: 'block',
                }}
              >
                <SvgIcon component={LogoBibSceauBlanc} inheritViewBox sx={logoStyle} />
              </FooterLink>
            </Box>
            <Box flexGrow={1}>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                Infolettre
              </Typography>
              <Typography variant="body2" sx={{ opacity: '.73' }}>
                S'inscrire à l'infolettre des Bibliothèques
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap alignItems="center">
                <TextField
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="standard"
                  fullWidth
                  aria-label="Entrez votre adresse courriel"
                  placeholder="Votre adresse courriel"
                  sx={(theme) => ({
                    minWidth: {
                      md: 285,
                    },
                    width: 'unset',
                    '--bib-palette-text-primary': theme.palette.primary.contrastText,
                    '& .MuiInputBase-root::before': {
                      borderColor: theme.palette.primary.contrastText,
                      opacity: theme.vars.opacity.inputUnderline,
                    },
                  })}
                  slotProps={{
                    htmlInput: {
                      autoComplete: 'off',
                      'aria-label': 'Entrez votre adresse courriel',
                    },
                  }}
                />
              </Stack>
            </Box>
          </Box>
          {!isXSmall && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography variant="body2" fontWeight={600}>
                  Product
                </Typography>
                <FooterLink to="#">Features</FooterLink>
                <FooterLink to="#">Testimonials</FooterLink>
                <FooterLink to="#">Highlights</FooterLink>
                <FooterLink to="#">Pricing</FooterLink>
                <FooterLink to="#">FAQs</FooterLink>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography variant="body2" fontWeight={600}>
                  Company
                </Typography>
                <FooterLink to="#">About us</FooterLink>
                <FooterLink to="#">Careers</FooterLink>
                <FooterLink to="#">Press</FooterLink>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography variant="body2" fontWeight={600}>
                  Legal
                </Typography>
                <FooterLink to="#">Terms</FooterLink>
                <FooterLink to="#">Privacy</FooterLink>
                <FooterLink to="#">Contact</FooterLink>
              </Box>
            </>
          )}
        </Box>
      </FooterContainer>
    </BibFooterLocal>
  )
})
// }

export default FooterLocal
