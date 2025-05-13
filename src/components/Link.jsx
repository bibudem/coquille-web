import { forwardRef } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as MuiLink } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowRight } from '@phosphor-icons/react'
import { isInternalLink } from '../utils/link.js'

const linkStyles = {
  color: 'bleuPrincipal.main',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}

const iconStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.375em',
}

const A = styled('a')({})

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = forwardRef(function Link(props, ref) {
  const { children, sx, Icon, iconProps, to, ...rest } = props

  const isInternal = isInternalLink(to)
  const styles = Icon ? { ...linkStyles, ...iconStyles } : { ...linkStyles }
  const _iconProps = { size: '1.125rem', color: 'currentColor', ...iconProps }

  const icon = Icon && typeof Icon === 'boolean' ? <ArrowRight {..._iconProps} /> : <Icon {..._iconProps} />

  // Use Gatsby Link for internal links, and <a> for others
  // console.log('isInternal:', isInternal)
  if (!isInternal) {
    return (
      <A ref={ref} href={to} sx={{ ...styles, ...sx }} {...rest}>
        {children}
        {Icon && icon}
      </A>
    )
  }

  return (
    <MuiLink ref={ref} component={GatsbyLink} to={to} sx={{ ...styles, ...sx }} {...rest}>
      {children}
      {Icon && icon}
    </MuiLink>
  )
})

Link.muiName = MuiLink.muiName

export default Link
