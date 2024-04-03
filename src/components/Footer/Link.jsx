import styled from '@emotion/styled'
import { Link as GatsbyLink } from 'gatsby'
import { unstable_styleFunctionSx } from '@mui/system'

const FooterLink = styled(GatsbyLink)(unstable_styleFunctionSx)

export default function Link({ children, ...props }) {
  return <FooterLink {...props} children={children} sx={{ textDecoration: 'none', color: 'inherit' }} />
}
