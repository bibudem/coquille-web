import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import { responsiveFontSizes, experimental_extendTheme as extendTheme, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import tokens from './tokens'

const theme = responsiveFontSizes(extendTheme(tokens))

// const GlobalStyles = withStyles(theme => {
// 	const isLight = theme.palette.mode === 'light'
// 	const mainColor = isLight ? theme.palette.primary.main : theme.palette.primary.light

// 	return createStyles({
// 		'@global': {
// 			body: {
// 				transition: theme.transitions.create('background'),
// 			},
// 			main: {
// 				'& a': {
// 					color: mainColor,
// 					textDecoration: 'none',
// 					boxShadow: `inset 0px -1px 0px 0px ${mainColor}`,
// 					transition: theme.transitions.create('box-shadow'),
// 					'&:hover': {
// 						boxShadow: `inset 0px 0px 0px 0px ${mainColor}`
// 					}
// 				}
// 			},
// 			h1: {
// 				...theme.typography.h2,
// 				margin: theme.spacing(3, 0)
// 			},
// 			h2: {
// 				...theme.typography.h3,
// 				margin: theme.spacing(3, 0)
// 			},
// 			h3: {
// 				...theme.typography.h4,
// 				margin: theme.spacing(3, 0)
// 			},
// 			h4: {
// 				...theme.typography.h5,
// 				margin: theme.spacing(3, 0)
// 			},
// 			h5: {
// 				...theme.typography.h6,
// 				margin: theme.spacing(3, 0)
// 			},
// 			// don't use h6
// 			p: {
// 				...theme.typography.body1,
// 				margin: theme.spacing(3, 0),
// 				lineHeight: 1.75
// 			},
// 			li: {
// 				'& > p': {
// 					// preventing sublist margin problem
// 					margin: 0
// 				},
// 				...theme.typography.body1
// 			},
// 			img: {
// 				maxWidth: '100%'
// 			},
// 			blockquote: {
// 				position: 'relative',
// 				paddingLeft: theme.spacing(2),
// 				borderLeft: `0.2em solid ${isLight ? theme.palette.primary.light : theme.palette.primary.dark}`
// 			},
// 			// prism js inline code
// 			':not(pre) > code[class*="language-"]': {
// 				fontSize: 'inherit',
// 				// light and dark mode different highlighting
// 				transition: theme.transitions.create(['background', 'color']),
// 				background: isLight ? 'var(--nord6)' : 'var(--nord0)',
// 				color: isLight ? 'var(--nord0)' : 'var(--nord4)'
// 			},
// 			// code highlight block
// 			'.gatsby-highlight': {
// 				marginLeft: '-1em',
// 				marginRight: '-1em',
// 				overflow: 'auto',
// 				borderRadius: theme.shape.borderRadius,
// 				// this prevents iOS Safari from scaling our code with a big view port
// 				'-webkit-text-size-adjust': 'none',
// 				// smooth scrolling on phones
// 				'-webkit-overflow-scrolling': 'touch',
// 				'& > pre': {
// 					minWidth: '100%',
// 					margin: 0,
// 					width: 'max-content'
// 				}
// 			},
// 			'.gatsby-highlight-code-line': {
// 				backgroundColor: '#3b4251',
// 				display: 'block',
// 				marginRight: '-1em',
// 				marginLeft: '-1em',
// 				paddingLeft: '0.75em',
// 				borderLeft: '0.25em solid #d8dee9',
// 				minWidth: 'fit-content'
// 			},
// 			'.katex-display': {
// 				'& > .katex': {
// 					whiteSpace: 'normal'
// 				}
// 			},
// 			'.gatsby-remark-autolink-headers-a-tags': {
// 				// remove box shadow on auto linked headers
// 				boxShadow: 'none',
// 				'&> svg': {
// 					fill: theme.palette.primary.main
// 				}
// 			}
// 		}
// 	})
// })(() => null)

const ChildrenWithGlobalStyle = ({ children }) => {
	return <> <GlobalStyles /> {children} </>
}

export default function BibTheme({ darkMode, children, ...props }) {
	// take away SSR rendered mode;
	useEffect(() => {
		document.body.className = ''
	}, [])
	return (
		<CssVarsProvider theme={theme} {...props}>
			<CssBaseline enableColorScheme />
			{children}
		</CssVarsProvider>
	)
}

ChildrenWithGlobalStyle.propTypes = {
	children: PropTypes.node
}

BibTheme.propTypes = {
	darkMode: PropTypes.bool.isRequired,
	children: PropTypes.node
}
