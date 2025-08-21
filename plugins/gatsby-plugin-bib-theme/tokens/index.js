import { extendTheme, responsiveFontSizes } from '@mui/material/styles'
import tokens from './tokens.js'
import typography from './typography-bib.js'

export const themeLvl1 = extendTheme({
  ...tokens,
  typography: {
    ...typography
  }
})