export default {
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536
		}
	},
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
				},
				background: {
					default: '#f8fafb',
					paper: '#f8fafb'
				},
			}
		}
	},
	components: {
		MuiCssBaseline: {
			/*
			 * Viewport Width Range: 375px - 1536px
			 * Font Size Range: 15px - 20px
			 * Line Height Range: 1.6 - 1.4
			 * 
			 * font-size: clamp(0.938rem, 0.431vw + 0.837rem, 1.25rem);
			 * line-height: clamp(1.5rem, 0.345vw + 1.419rem, 1.75rem);
			 * 
			 * @see https://fluidtypography.com/#app-get-started
			*/
			styleOverrides: (theme) => `
				:root {
					--bib-comp-retroaction-usager-size: ${theme.typography.body2.fontSize};
				}
				${theme.breakpoints.down('md')} {
					:root {
						font-size: 19px;
					}
				}
			`
		},
		MuiLink: {
			defaultProps: {
				underline: 'hover',
			},
		},
		MuiStack: {
			defaultProps: {
				useFlexGap: true,
			},
		},
		BibFooter: {
			styleOverrides: {
				udem: ({ theme }) => ({
				})
			}
		}
	},
	shape: {
		corner: {
			full: '9999px',
			large: '24px',
			medium: '16px',
			small: '12px',
			'extra-small': '8px',
			'extra-extra-small': '4px',
			none: '0',
		}
	},
	typography: {
		fontFamily: 'Figtree',
		fontSize: 16,
		h1: {
			fontSize: '3.2rem',
			fontWeight: 600,
		},
		h2: {
			fontSize: '2.4rem',
			fontWeight: 500,
			fontFamily: 'Lora',
		},
		h3: {
			fontSize: '1.8667rem',
			fontWeight: 500,
		},
		h4: {
			fontSize: '1.4667rem',
			fontWeight: 500,
		},
		h5: {
			fontSize: '1.2667rem',
			fontWeight: 500,
		},
		h6: {
			fontSize: '1.0667rem',
			fontWeight: 500,
		},
		// body1: {
		// 	fontSize: '1.4667rem',
		// }
	},
}