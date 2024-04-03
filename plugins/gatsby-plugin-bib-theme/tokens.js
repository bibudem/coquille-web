export default {
	cssVarPrefix: 'bib',
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#0057AC'
				}
			}
		}
	},
	typography: {
		fontFamily: 'Inter',
		// h1: {
		// 	fontFamily: mySerif
		// },
		// h2: {
		// 	fontFamily: mySerif
		// },
		// h3: {
		// 	fontFamily: mySerif
		// },
		// h4: {
		// 	fontFamily: mySerif
		// },
		// body1: {
		// 	fontFamily: mySans
		// }
	},
	shape: {
		corner: {
			'extra-large': '28px',
			'extra-small': '4px',
			full: '9999px',
			large: '16px',
			medium: '12px',
			none: '0',
			small: '8px'
		}
	},
	components: {
		Link: {
			color: 'red!important'
		},
		MuiLink: {
			defaultProps: {
				underline: 'hover',
			},
		},
	},
}