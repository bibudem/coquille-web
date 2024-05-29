import { Link as GatsbyLink } from 'gatsby'
import { Link as MuiLink } from '@mui/material'
import { unstable_styleFunctionSx } from '@mui/system'
import styled from '@emotion/styled'
import { forwardRef } from 'react'

const StyledA = styled('a')(unstable_styleFunctionSx)

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
// export default function Link({ children, to, activeClassName, partiallyActive, ...other }) {
const Link = forwardRef(function Link(props, ref) {
  const { children, to, activeClassName, partiallyActive, ...other } = props
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const external = /^(?:https?:)?\/\//.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (external) {
    return (
      <StyledA ref={ref} href={to} {...other}>
        {children}
      </StyledA>
    )
  }

  return (
    <MuiLink ref={ref} component={GatsbyLink} to={to} activeClassName={activeClassName} partiallyActive={partiallyActive} {...other}>
      {children}
    </MuiLink>
  )
})

export default Link
