import { useEffect, useState } from 'react'
import { Collapse, Link, styled } from '@mui/material'
import { CaretRight } from '@phosphor-icons/react'
import NavList from './NavList'

const StyledLi = styled('li')({
  margin: 0,
  padding: 0,
})

export default function NavItem({ item, currentLocation, lvl = 0, ...props }) {
  const { title, path, isActive = false, children = false } = item

  const [linkStyles, setLinkStyles] = useState({})

  const LINK_STYLES_BASE = {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',
    color: '#222930',
    fontFamily: 'Figtree',
    '&.active, &:hover': {
      color: 'var(--bib-palette-bleuPrincipal-main)',
    },
  }

  const LVL_0_LINK_STYLES = {
    ...LINK_STYLES_BASE,
    fontSize: 18,
    fontWeight: 600,
    paddingTop: '8px',
    paddingBottom: '8px',
    lineHeight: 1.7,
    borderTop: `1px solid #c3ccd5`,
  }

  const LVL_REST_LINK_STYLES = {
    ...LINK_STYLES_BASE,
    fontSize: 16,
    fontWeight: 400,
    paddingTop: '4px',
    paddingBottom: '4px',
    lineHeight: 1.6,
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
        href={path}
        className={`bib-nav2-item-link lvl-${lvl} ${isActive && 'is-active'}`}
        sx={{
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
                fill: 'var(--bib-palette-bleuPrincipal-main)',
              },
            }}
          />
        )}
      </Link>
      {children && (
        <NavList sx={{ paddingBottom: '8px' }}>
          {children.map((item) => (
            <NavItem key={item.path} item={item} currentLocation={currentLocation} lvl={lvl + 1} />
          ))}
        </NavList>
      )}
    </StyledLi>
  )
}
