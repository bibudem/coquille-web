import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { graphql, useStaticQuery } from 'gatsby'
import { recursiveMenu } from '../../../plugins/gatsby-plugin-bib-secondary-nav/utils/recursiveMenu.js'
import fetchNavigation from './fetchNavigation.js'

// import { MdxRoutes } from '../../../plugins/gatsby-plugin-bib-secondary-nav/components/MdxRoutes.js'

export function SecondaryNav({ children, navigationOrder = false, data, ...props }) {
  const [navigation, setNavigation] = useState(null)

  const pages = useStaticQuery(graphql`
    query NavQuery {
      allMdx(filter: { internal: { contentFilePath: { regex: "//content//" } } }) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              navTitle
              order
            }
          }
        }
      }
    }
  `)

  // const data = useStaticQuery(graphql`
  //   query {
  //     allMdx(filter: { internal: { contentFilePath: { regex: "//content//" } } }) {
  //       edges {
  //         node {
  //           id
  //           frontmatter {
  //             title
  //             slug
  //             navTitle
  //             order
  //           }
  //         }
  //       }
  //     }
  //     allSiteNavigation {
  //       edges {
  //         node {
  //           id
  //           order
  //           parent {
  //             id
  //             internal {
  //               contentFilePath
  //             }
  //           }
  //           title
  //           path
  //         }
  //       }
  //     }
  //   }
  // `)

  const { edges } = pages.allMdx

  useEffect(() => {
    fetchNavigation().then((data) => {
      console.log('########## nav data:', data)
      setNavigation(data)
    })
  }, [])

  // console.log('navData:', navData)
  console.log('edges:', edges)

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

  const mdxData = edges.map((data) => {
    console.log('### data:', data)
    const { frontmatter } = data.node
    return {
      navTitle: frontmatter.navTitle ?? frontmatter.title,
      slug: frontmatter.slug,
    }
  })

  const routes = sortOrder(mdxData)
  // const menus = sortOrder(recursiveMenu(mdxData))

  console.log('props:', props)
  console.log('edges:', edges)
  console.log('routes:', routes)
  // console.log('menus:', menus)

  return (
    <Box {...props} sx={{ outline: '1px solid red' }}>
      <nav>
        {/* <MdxRoutes>
          {(routes, _) => {
            console.log('routes:', routes)
            return (
              <ul>
                {routes.map((route, index) => (
                  <li key={index}>
                    <Link to={route.slug}>{route.navTitle}</Link>
                  </li>
                ))}
              </ul>
            )
          }}
        </MdxRoutes> */}
      </nav>
    </Box>
  )
}
