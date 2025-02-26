import { useEffect, useState } from 'react'
import { Box, Divider, styled } from '@mui/material'
import { graphql, useStaticQuery } from 'gatsby'
import NavList from './NavList'
import NavItem from './NavItem'
import { recursiveMenu } from '../../../plugins/gatsby-plugin-bib-secondary-nav/utils/recursiveMenu.js'
import fetchNavigation from './fetchNavigation.js'
import secondaryNavSampleData from './secondaryNavSampleData.js'

const Div = styled('div')({})

export function SecondaryNav({ navData = secondaryNavSampleData, data = {}, currentLocation, navigationOrder = false, ...rest }) {
  const { sx, children, ...props } = rest
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

  const navData_ = pages.allSiteNavigation.edges.map((data) => data.node)
  const currentRoute = navData_.find((route) => route.pathname === currentLocation.pathname)
  // console.log('currentRoute:', currentRoute)
  const siblings = navData_
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

  // const routes_ = recursiveMenu(navData_)

  // useEffect(() => {
  //   console.log('navigationTree:', navigationTree)
  // }, [navigationTree])

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
        <Div
          sx={{
            fontFamily: 'Lora',
            fontSize: 27,
            fontWeight: 500,
            lineHeight: 1.2,
            color: '#222930', // neutre/700
            paddingBottom: '24px',
          }}
        >
          {navData.title}
        </Div>
      </header>
      <nav>
        <NavList isRoot={true}>
          {navData.children.map((data, i) => (
            <NavItem key={i} item={data} currentLocation={currentLocation}></NavItem>
          ))}
        </NavList>
      </nav>
    </Box>
  )
}
