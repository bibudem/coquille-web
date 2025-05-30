import { extendTheme, responsiveFontSizes } from '@mui/material/styles'
import tokens from './tokens.js'
import typographyLvl1 from './typography-lvl-1.js'
import typographyLvln from './typography-lvl-n.js'

export const themeLvl1 = extendTheme({
  ...tokens,
  typography: {
    ...typographyLvl1
  }
})

themeLvl1.typography.display1[themeLvl1.breakpoints.up('md')] = {
  fontSize: '6.6875rem',
}

export const themeLvln = extendTheme({
  ...tokens,
  typography: {
    ...typographyLvln
  }
})