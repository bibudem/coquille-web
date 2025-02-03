import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, extendTheme, responsiveFontSizes } from '@mui/material/styles'
import { theme } from '../../plugins/gatsby-plugin-bib-theme/tokens.js'

// export const theme = responsiveFontSizes(extendTheme(tokens))
// export const theme = extendTheme(tokens)

export default function BibTheme({ darkMode, children, ...props }) {
  // take away SSR rendered mode;
  useEffect(() => {
    document.body.className = ''
  }, [])
  return (
    <ThemeProvider theme={theme} {...props}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )
}

// BibTheme.propTypes = {
// 	darkMode: PropTypes.bool.isRequired,
// 	children: PropTypes.node
// }
