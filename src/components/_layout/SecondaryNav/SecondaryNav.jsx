import { useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { graphql, useStaticQuery } from 'gatsby'
import NavList from './NavList.jsx'
import NavItem from './NavItem.jsx'
import fetchNavigation from './fetchNavigation.js'
import secondaryNavSampleData from './secondaryNavSampleData.js'
import secondaryNavData from '../../../../public/site-navigation.json'

export function SecondaryNav({ navData = secondaryNavSampleData, currentLocation, navigationOrder = false, ...rest }) {
  const { sx, children, ...props } = rest
  const [data, setData] = useState(null)

  useEffect(() => {
    if (secondaryNavData && currentLocation) {
      console.log('----------------- currentLocation:', currentLocation)
      const rootPath = `/${currentLocation.pathname
        .split('/')
        .filter((_) => _)
        .shift()}/`
      const rootNode = secondaryNavData.find(({ path }) => path === rootPath)
      console.log('rootPath:', rootPath)
      console.log('rootNode:', rootNode)
      setData(rootNode)
    }
  }, [secondaryNavData, currentLocation])

  // useEffect(() => {
  //   fetchNavigation().then((data) => {
  //     setNavigationTree(data)
  //   })
  // }, [])

  // ------------------------------------------------------------
  //
  //
  //

  function sortOrder(array) {
    if (navigationOrder) {
      return array.sort((a, b) => {
        return navigationOrder.indexOf(a.navTitle) - navigationOrder.indexOf(b.navTitle)
      })
    }

    return array.reduce((routes, route) => {
      if (route.slug === '/') {
        return [route, ...routes]
      }

      return [...routes, route]
    }, [])
  }

  // ------------------------------------------------------------

  return (
    <Box
      {...props}
      sx={{
        paddingTop: '28px',
        ...sx,
      }}
    >
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
      <nav>
        <NavList isRoot={true}>
          {data.children.map((item, i) => (
            <NavItem key={i} item={item} currentLocation={currentLocation}></NavItem>
          ))}
        </NavList>
      </nav>
    </Box>
  )
}
