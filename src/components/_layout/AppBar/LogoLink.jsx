import { Box, Divider } from '@mui/material'
import LogoUdeM from './logo-udem.svg'

export default function LogoLink({ trigger }) {
  const fillColor = trigger ? '#000 !important' : '#fff !important'

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        userSelect: 'none',
      }}
    >
      <Box
        component="a"
        href="https://www.umontreal.ca"
        rel="noopener noreferrer"
        target="_blank"
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          '& svg': {
            filter: trigger ? 'none' : 'brightness(0) invert(1)',
            transition: 'filter 0.3s ease',
          },
          '&:hover svg': {
            filter: trigger
              ? 'brightness(0.3)'
              : 'brightness(0.2) invert(1)',
          },
          '& svg *': {
            fill: fillColor,
            stroke: fillColor,
            transition: 'fill 0.3s ease, stroke 0.3s ease',
          },
        }}
      >
        <LogoUdeM style={{ width: 'auto', height: '59px' }} />
      </Box>

      <Divider
        orientation="vertical"
        sx={{
          borderColor: 'currentcolor',
          height: '32px',
        }}
      />

      <Box
        component="a"
        href="/"
        sx={{
          fontSize: '1.1875rem',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.01188rem',
          color: 'inherit',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Les bibliothèques
      </Box>
    </Box>
  )
}