import { Divider, Link, styled } from '@mui/material'
import { CaretRight } from '@phosphor-icons/react'
import NavList from './NavList.jsx'
import { useEffect, useState } from 'react'

const LINK_STYLES_BASE = {
  color: '#222930',
  fontFamily: 'Figtree',
  fontSize: 16,
  lineHeight: 1.6,
  '&.active, &:hover': {
    color: 'var(--bib-palette-bleuPrincipal-main)',
  },
}

const LVL_0_LINK_STYLES = {
  ...LINK_STYLES_BASE,
  fontWeight: 600,
  letterSpacing: '.32px',
}

const LVL_REST_LINK_STYLES = {
  ...LINK_STYLES_BASE,
  fontWeight: 400,
}

const StyledLi = styled('li')(({ theme }) => ({
  margin: 0,
  padding: 0,
}))

export default function NavItem({ item, currentLocation, lvl = 0, ...props }) {
  console.log('item:', item)
  const { title, route, isActive = false, children = false } = item
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
        href={route}
        sx={{
          display: 'flex',
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          paddingLeft: '0.5rem',
          justifyContent: 'space-between',
          ...linkStyles,
          ...(isActive && { color: 'var(--bib-palette-bleuPrincipal-main)' }),
        }}
        {...props}
      >
        {title}
        {children && (
          <CaretRight
            size="1.5rem"
            color={isActive ? 'var(--bib-palette-bleuPrincipal-main)' : 'inherit'}
            style={{
              flexShrink: 1,
              flexGrow: 0,
              ...(isActive && { transform: 'rotate(90deg)' }),
              '&:hover': {
                color: 'var(--bib-palette-bleuPrincipal-main)',
              },
            }}
          />
        )}
      </Link>
      {children && (
        <NavList>
          {children.map((item) => (
            <NavItem key={item.route} item={item} currentLocation={currentLocation} lvl={lvl + 1} />
          ))}
        </NavList>
      )}
    </StyledLi>
  )
}
