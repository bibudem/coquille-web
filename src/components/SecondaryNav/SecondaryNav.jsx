import { useEffect, useState } from 'react'
import { Box, Divider } from '@mui/material'
import { graphql, useStaticQuery } from 'gatsby'
import NavList from './NavList'
import NavItem from './NavItem'
import { recursiveMenu } from '../../../plugins/gatsby-plugin-bib-secondary-nav/utils/recursiveMenu.js'
import fetchNavigation from './fetchNavigation.js'

export function SecondaryNav({ currentLocation, children, navigationOrder = false, data, ...props }) {
  const [navigationTree, setNavigationTree] = useState(null)

  const pages = useStaticQuery(graphql`
    query NavQuery {
      allSiteNavigation {
        edges {
          node {
            id
            isRoot
            order
            parentId
            pathname
            title
          }
        }
      }
    }
  `)

  useEffect(() => {
    fetchNavigation().then((data) => {
      setNavigationTree(data)
    })
  }, [])

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

  const navData = pages.allSiteNavigation.edges.map((data) => data.node)
  const currentRoute = navData.find((route) => route.pathname === currentLocation.pathname)
  // console.log('currentRoute:', currentRoute)
  const siblings = navData
    .filter((route) => {
      return route.parentId === currentRoute?.parentId
    })
    .map(({ order, ...rest }) => {
      order = order ?? 999
      return {
        order,
        ...rest,
      }
    })
    .sort((a, b) => {
      const orderA = a.order
      const orderB = b.order
      return orderA - orderB
    })

  // const menus = sortOrder(recursiveMenu(mdxData))

  // console.log('menus:', menus)

  // const routes_ = recursiveMenu(navData)

  // useEffect(() => {
  //   console.log('navigationTree:', navigationTree)
  // }, [navigationTree])

  return (
    <Box {...props}>
      <nav>
        <Divider />
        <NavList>
          {siblings.map((data) => (
            <NavItem key={data.id} item={data} currentLocation={currentLocation}></NavItem>
          ))}
        </NavList>
      </nav>
    </Box>
  )
}
