import { styled } from '@mui/material'

const StyledNavList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}))

export default function NavList({ children, ...props }) {
  return <StyledNavList {...props}>{children}</StyledNavList>
}
