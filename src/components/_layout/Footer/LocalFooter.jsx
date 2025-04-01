import { forwardRef } from 'react'
import { IconButton, SvgIcon, styled, useMediaQuery, useTheme } from '@mui/material'
import { Box, Stack, TextField, Typography } from '@mui/material'
import Div from '@/components/utils/Div'

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

export default function LocalFooter() {
  const theme = useTheme()
  const isXSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <FooterContainer sx={{ backgroundColor: 'bleuFonce.main', color: 'bleuFonce.main' }}>
      <Div
        sx={{
          display: 'flex',
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
        </Box>
      </Div>
    </FooterContainer>
  )
}
