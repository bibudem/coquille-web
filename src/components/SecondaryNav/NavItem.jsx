import { Link, styled } from '@mui/material'

const StyledLi = styled('li')(({ theme }) => ({
  margin: 0,
  padding: 0,
  '&.active': {
    color: theme.palette.primary.main,
  },
}))

export default function NavItem({ item, currentLocation, ...props }) {
  console.log('item:', item)
  const { title, pathname } = item
  const isActive = currentLocation.pathname === pathname

  return (
    <StyledLi className={`nav-item ${isActive ? 'active' : ''}`}>
      <Link
        col
        href={pathname}
        sx={{
          display: 'flex',
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          paddingLeft: '0.5rem',
          color: isActive ? 'primary' : '#222930',
          fontFamily: 'Figtree',
          fontSize: '1.1875rem',
          fontWeight: 600,
          lineHeight: '150%',
          letterSpacing: '0.01188rem',
        }}
        {...props}
      >
        {title}
      </Link>
    </StyledLi>
  )
}
