import { darken, lighten, getContrastRatio } from '@mui/material/styles'

//
// Liste des couleurs secondaires
//

const bleu100 = '#e5f0f8'
const bleu200 = '#cce2f3'
const bleu600 = '#00407f'
const jaune = '#ffca40'
const jaunePale = '#ffe8ac'
const orange = '#ffc0cb'
const rose300 = '#fee1de'
const rose500 = '#f4bdb7'
const rougeOrange = '#f04e24'
const vertPale = '#52b782'
const vertFonce = '#024244'

const LIGHTEN_FACTOR = .4
const DARKEN_FACTOR = .3
const CONTRAST_TEXT_THRESHOLD = 4.5
const CONTRAST_TEXT_LIGHT = '#fff'
const CONTRAST_TEXT_DARK = '#111'

function getContrastColor(color) {
	return getContrastRatio(color, '#fff') > CONTRAST_TEXT_THRESHOLD ? CONTRAST_TEXT_LIGHT : CONTRAST_TEXT_DARK
}

function getColorPalette(color) {
	return {
		main: color,
		light: lighten(color, LIGHTEN_FACTOR),
		dark: darken(color, DARKEN_FACTOR),
		contrastText: getContrastColor(color)
	}
}

export const secondaryColors = {
	bleuPrincipal: {
		main: '#0057ac',
		light: 'rgb(51, 120, 188)',
		dark: 'rgb(0, 60, 120)',
		contrastText: CONTRAST_TEXT_LIGHT
	},
	bleu100: getColorPalette(bleu100),
	bleu200: getColorPalette(bleu200),
	bleu600: getColorPalette(bleu600),
	jaune: getColorPalette(jaune),
	jaunePale: getColorPalette(jaunePale),
	orange: getColorPalette(orange),
	rose300: getColorPalette(rose300),
	rose500: getColorPalette(rose500),
	rougeOrange: getColorPalette(rougeOrange),
	vertFonce: getColorPalette(vertFonce),
	vertPale: getColorPalette(vertPale),
}

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
					main: '#0b113a'
				},
				bleuFonce: {
					main: '#0b113a',
					light: 'rgb(59, 64, 97)',
					dark: 'rgb(7, 11, 40)',
					contrastText: CONTRAST_TEXT_LIGHT
				},
				...secondaryColors,
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