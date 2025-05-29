import { useEffect, useMemo, useState } from 'react'
import { Box, Divider, useTheme } from '@mui/material'
import LogoUdeMMonochrome from '@/images/logo-udem/logo_udem-noir.svg'
import LogoUdeM from '@/images/logo-udem/logo_udem-officiel.svg'
import LogoUdeM_ from './logo-udem.svg'

export default function LogoLink({ lvl, trigger }) {
  const theme = useTheme()
  const [color, setColor] = useState(theme.palette.grey['50'])
  const logoUdeMBaseStyles = {
    width: 'auto',
    height: '59px',
    // fill: lvl < 2 ? theme.palette.grey['50'] : '#37424D',
    fill: 'currentcolor',
  }

  const logoUdeMStyles = useMemo(()=>({
    width: 'auto',
    height: '59px',
    // fill: lvl < 2 ? theme.palette.grey['50'] : '#37424D',
    fill: 'currentcolor',
    ...(!trigger && {'--logo-u-fill': 'currentcolor'}),
    // '--logo-u-fill': trigger ? 'red' : 'blue',
  }), [lvl, trigger])

  useEffect(() => {
    if (lvl < 2){
    setColor(trigger ? theme.palette.grey['50'] : 'inherit')
    } else {
    setColor('inherit')
    }
  }, [lvl, trigger, theme])

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        // color,
      }}
    >
      {lvl < 2 ? (
        <LogoUdeM_
          style={{
            ...logoUdeMStyles,
          }}
        />
      ) : (
        <LogoUdeM
          style={{
            ...logoUdeMBaseStyles,
          }}
        />
      )}
      <Divider
        orientation="vertical"
        flexItem
        aria-hidden="true"
        sx={{
          borderColor: lvl < 2 ? 'currentcolor' : theme.palette.grey['600'],
          margin: '12px',
        }}
      />
      <Box
        sx={{
          color: lvl < 2 ? 'inherit' : 'primary.main',
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