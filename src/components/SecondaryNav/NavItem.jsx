import { Link, styled } from '@mui/material'
import { CaretRight } from '@phosphor-icons/react'
import NavList from './NavList.jsx'
import { useEffect, useState } from 'react'

const LVL_0_LINK_STYLES = {
  color: '#222930',
  fontFamily: 'Figtree',
  fontSize: '1.1875rem',
  fontWeight: 600,
  lineHeight: '150%',
  letterSpacing: '0.01188rem',
}

const LVL_REST_LINK_STYLES = {}

const StyledLi = styled('li')(({ theme }) => ({
  margin: 0,
  padding: 0,
  '&.active': {
    color: theme.palette.primary.main,
  },
}))

export default function NavItem({ item, currentLocation, lvl = 0, ...props }) {
  console.log('item:', item)
  const { title, pathname, isActive = false, children } = item
  // const isActive = currentLocation.pathname === pathname

  const [linkStyles, setLinkStyles] = useState({})

  useEffect(() => {
    if (lvl > 0) {
      setLinkStyles({
        ...LVL_REST_LINK_STYLES,
      })
    } else {
      setLinkStyles({
        ...LVL_0_LINK_STYLES,
      })
    }
  }, [lvl])

  const rootLvlStyles = {}

  if (lvl === 0) {
    rootLvlStyles.paddingLeft = '0.5rem'
  }

  return (
    <StyledLi className={`bib-nav2-item ${isActive ? 'active' : ''}`}>
      <Link
        col
        href={pathname}
        sx={{
          display: 'flex',
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          paddingLeft: '0.5rem',
          ...linkStyles,
        }}
        {...props}
      >
        {title}
        {isActive && <CaretRight size="1.5rem" color="var(--bib-palette-bleuPrincipal-main)" />}
      </Link>
      {children && (
        <NavList>
          {children.map((item) => (
            <NavItem key={item.pathname} item={item} currentLocation={currentLocation} lvl={lvl + 1} />
          ))}
        </NavList>
      )}
    </StyledLi>
  )
}
