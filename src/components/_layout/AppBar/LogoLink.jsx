import { Box, Divider } from '@mui/material'
import LogoUdeM from './logo-udem.svg'

export default function LogoLink({ trigger }) {
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          '& svg': {
            filter: trigger ? 'none' : 'brightness(0) invert(1)',
            opacity: 1,
            transition: 'filter 0.3s ease, opacity 0.3s ease',
          },
          '&:hover svg': {
            opacity: 0.80,
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