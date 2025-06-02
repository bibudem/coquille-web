import { useEffect, useMemo, useState } from 'react'
import { Box, Divider, useTheme } from '@mui/material'
import LogoUdeM from './logo-udem.svg'

export default function LogoLink({ trigger }) {
  const theme = useTheme()
  const [color, setColor] = useState(theme.palette.grey['50'])

  const logoUdeMStyles = useMemo(() => ({
    width: 'auto',
    height: '59px',
    fill: 'currentcolor',
    ...(!trigger && { '--logo-u-fill': 'currentcolor' }),
  }), [trigger])

  useEffect(() => {
    setColor(trigger ? theme.palette.grey['50'] : 'inherit')
  }, [trigger, theme])

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        // color,
      }}
    >
      <LogoUdeM
        style={{
          ...logoUdeMStyles,
        }}
      />
      <Divider
        orientation="vertical"
        flexItem
        aria-hidden="true"
        sx={{
          borderColor: 'currentcolor',
          margin: '12px',
        }}
      />
      <Box
        sx={{
          color: 'inherit',
          fontSize: '1.1875rem',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.01188rem',
        }}
      >
        Les bibliothèques
      </Box>
    </Box>
  )
}