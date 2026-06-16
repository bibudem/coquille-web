import { Box } from '@mui/material'

export default function Nombre({ number, label, sx }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        ...sx,
      }}
    >
      <Box sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>{number}</Box>
      <Box sx={{ textAlign: 'center', fontSize: 'smaller' }}>{label}</Box>
    </Box>
  )
}
