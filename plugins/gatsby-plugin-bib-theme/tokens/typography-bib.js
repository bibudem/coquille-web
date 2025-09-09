const fontStack = '"Figtree", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
const loraStack = '"Lora", Georgia, serif'

// Propriétés communes à toutes les variantes typographiques
const baseTypography = {
  fontFeatureSettings: "'liga' off, 'clig' off",
  fontVariantNumeric: 'lining-nums tabular-nums',
  fontStyle: 'normal',
  margin: 0,
}

const typography = {
  fontFamily: fontStack,
  fontSize: 16, // Taille de base (1rem = 16px)
  htmlFontSize: 16, // Base pour les calculs rem
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,

  // Variantes de texte standard
  body1: {
    ...baseTypography,
    fontSize: '1rem', // 16px
    fontWeight: 500,
    lineHeight: 1.5
  },

  body2: {
    ...baseTypography,
    fontSize: '0.875rem', // ~12.25px
    fontWeight: 500,
    lineHeight: 1.5
  },


  // Hiérarchie des titres corrigée selon vos maquettes
  h1: {
    ...baseTypography,
    fontFamily: fontStack,
    margin: '0.5em 0',
    fontWeight: 600,
    fontSize: '6.875rem', // 110px desktop
    lineHeight: 1.1,
    '@media (max-width:899px)': {
      fontSize: '3rem', // 48px mobile
    }
  },

  h2: {
    ...baseTypography,
    fontFamily: fontStack,
    margin: '0.5em 0',
    fontWeight: 600,
    fontSize: '3.5rem', // 56px desktop
    lineHeight: 1.1,
    '@media (max-width:899px)': {
      fontSize: '2.5rem', // 40px mobile
    }
  },

  h3: {
    ...baseTypography,
    fontFamily: fontStack,
    margin: '0.5em 0',
    fontWeight: 600,
    fontSize: '2.25rem', // 36px desktop
    lineHeight: 1.2,
    '@media (max-width:899px)': {
      fontSize: '1.5rem', // 22px mobile
      fontWeight: 700,
      lineHeight: 1.2
    }
  },

  h4: {
    ...baseTypography,
    fontFamily: loraStack,
    margin: '0.5em 0',
    fontWeight: 500,
    fontSize: '1.875rem', // 30px desktop
    lineHeight: 1.2,
    '@media (max-width:899px)': {
      fontSize: '1.25rem', // 20px mobile
      lineHeight: 1.2
    }
  },

  h5: {
    ...baseTypography,
    fontFamily: fontStack,
    margin: '0.5em 0',
    fontWeight: 700,
    fontSize: '1.125rem', // 18px
    lineHeight: 1.1,
    '@media (max-width:899px)': {
      fontSize: '1.125rem', // 18px mobile (même taille)
      lineHeight: 1.1
    }
  },

  h6: {
    ...baseTypography,
    fontFamily: fontStack,
    margin: '0.5em 0',
    fontWeight: 400,
    fontSize: '1.125rem', // 18px desktop
    lineHeight: 1.2,
    '@media (max-width:899px)': {
      fontSize: '1rem', // 16px mobile
      lineHeight: 1.2
    }
  },

  // Variantes supplémentaires selon vos spécifications
  legal: {
    ...baseTypography,
    fontFamily: fontStack,
    fontSize: '0.857rem', // 12px
    fontWeight: 500,
    lineHeight: 1.2
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
    titreSecondaire: {
      ...baseTypography,
      fontSize: '2.75rem', // mobile par défaut
      fontWeight: 600,
      lineHeight: 1.1,
      '@media (min-width:600px)': {
        fontSize: '3rem',  // tablettes
      },
      '@media (min-width:900px)': {
        fontSize: '4.5rem', // laptop
      },
      '@media (min-width:1200px)': {
        fontSize: '5.75rem',  // grands écrans
      },
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
  },

  textWhite: {
    color: '#FFFFFF!important',
    '&.MuiTypography-root': {
      color: '#FFFFFF!important'
    }
  }
}

export default typography