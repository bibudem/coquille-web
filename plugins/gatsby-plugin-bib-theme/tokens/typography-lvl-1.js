const fontStack = '"Figtree", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
const loraStack = '"Lora", Georgia, serif'

// Propriétés communes à toutes les variantes typographiques
const baseTypography = {
  fontFeatureSettings: "'liga' off, 'clig' off",
  fontVariantNumeric: 'lining-nums tabular-nums',
  fontStyle: 'normal',
  margin: 0 // Ajout pour éviter les marges par défaut indésirables
}

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
h1: {
  ...baseTypography,
  fontFamily: fontStack,
  margin: '0.5em 0',
  fontWeight: 600,             // semibold
  fontSize: '3.125rem',        // desktop (56px)
  lineHeight: 1.2,
  '@media (max-width:899px)': {
    fontSize: '3rem',          // tablette (~48px)
  },
  '@media (max-width:599px)': {
    fontSize: '2.25rem',       // mobile (~36px)
  },
},
h2: {
  ...baseTypography,
  fontFamily: loraStack,
  margin: '0.5em 0',
  fontWeight: 600,             // medium
  fontSize: '2.125rem',        // desktop (34px)
  lineHeight: 1.2,
  '@media (max-width:899px)': {
    fontSize: '1.65rem',       // tablette (~28px)
    fontWeight: 600,           // semi-bold sur tablette
  },
  '@media (max-width:599px)': {
    fontSize: '1.6rem',       // mobile (~25.6px)
  },
},
h3: {
  ...baseTypography,
  fontFamily: fontStack,
  margin: '0.5em 0',
  fontWeight: 500,             // medium
  fontSize: '1.65rem',         // desktop (28px)
  lineHeight: 1.2,
  '@media (max-width:899px)': {
    fontSize: '1.56rem',       // tablette (~25px)
    lineHeight: 1.3,
  },
  '@media (max-width:599px)': {
    fontSize: '1.56rem',       // mobile même que tablette
  },
},
h4: {
  ...baseTypography,
  fontFamily: fontStack,
  margin: '0.5em 0',
  fontWeight: 500,             // medium
  fontSize: '1.31rem',         // desktop (21px)
  lineHeight: 1.2,
  '@media (max-width:899px)': {
    fontSize: '1.16rem',       // tablette (~18.5px)
  },
  '@media (max-width:599px)': {
    fontSize: '1.16rem',       // mobile même que tablette
  },
},
h5: {
  ...baseTypography,
  fontFamily: fontStack,
  margin: '0.5em 0',
  fontWeight: 500,
  fontSize: '1.19rem',         // desktop (19px)
  lineHeight: 1.2,
  '@media (max-width:899px)': {
    fontSize: '1.06rem',       // tablette (~17px)
  },
  '@media (max-width:599px)': {
    fontSize: '1.06rem',       // mobile même que tablette
  },
},
h6: {
  ...baseTypography,
  fontFamily: fontStack,
  margin: '0.5em 0',
  fontWeight: 500,
  fontSize: '1rem',            // desktop (16px)
  lineHeight: 1.2,
  '@media (max-width:899px)': {
    fontSize: '0.94rem',       // tablette (~15px)
  },
  '@media (max-width:599px)': {
    fontSize: '0.94rem',       // mobile même que tablette
  },
},



h2Carousel: {
  ...baseTypography,
  fontFamily: fontStack,
  margin: '0.5em 0',
  fontSize: '3.125rem!important', // 61px - desktop par défaut
  fontWeight: '500!important',
  lineHeight: 1.2,

  '@media (max-width:899.95px)': {
    fontSize: '3rem!important', // 48px - tablette
  },
  '@media (max-width:599.95px)': {
    fontSize: '2.5rem!important', // 40px - mobile
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
      fontSize: '6.5rem', // 110px desktop
    }
  },

  display2: {
    ...baseTypography,
    fontFamily: fontStack,
    fontSize: '2rem!important', // 32px mobile
    lineHeight: 1.2,
    '@media (min-width:600px)': {
      fontSize: '3rem!important', // 48px tablette
    },
    '@media (min-width:900px)': {
      fontSize: '3.5rem!important', // 61px desktop
    }
  },

  display3: {
    ...baseTypography,
    fontSize: '1.65rem', // 28px mobile
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
}

export default typography