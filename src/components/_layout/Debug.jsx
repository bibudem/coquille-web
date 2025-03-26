import { useEffect, useState } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import Color from 'color'
import ContrastColor from 'contrast-color'

export default function Debug() {
  const [resolution, setResolution] = useState('')
  const theme = useTheme()
  const cc = new ContrastColor()
  const queriesLength = theme.breakpoints.keys.length
  const queries = theme.breakpoints.keys.map((key, i) => {
    const bg = Color('#ff0000')
      .rotate((360 / queriesLength) * i)
      .hex()
    return {
      i,
      key,
      match: useMediaQuery(theme.breakpoints.only(key)),
      range: `${theme.breakpoints.values[key]} - ${i + 1 === theme.breakpoints.keys.length ? '' : theme.breakpoints.values[theme.breakpoints.keys[i + 1]]}`,
      color: cc.contrastColor({ bgColor: bg }),
      bg,
    }
  })

  useEffect(() => {
    const newResolution = queries.find((query) => query.match)
    if (resolution?.key !== newResolution.key) {
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
        lineHeight: 1,
        textAlign: 'center',
        opacity: 0.65,
        transition: 'opacity .15s',
        '&:hover': {
          opacity: 1,
          transition: 'opacity .15s',
        },
      }}
    >
      <Box sx={{ padding: '.5em .35em .35em .5em' }}>
        <Box
          sx={{
            color: resolution.color,
            backgroundColor: resolution.bg,
            borderRadius: '2px 2px 0 0',
            lineHeight: 1,
            padding: '.325em',
          }}
        >
          {resolution.key}
        </Box>
        <Box
          pt={0.25}
          sx={{
            fontSize: '.85em',
            color: '#000',
            backgroundColor: '#fff',
            borderRadius: '0 0 2px 2px',
            padding: '2px 3px',
          }}
        >
          {resolution.range}
        </Box>
      </Box>
    </Box>
  )
}
