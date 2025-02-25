import { useEffect, useState } from 'react'
import { Link, styled, useTheme } from '@mui/material'
import { CaretRight } from '@phosphor-icons/react'
import NavList from './NavList'

const StyledLi = styled('li')(({ theme }) => ({
  margin: 0,
  padding: 0,
}))

export default function NavItem({ item, currentLocation, lvl = 0, ...props }) {
  console.log('item:', item)
  const { title, route, isActive = false, children = false } = item

  const [linkStyles, setLinkStyles] = useState({})

  const LVL_0_LINK_ITEM_STYLES = {}

  const LINK_STYLES_BASE = {
    // color: '#222930',
    color: 'green',
    fontFamily: 'Figtree',
    lineHeight: 1.6,
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    '&.active, &:hover': {
      color: 'var(--bib-palette-bleuPrincipal-main)',
    },
  }

  const LVL_0_LINK_STYLES = {
    ...LINK_STYLES_BASE,
    fontSize: 18,
    fontWeight: 600,
    // borderTop: `1px solid #c3ccd5`,
    borderTop: `1px solid red`,
  }

  const LVL_REST_LINK_STYLES = {
    ...LINK_STYLES_BASE,
    fontSize: 16,
    fontWeight: 400,
  }

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

  return (
    <StyledLi className={`bib-nav2-item lvl-${lvl} ${isActive ? 'is-active' : ''}`}>
      <Link
        col
        href={route}
        className={`bib-nav2-item-link lvl-${lvl} ${isActive && 'is-active'}`}
        sx={{
          display: 'flex',
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          ...(lvl > 0 && { paddingLeft: '0.8125rem' }),
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
      {children && isActive && (
        <NavList>
          {children.map((item) => (
            <NavItem key={item.route} item={item} currentLocation={currentLocation} lvl={lvl + 1} />
          ))}
        </NavList>
      )}
    </StyledLi>
  )
}
