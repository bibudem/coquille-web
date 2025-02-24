import { useEffect, useState } from 'react'
import { Box, Divider, styled } from '@mui/material'
import { graphql, useStaticQuery } from 'gatsby'
import NavList from './NavList'
import NavItem from './NavItem'
import { recursiveMenu } from '../../../plugins/gatsby-plugin-bib-secondary-nav/utils/recursiveMenu.js'
import fetchNavigation from './fetchNavigation.js'

const Div = styled('div')({})

const secondaryNavSampleData = {
  title: 'Obtenir un document',
  pathname: '/obtenir/',
  children: [
    {
      title: 'Prêt, renouvellement, retour',
      pathname: '/obtenir/pret-renouvellement-retour/',
      isActive: true,
      children: [
        {
          title: 'Communauté UdeM',
          pathname: '/obtenir/pret-renouvellement-retour/communaute-udem/',
          isActive: true,
          children: [
            {
              title: 'Carte PBUQ',
              pathname: '/obtenir/pret-renouvellement-retour/communaute-udem/carte-pbuq',
              isActive: true,
            },
            {
              title: 'Ententes avec les cégeps',
              pathname: '/obtenir/pret-renouvellement-retour/communaute-udem/ententes-cegeps',
            },
          ],
        },
      ],
    },
    {
      title: 'Nos collections',
      pathname: '/obtenir/collections/',
    },
    {
      title: 'Mission, vision, valeurs et objectifs',
      pathname: '/obtenir/mission-vision-valeurs',
    },
    ,
    {
      title: 'Rapports annuels',
      pathname: '/obtenir/rapports annuels',
    },
    ,
    {
      title: 'Politiques et reglement',
      pathname: '/obtenir/politiques-reglement',
    },
    ,
    {
      title: 'Carrière',
      pathname: '/obtenir/carriere',
    },
  ],
}

export function SecondaryNav({ navData = secondaryNavSampleData, data = {}, currentLocation, children, navigationOrder = false, ...rest }) {
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
    <Box {...rest}>
      <header role="banner">
        <Div
          sx={{
            fontFamily: 'Lora',
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: 1.2,
            color: '#222930', // neutre/700
          }}
        >
          {navData.title}
        </Div>
      </header>
      <Divider />
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
