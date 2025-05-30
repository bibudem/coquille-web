const fontStack = '"Figtree", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';
const loraStack = '"Lora", Georgia, serif';

// Propriétés communes à toutes les variantes typographiques
const baseTypography = {
  fontFeatureSettings: "'liga' off, 'clig' off",
  fontVariantNumeric: 'lining-nums tabular-nums',
  fontStyle: 'normal',
  margin: 0 // Ajout pour éviter les marges par défaut indésirables
};

const typography = {
  fontFamily: fontStack,
  fontSize: 16, // Taille de base (1rem = 16px)
  htmlFontSize: 16, // Base pour les calculs rem
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

   // Variantes de texte standard (requises par MUI)
  body1: {
    ...baseTypography,
    fontSize: '1rem', // 16px
    fontWeight: 400,
    lineHeight: 1.5
  },

  body2: {
    ...baseTypography,
    fontSize: '0.875rem', // 14px
    fontWeight: 400,
    lineHeight: 1.5
  },
  // Hiérarchie des titres
   // Hiérarchie des titres (h1-h6)
  h1: {
    ...baseTypography,
    margin: '0.5em 0',
    fontSize: '2.25rem', // 36px mobile
    fontWeight: '600',
    lineHeight: 1.1,
    '@media (min-width:600px)': {
      fontSize: '2.5rem', // 40px tablette
    },
    '@media (min-width:900px)': {
      fontSize: '3rem', // 48px desktop
    }
  },

  h2: {
    ...baseTypography,
    fontSize: '1.75rem', // 28px mobile
    fontWeight: '600!important',
    lineHeight: 1.1,
    '@media (min-width:600px)': {
      fontSize: '2rem', // 32px tablette
    },
    '@media (min-width:900px)': {
      fontSize: '2.125rem', // 34px desktop
    }
  },

  h3: {
    ...baseTypography,
    fontSize: '1.5rem', // 24px mobile
    fontWeight: '600!important',
    lineHeight: 1.2,
    '@media (min-width:600px)': {
      fontSize: '1.75rem', // 28px
    },
    '@media (min-width:900px)': {
      fontSize: '2rem', // 32px
    }
  },

  h4: {
    ...baseTypography,
    fontFamily: loraStack,
    fontSize: '1.25rem', // 20px mobile
    fontWeight: '500',
    lineHeight: 1.2,
    '@media (min-width:600px)': {
      fontSize: '1.375rem', // 22px
    },
    '@media (min-width:900px)': {
      fontSize: '1.5rem', // 24px
    }
  },

  h5: {
    ...baseTypography,
    fontSize: '1.125rem', // 18px mobile
    fontWeight: '700',
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '1.25rem', // 20px
    }
  },

  h6: {
    ...baseTypography,
    fontSize: '1rem', // 16px mobile
    fontWeight: '400',
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '1.125rem', // 18px
    }
  },

  subtitle1: {
    ...baseTypography,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5
  },

  subtitle2: {
    ...baseTypography,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5
  },

  button: {
    ...baseTypography,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textTransform: 'none' // Désactive la capitalization automatique
  },

  caption: {
    ...baseTypography,
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5
  },

  overline: {
    ...baseTypography,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textTransform: 'uppercase'
  },

  // Variante personnalisée
  carteProfilLink: {
    ...baseTypography,
    fontSize: '1rem', // 16px
    fontWeight: 400,
    color: '#0057AC',
    textDecoration: 'underline solid',
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 10px 10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer'
  },

  // Styles display personnalisés
  display1: {
    ...baseTypography,
    fontSize: '2.5rem', // 40px mobile
    fontWeight: 600,
    lineHeight: 1,
    '@media (min-width:600px)': {
      fontSize: '4rem', // 64px tablette
    },
    '@media (min-width:900px)': {
      fontSize: '6.875rem', // 110px desktop
    }
  },

  display2: {
    ...baseTypography,
    fontSize: '2rem', // 32px mobile
    lineHeight: 1.2,
    '@media (min-width:600px)': {
      fontSize: '3rem', // 48px tablette
    },
    '@media (min-width:900px)': {
      fontSize: '3.8125rem', // 61px desktop
    }
  },

  display3: {
    ...baseTypography,
    fontSize: '1.75rem', // 28px mobile
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '2.125rem', // 34px desktop
    }
  },

  display4: {
    ...baseTypography,
    fontSize: '1.5rem', // 24px mobile
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '1.625rem', // 26px desktop
    }
  },

  display5: {
    ...baseTypography,
    fontSize: '1.375rem', // 22px mobile
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '1.5rem', // 24px desktop
    }
  }
};

export default typography;