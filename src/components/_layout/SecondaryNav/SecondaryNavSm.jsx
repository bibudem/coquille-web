import { useMemo } from 'react'
import { Box } from '@mui/material'
import NavList from './NavList'
import NavItem from './NavItem'
import secondaryNavData from '../../../../public/site-navigation.json'

export function SecondaryNav({ currentLocation, ...rest }) {
  const { sx, children, ...props } = rest

  // Quel élément est actif se déduit désormais à chaque rendu, dans NavItem, à
  // partir de `currentLocation` (voir NavItem.jsx) — on se contente ici de
  // retrouver la section racine correspondant à l'URL courante, sans plus
  // muter les noeuds de site-navigation.json comme le faisait l'ancien
  // `markActive()`.
  const data = useMemo(() => {
    if (!secondaryNavData || !currentLocation) return null

    const rootPath = `/${currentLocation.pathname
      .split('/')
      .filter((_) => _) // Quick way to get rid of falsy items in the array
      .shift()}/`

    // rootNode est absent pour les pages hors de content/pages (ex. une page
    // définie directement dans src/pages) : site-navigation.json n'est généré
    // qu'à partir des pages de contenu. Pas de section à afficher dans ce cas,
    // plutôt qu'un plantage.
    return secondaryNavData.find(({ path }) => path === rootPath) ?? null
  }, [currentLocation])

  return (
    data && (
      <Box
        {...props}
        sx={{
          padding: '.75em',
          ...sx,
        }}
      >
        <nav aria-label="Navigation dans cette section du site">
          <header role="banner">
            <Box
              sx={{
                fontFamily: 'Lora',
                fontSize: 27,
                fontWeight: 500,
                lineHeight: 1.2,
                color: '#222930', // neutre/700
                paddingBottom: '24px',
              }}
            >
              {data.title}
            </Box>
          </header>
          <NavList isRoot={true}>
            {data.children?.map((item, i) => (
              <NavItem key={i} item={item} currentLocation={currentLocation}></NavItem>
            ))}
          </NavList>
        </nav>
      </Box>
    )
  )
}
