import { styled } from '@mui/material'

const StyledNavList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
})

export default function NavList({ isRoot = false, ...rest }) {
  const { children, sx = {}, ...props } = rest
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    gap: 0,
  }

  if (isRoot) {
    styles.marginLeft = 0
  }

  return (
    <StyledNavList
      role="list"
      className="bib-nav2-list"
      sx={{
        ...styles,
        ...sx,
      }}
      {...props}
    >
      {children}
    </StyledNavList>
  )
}
