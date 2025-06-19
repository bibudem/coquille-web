import { useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import NavList from './NavList'
import NavItem from './NavItem'
import secondaryNavData from '../../../../public/site-navigation.json'

export function SecondaryNav({ currentLocation, ...rest }) {
  const { sx, children, ...props } = rest
  const [data, setData] = useState(null)

  useEffect(() => {
    function markActive(node) {
      node.isTest = true
      if (node.children) {
        const activeChild = node.children.find((node) => currentLocation.pathname.startsWith(node.path))
        if (activeChild) {
          activeChild.isActive = true
          markActive(activeChild)
        }
      }
    }

    if (secondaryNavData && currentLocation) {
      const rootPath = `/${currentLocation.pathname
        .split('/')
        .filter((_) => _) // Quick way to get rid of falsy items in the array
        .shift()}/`
      const rootNode = secondaryNavData.find(({ path }) => path === rootPath)

      markActive(rootNode)
      setData(rootNode)
    }
  }, [secondaryNavData, currentLocation])

  return (
    data && (
      <Box
        {...props}
        sx={{
          paddingTop: '28px',
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
