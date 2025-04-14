import { forwardRef } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as MuiLink } from '@mui/material'
import { unstable_styleFunctionSx } from '@mui/system'
import styled from '@emotion/styled'
import { ArrowRight } from '@phosphor-icons/react'

const iconStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.375em',
}

const StyledA = styled('a')(unstable_styleFunctionSx)

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
// export default function Link({ children, to, ...rest }) {
const Link = forwardRef(function Link(props, ref) {
  const { children, sx, Icon, iconProps, to, ...rest } = props
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const isInternal = /^\//.test(to)
  const styles = Icon ? { ...iconStyles } : {}
  const _iconProps = { size: '1.125rem', color: 'currentColor', ...iconProps }

  const icon = Icon && typeof Icon === 'boolean' ? <ArrowRight {..._iconProps} /> : <Icon {..._iconProps} />

  // Use Gatsby Link for internal links, and <a> for others
  if (!isInternal) {
    return (
      <StyledA ref={ref} href={to} sx={{ ...styles, ...sx }} {...rest}>
        {children}
        {Icon && icon}
      </StyledA>
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
