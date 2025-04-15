import { Button as MuiButton } from '@mui/material'
import { Link as GatsbyLink } from 'gatsby'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import isInternalLink from '../utils/internLink'

const config = {
  primary: {
    color: 'bleuFonce',
    variant: 'contained',
    disableElevation: true,
  },
  secondary: {
    color: 'bleuPrincipal',
    variant: 'text',
  },
}

const commonIconProps = {
  size: 24,
}

/**
 * Button component that renders a Material-UI Button with additional props and logic.
 *
 * Besides the props of the Material-UI Button component, this component also supports the following props:
 *
 * @param {Object} props - The properties object.
 * @param {boolean} [props.primary] - If true, applies primary styling to the button.
 * @param {boolean} [props.secondary] - If true, applies secondary styling to the button.
 *
 * @throws {Error} Throws an error if both primary and secondary props are provided.
 *
 * @returns {JSX.Element} The rendered Material-UI Button component.
 */
export default function Button({ primary, secondary, href, ...props }) {
  const { children, color, endIcon, disableElevation, disableEndIcon, sx, variant, ...rest } = props

  if (primary && secondary) {
    throw new Error('The primary and secondary props are mutually exclusive.')
  }

  if (primary === undefined && secondary === undefined) {
    primary = true
  }

  const buttonProps = {
    color: color || config[primary ? 'primary' : 'secondary'].color,
    variant: variant || (primary || secondary ? config[primary ? 'primary' : 'secondary'].variant : 'text'),
    disableElevation: disableElevation || (primary ? config.primary.disableElevation : false),
    ...rest,
  }
  // console.log('@@@@@@@@@@@@@', href, children)
  if (typeof href === 'string') {
    buttonProps.href = href
    const linkIsInternal = isInternalLink(href)
    // console.log('linkIsInternal:', linkIsInternal, ' - ', href)

    if (!disableEndIcon) {
      buttonProps.endIcon = endIcon ?? (linkIsInternal ? <ArrowRight {...commonIconProps} /> : <ArrowUpRight {...commonIconProps} />)
    }

    if (!linkIsInternal) {
      buttonProps.rel = 'noopener'
    }

    if (linkIsInternal) {
      buttonProps.component = GatsbyLink
    }
  }

  return (
    <MuiButton
      children={children}
      sx={{
        ...sx,
      }}
      {...buttonProps}
    />
  )
}
