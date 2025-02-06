import { Box } from '@mui/material'
// import { Navigation, loadNavigation } from 'gatsby-dynamical-navigation'

export function SecondaryNav({ children, ...props }) {
  // loadNavigation((navigation) => {
  //   console.log('navigation:', navigation)
  // })

  return (
    <Box {...props} sx={{ outline: '1px solid red' }}>
      {/* <Navigation
        root="/content" //vertex path of displayed navigation
        target="/toto" //bottom path of displayed navigation (usually location)
        // loader={React component} // optional. Component that will be displayed until the navigation is loaded
      /> */}
    </Box>
  )
}
