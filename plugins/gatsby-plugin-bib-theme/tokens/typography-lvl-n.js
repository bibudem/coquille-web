import baseTypography from './typography-lvl-1';

export default {
  ...baseTypography, // Hérite de toutes les propriétés de base

  // Surcharges spécifiques pour le niveau n
  fontFamily: 'Figtree', // Simplifié
  fontSize: 16, // Taille de base légèrement plus grande

  h1: {
    ...baseTypography.h1,
    fontSize: '3.2rem', // Desktop (51px)
    '@media (max-width:899px)': {
      fontSize: '2.5rem' // Mobile/Tablette (40px)
    }
  },

  h2: {
    ...baseTypography.h2,
    fontFamily: 'Lora',
    fontWeight: 500,
    fontSize: '2.4rem' // Desktop (38px)
  },

  h3: {
    ...baseTypography.h3,
    fontWeight: 500,
    fontSize: '2rem' // Desktop (32px)
  },

  h4: {
    ...baseTypography.h4,
    fontSize: '1.4667rem' // Desktop (23.5px)
  },

  h5: {
    ...baseTypography.h5,
    fontWeight: 500,
    fontSize: '1.2667rem' // Desktop (20px)
  },

  h6: {
    ...baseTypography.h6,
    fontWeight: 500,
    fontSize: '1.0667rem' // Desktop (17px)
  },

  // Styles display spécifiques
  display1: {
    ...baseTypography.display1,
    fontSize: '2.875rem', // ~46px
    lineHeight: '112%'
  },

  display2: {
    ...baseTypography.display2,
    fontSize: '3.8125rem', // ~61px
    lineHeight: '110%'
  },

  display3: {
    ...baseTypography.display3,
    fontSize: '2.125rem', // ~34px
    lineHeight: '120%'
  },

  body1: {
    ...baseTypography.body1,
    fontSize: '1rem' // 16px
  }
};