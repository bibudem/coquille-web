import { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, extendTheme, responsiveFontSizes } from '@mui/material/styles'
import tokens from './tokens'

export const theme = responsiveFontSizes(extendTheme(tokens))

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
