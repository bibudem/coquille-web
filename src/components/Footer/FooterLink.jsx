// import styled from '@emotion/styled'
// import { Link as GatsbyLink } from 'gatsby'
// import { unstable_styleFunctionSx } from '@mui/system'

import Link from '../Link.jsx'

// const FooterLink = styled(GatsbyLink)(unstable_styleFunctionSx)

// export default function Link({ children, ...props }) {
//   return <FooterLink {...props} children={children} sx={{ textDecoration: 'none', color: 'inherit' }} />
// }

export default function FooterLink({ children, sx, ...props }) {
  return (
    <Link
      {...props}
      children={children}
      sx={{
        ...sx,
        textDecoration: 'none',
        color: 'inherit',
      }}
    />
  )
}
