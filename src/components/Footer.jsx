import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import FooterNote from '@/components/Footer/FooterNote'
import SocialMedia from '@/components/Footer/SocialMedia'
import Link from '@/components/Footer/Link'
import LogoBibSceauBlanc from '../images/logo-bib-sceau-blanc.svg'
import { IconButton, SvgIcon, useMediaQuery, useTheme } from '@mui/material'
import { Send } from '@mui/icons-material'

const logoStyle = {
  // width: '140px',
  height: {
    xs: 125,
    md: '100%',
  },
  width: {
    xs: 'auto',
  },
  fill: 'currentColor',
}

export default function Footer() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={{
        color: 'primary.contrastText',
        backgroundColor: 'primary.main',
        fontSize: '.875rem',
        '*': {
          fontSize: 'inherit',
        },
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'row',
            md: 'column',
          },
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
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
              <Link to="/" display="block">
                <SvgIcon component={LogoBibSceauBlanc} inheritViewBox sx={logoStyle} />
              </Link>
            </Box>
            <Box flexGrow={1}>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" color="primary.contrastText" mb={2}>
                Subscribe to our newsletter for weekly updates and promotions.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label="Enter your email address"
                  placeholder="Your email address"
                  inputProps={{
                    autoComplete: 'off',
                    'aria-label': 'Enter your email address',
                  }}
                />
                {isSmall ? (
                  <IconButton aria-label="Envoyer" sx={{ flexShrink: 0 }} color="inherit">
                    <Send />
                  </IconButton>
                ) : (
                  <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
                    Subscribe
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Product
            </Typography>
            <Link color="primary.contrastText" href="#">
              Features
            </Link>
            <Link color="primary.contrastText" href="#">
              Testimonials
            </Link>
            <Link color="primary.contrastText" href="#">
              Highlights
            </Link>
            <Link color="primary.contrastText" href="#">
              Pricing
            </Link>
            <Link color="primary.contrastText" href="#">
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Company
            </Typography>
            <Link color="primary.contrastText" href="#">
              About us
            </Link>
            <Link color="primary.contrastText" href="#">
              Careers
            </Link>
            <Link color="primary.contrastText" href="#">
              Press
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Legal
            </Typography>
            <Link color="primary.contrastText" href="#">
              Terms
            </Link>
            <Link color="primary.contrastText" href="#">
              Privacy
            </Link>
            <Link color="primary.contrastText" href="#">
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
      <SocialMedia />
      <FooterNote />
    </Box>
  )
}
