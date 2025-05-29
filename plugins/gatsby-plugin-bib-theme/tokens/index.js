import { extendTheme } from '@mui/material/styles';
import tokens from './tokens.js';
import typographyLvl1 from './typography-lvl-1.js';
import typographyLvln from './typography-lvl-n.js';

const baseConfig = {
  ...tokens,
  cssVarPrefix: 'bib'
};

export const themeLvl1 = extendTheme({
  ...baseConfig,
  typography: typographyLvl1
});

export const themeLvln = extendTheme({
  ...baseConfig,
  typography: typographyLvln
});

// Option pour les fontes responsives
// export const responsiveThemeLvl1 = responsiveFontSizes(themeLvl1);
// export const responsiveThemeLvln = responsiveFontSizes(themeLvln);