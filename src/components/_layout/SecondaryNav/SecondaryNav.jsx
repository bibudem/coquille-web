import { useEffect, useState } from 'react'
import { Box, Divider, styled } from '@mui/material'
import { graphql, useStaticQuery } from 'gatsby'
import NavList from './NavList.jsx'
import NavItem from './NavItem.jsx'
import fetchNavigation from './fetchNavigation.js'
import secondaryNavSampleData from './secondaryNavSampleData.js'

const Div = styled('div')({})

export function SecondaryNav({ navData = secondaryNavSampleData, currentLocation, navigationOrder = false, ...rest }) {
  const { sx, children, ...props } = rest
  const [navigationTree, setNavigationTree] = useState(null)

  const data = useStaticQuery(graphql`
    query NavQuery {
      allSiteNavigation(filter: { hidden: { eq: false } }) {
        nodes {
          id
          title
          path
          hidden
          isRoot
          title
          order
          childrenSiteNavigation {
            id
            path
            hidden
            isRoot
            order
          }
        }
      }
    }
  `)

  const recursiveMenu = [...data.allSiteNavigation.nodes]

  console.log('recursiveMenu:', recursiveMenu)

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
