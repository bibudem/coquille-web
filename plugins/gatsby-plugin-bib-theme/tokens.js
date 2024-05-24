export default {
	cssVarPrefix: 'bib',
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#0057AC'
				},
				udemBleuFonce: {
					main: '#0B113A',
					light: 'rgb(59, 64, 97)',
					dark: 'rgb(7, 11, 40)',
					contrastText: '#fff'
				},
				udemBleuPrincipal: {
					main: "#0057ac",
					light: "rgb(51, 120, 188)",
					dark: "rgb(0, 60, 120)",
					contrastText: "#fff"
				}
			}
		}
	},
	typography: {
		fontFamily: 'Figtree',
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
		MuiLink: {
			defaultProps: {
				underline: 'hover',
			},
		},
		BibFooter: {
			styleOverrides: {
				udem: ({ theme }) => ({
				})
			}
		}
	},
}