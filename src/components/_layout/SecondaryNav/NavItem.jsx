import { useEffect, useState } from 'react'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight'
import NavList from './NavList'

const StyledLi = styled('li')({
  margin: 0,
  padding: 0,
})

export default function NavItem({ item, currentLocation, lvl = 0, ...props }) {
  const { title, path, children = false } = item
  // Dérivé de l'URL courante à chaque rendu plutôt que lu depuis `item.isActive` :
  // ce champ était auparavant écrit une fois pour toutes par `markActive()` en
  // mutant directement les noeuds de site-navigation.json (un module importé,
  // donc un seul objet partagé et mis en cache par le navigateur). Comme
  // `markActive()` ne faisait que positionner `isActive = true` sans jamais le
  // réinitialiser, une navigation en repartait avec les marquages de la
  // précédente encore en place : l'ancienne entrée active restait surlignée en
  // plus de la nouvelle.
  const isActive = Boolean(currentLocation?.pathname?.startsWith(path))
  const [linkStyles, setLinkStyles] = useState({})

  const LINK_STYLES_BASE = {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',
    color: '#222930',
    fontFamily: '"Figtree", "Figtree Fallback", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
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
    <StyledLi className={`bib-comp-nav2-item lvl-${lvl} ${isActive ? 'is-active' : ''}`}>
      <Link
        col
        href={path}
        className={`bib-comp-nav2-item-link lvl-${lvl} ${isActive && 'is-active'}`}
        sx={{
          ...(lvl > 0 && { paddingLeft: '0.8125rem' }),
          justifyContent: 'space-between',
          ...linkStyles,
          ...(!children && { paddingRight: '1.5rem' }),
          ...(isActive && { color: 'var(--bib-palette-bleuPrincipal-main)' }),
        }}
        {...props}
      >
        {title}
        {children && (
          <CaretRightIcon
            size="24px"
            color={isActive ? 'var(--bib-palette-bleuPrincipal-main)' : 'currentColor'}
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
      {children && isActive && (
        <NavList sx={{ paddingBottom: '8px', paddingTop: '8px', marginLeft: `${lvl * 16}px` }}>
          {children.map((item) => (
            <NavItem key={item.path} item={item} currentLocation={currentLocation} lvl={lvl + 1} />
          ))}
        </NavList>
      )}
    </StyledLi>
  )
}
