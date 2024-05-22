import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Debug() {
  const [resolution, setResolution] = useState('')
  const theme = useTheme()
  const queries = theme.breakpoints.keys.map((key, i) => ({
    key,
    match: useMediaQuery(theme.breakpoints.only(key)),
    range: `${theme.breakpoints.values[key]} - ${i + 1 === theme.breakpoints.keys.length ? '' : theme.breakpoints.values[theme.breakpoints.keys[i + 1]]}`,
  }))

  useEffect(() => {
    const newResolution = queries.find((query) => query.match)
    if (resolution.key !== newResolution.key) {
      setResolution(newResolution)
    }
  }, queries)

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 9999999,
        fontSize: '.7rem',
        // opacity: 0.85,
        lineHeight: 1,
        textAlign: 'center',
        backgroundColor: 'rgb(255 255 255 / 76%)',
      }}
    >
      <Box sx={{ padding: '.5em' }}>
        <Box
          sx={{
            color: '#fff',
            backgroundColor: '#df0202',
            borderRadius: '2px',
            lineHeight: 1,
            padding: '.325em',
          }}
        >
          {resolution.key}
        </Box>
        <Box pt={0.25} sx={{ fontSize: '.9em' }}>
          {resolution.range}{' '}
        </Box>
      </Box>
    </Box>
  )
}
