import { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, extendTheme, responsiveFontSizes } from '@mui/material/styles'
// import tokens from './tokens'

// export const theme = responsiveFontSizes(extendTheme(tokens))
// export const theme = extendTheme(tokens)

import { themeLvl1, themeLvln } from './tokens'
import GlobalStyles from './global-styles/GlobalStyles'

export function BibThemeLvl1({ darkMode, children, ...props }) {
	// take away SSR rendered mode;
	useEffect(() => {
		document.body.className = ''
	}, [])
	return (
		<ThemeProvider theme={themeLvl1} {...props}>
			<CssBaseline enableColorScheme />
			<GlobalStyles />
			{children}
		</ThemeProvider>
	)
}

export function BibThemeLvln({ darkMode, children, ...props }) {
	// take away SSR rendered mode;
	useEffect(() => {
		document.body.className = ''
	}, [])
	return (
		<ThemeProvider theme={themeLvln} {...props}>
			<CssBaseline enableColorScheme />
			<GlobalStyles />
			{children}
		</ThemeProvider>
	)
}
