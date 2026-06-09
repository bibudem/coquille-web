import { Box } from '@mui/material'

export default function Nombre({ number, label }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
      }}
    >
      <Box sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>{number}</Box>
      <Box sx={{ fontSize: 'smaller' }}>{label}</Box>
    </Box>
  )
}
