import { Link as GatsbyLink } from 'gatsby'
import { Link as MuiLink } from '@mui/material'

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
export default function Link({ children, to, activeClassName, partiallyActive, ...other }) {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <MuiLink component={GatsbyLink} to={to} activeClassName={activeClassName} partiallyActive={partiallyActive} {...other}>
        {children}
      </MuiLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}
