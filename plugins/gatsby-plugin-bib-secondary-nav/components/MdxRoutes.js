import { createElement, Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { recursiveMenu } from '../utils/recursiveMenu.js'

export const MdxRoutes = ({
  children,
  navigationOrder
}) => {
  // the filter is to project the query against other mdx queries in the host site
  // by filter out anything that's not in pages we safe guard the routes which
  // are only supposed to be sourced from `pages`
  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { internal: {contentFilePath: { regex: "//content//" }}}) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              navigationLabel
            }
          }
        }
      }
    }
  `)
  const {
    edges
  } = data.allMdx

  const sortOrder = array => {
    if (navigationOrder) {
      return array.sort((a, b) => {
        return navigationOrder.indexOf(a.navigationLabel) - navigationOrder.indexOf(b.navigationLabel)
      })
    }

    return array.reduce((routes, route) => {
      if (route.slug === "/") {
        return [route, ...routes]
      }

      return [...routes, route]
    }, [])
  }

  const mdxData = edges.map(data => {
    const {
      frontmatter,
      fields
    } = data.node
    return {
      navigationLabel: frontmatter.navigationLabel ?? frontmatter.title,
      slug: fields.slug
    }
  })

  const routes = sortOrder(mdxData)
  const menus = sortOrder(recursiveMenu(mdxData))

  console.log('routes:', routes)
  console.log('menus:', menus)

  return createElement(Fragment, null, children(routes, menus))
}
