import { alpha, getContrastRatio } from '@mui/material/styles'

const jauneBase = '#ffca40'
const jauneMain = alpha(jauneBase, .7)

const jaunePaleBase = '#ffe8ac'
const jaunePaleMain = alpha(jaunePaleBase, .7)

const orangeBase = '#ffc0cb'
const orangeMain = alpha(orangeBase, .7)

const roseBase = '#fee1de'
const roseMain = alpha(roseBase, .7)

const rougeOrangeBase = '#f04e24'
const rougeOrangeMain = alpha(rougeOrangeBase, .7)

const vertPaleBase = '#52b782'
const vertPaleMain = alpha(vertPaleBase, .7)

const vertFonceBase = '#024244'
const vertFonceMain = alpha(vertFonceBase, .7)

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
					main: '#0057ac'
				},
				bleuFonce: {
					main: '#0b113a',
					light: 'rgb(59, 64, 97)',
					dark: 'rgb(7, 11, 40)',
					contrastText: '#fff'
				},
				bleuPrincipal: {
					main: "#0057ac",
					light: "rgb(51, 120, 188)",
					dark: "rgb(0, 60, 120)",
					contrastText: "#fff"
				},
				jaune: {
					main: jauneMain,
					light: alpha(jauneBase, .5),
					dark: alpha(jauneBase, .9),
					contrastText: getContrastRatio(jauneMain, '#fff') > 4.5 ? '#fff' : '#111'
				},
				jaunePale: {
					main: jaunePaleMain,
					light: alpha(jaunePaleBase, .5),
					dark: alpha(jaunePaleBase, .9),
					contrastText: getContrastRatio(jaunePaleMain, '#fff') > 4.5 ? '#fff' : '#111'
				},
				orange: {
					main: orangeMain,
					light: alpha(orangeBase, .5),
					dark: alpha(orangeBase, .9),
					contrastText: getContrastRatio(orangeMain, '#fff') > 4.5 ? '#fff' : '#111'
				},
				rose: {
					main: roseMain,
					light: alpha(roseBase, .5),
					dark: alpha(roseBase, .9),
					contrastText: getContrastRatio(roseMain, '#fff') > 4.5 ? '#fff' : '#111'
				},
				rougeOrange: {
					main: rougeOrangeMain,
					light: alpha(rougeOrangeBase, .5),
					dark: alpha(rougeOrangeBase, .9),
					contrastText: getContrastRatio(rougeOrangeMain, '#fff') > 4.5 ? '#fff' : '#111'
				},
				vertFonce: {
					main: vertFonceMain,
					light: alpha(vertFonceBase, .5),
					dark: alpha(vertFonceBase, .9),
					contrastText: getContrastRatio(vertFonceMain, '#fff') > 4.5 ? '#fff' : '#111'
				},
				vertPale: {
					main: vertPaleMain,
					light: alpha(vertPaleBase, .5),
					dark: alpha(vertPaleBase, .9),
					contrastText: getContrastRatio(vertPaleMain, '#fff') > 4.5 ? '#fff' : '#111'
				},
				background: {
					default: '#f8fafb',
					paper: '#f8fafb'
				},
			}
		}
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: theme.shape.corner.full,
					lineHeight: 1,
					textTransform: 'none',
					fontSize: '0.875rem',
					fontWeight: 400,
					minHeight: '3.125rem', // 50px
					variants: [
						{
							props: { variant: 'contained' },
							style: {
								color: '#fafdfe',
								boxShadow: 'none',
							}
						}
					],
					'.MuiButton-icon svg': {
						fill: 'currentColor',
					},
					// In case mdx, it can generate a <p> tag for the textual content inside the <button></button>
					'p': {
						margin: 0,
					}
				})
			}
		},
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
			`
		},
		MuiDivider: {
			defaultProps: {
				color: '#c3ccd5',
			},
			styleOverrides: {
				root: {
					margin: '1rem 0',
				}
			}
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
	spacing: 8,
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
		display1: {
			fontFamily: 'Figtree',
			fontSize: '6.6875rem',
			fontWeight: 600,
			lineHeight: '112%'
		},
		display2: {
			fontFamily: 'Figtree',
			fontSize: '6.0625rem',
			fontWeight: 500,
			lineHeight: '110%'
		},
		display3: {
			fontFamily: 'Figtree',
			fontSize: '5.4375rem',
			fontWeight: 500,
			lineHeight: '120%'
		},
		display4: {
			fontFamily: 'Figtree',
			fontSize: '4.8124rem',
			fontWeight: 400,
			lineHeight: '120%'
		}
		// body1: {
		// 	fontSize: '1.4667rem',
		// }
	},
}