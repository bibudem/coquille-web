import { Button as MuiButton } from '@mui/material'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import isInternalLink from '../../utils/internLink.js'

const config = {
  primary: {
    color: 'bleuFonce.main',
    variant: 'contained',
    disableElevation: true,
  },
  secondary: {
    color: 'bleuFonce.main',
    variant: 'outlined',
  },
}

const commonIconProps = {
  size: 24,
}

export default function Button({ children, sx, primary, secondary, color, variant, disableElevation, disableEndIcon, endIcon, href, ...rest }) {
  if (primary && secondary) {
    throw new Error('The primary and secondary props are mutually exclusive.')
  }

  const props = {
    color: color || config[primary ? 'primary' : 'secondary'].color,
    variant: variant || (primary || secondary ? config[primary ? 'primary' : 'secondary'].variant : 'text'),
    disableElevation: disableElevation || (primary ? config.primary.disableElevation : false),
    disableEndIcon: typeof disableEndIcon === 'undefined' ? disableEndIcon : true,
    ...rest,
  }

  if (typeof href === 'string') {
    if (!!!disableEndIcon) {
      const linkIsInternal = isInternalLink(href)
      console.log('linkIsInternal:', linkIsInternal)
      props.endIcon = endIcon ?? (linkIsInternal ? <ArrowRight {...commonIconProps} /> : <ArrowUpRight {...commonIconProps} />)
    }
    // props.href = href
    // props.rel = 'noopener'
  }

  console.log('props:', props)

  return (
    <MuiButton
      children={children}
      sx={{
        ...sx,
      }}
      {...props}
    />
  )
}
