import { Box } from '@mui/material'
// import { MdxRoutes } from '../../../plugins/gatsby-plugin-bib-secondary-nav/components/MdxRoutes.js'

export function SecondaryNav({ children, ...props }) {
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
                    <Link to={route.slug}>{route.navigationLabel}</Link>
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
