const fontStack = '"Figtree", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';
const loraStack = '"Lora", Georgia, serif';

const baseTypography = {
  fontFeatureSettings: "'liga' off, 'clig' off",
  fontVariantNumeric: 'lining-nums tabular-nums',
  fontStyle: 'normal'
};

export default {
  fontFamily: fontStack,
  fontSize: 14, // Base pour body (14px)
  htmlFontSize: 16, // Base pour rem

  // Hiérarchie typographique
  h1: {
    ...baseTypography,
    fontSize: '2.25rem', // Mobile (36px)
    fontWeight: 600,
    lineHeight: 1,
    '@media (min-width:600px)': { // sm
      fontSize: '4rem', // Tablet (64px)
    },
    '@media (min-width:900px)': { // md
      fontSize: '6.875rem', // Desktop (110px)
    }
  },

  h2: {
    ...baseTypography,
    fontSize: '1.75rem', // Mobile (28px)
    fontWeight: 600,
    lineHeight: 1.1,
    '@media (min-width:600px)': {
      fontSize: '2.875rem', // Tablet (46px)
    },
    '@media (min-width:900px)': {
      fontSize: '3.5rem', // Desktop (56px)
    }
  },

  h3: {
    ...baseTypography,
    fontSize: '1.5rem', // Mobile (24px)
    fontWeight: 600,
    lineHeight: 1.2,
    '@media (min-width:600px)': {
      fontSize: '2rem', // Tablet (32px)
    },
    '@media (min-width:900px)': {
      fontSize: '2.25rem', // Desktop (36px)
    }
  },

  h4: {
    ...baseTypography,
    fontFamily: loraStack,
    fontSize: '1.25rem', // Mobile (20px)
    fontWeight: 500,
    lineHeight: 1.2,
    '@media (min-width:600px)': {
      fontSize: '1.5rem', // Tablet (24px)
    },
    '@media (min-width:900px)': {
      fontSize: '1.875rem', // Desktop (30px)
    }
  },

  h5: {
    ...baseTypography,
    fontSize: '1.125rem', // Mobile (18px)
    fontWeight: 700,
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '1.375rem', // Desktop (22px)
    }
  },

  h6: {
    ...baseTypography,
    fontSize: '1rem', // Mobile (16px)
    fontWeight: 400,
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '1.125rem', // Desktop (18px)
    }
  },

  // Textes standards
  body1: {
    ...baseTypography,
    fontSize: '0.875rem', // 14px
    fontWeight: 400,
    lineHeight: 1.5
  },

  body2: {
    ...baseTypography,
    fontSize: '0.75rem', // 12px
    fontWeight: 400,
    lineHeight: 1.2
  },

  // Styles display
  display1: {
    ...baseTypography,
    fontSize: '2.5rem', // Mobile (40px)
    fontWeight: 600,
    lineHeight: 1,
    '@media (min-width:600px)': {
      fontSize: '4rem', // Tablet (64px)
    },
    '@media (min-width:900px)': {
      fontSize: '6.875rem', // Desktop (110px)
    }
  },

  display2: {
    ...baseTypography,
    fontSize: '2rem', // Mobile (32px)
    lineHeight: 1.2,
    '@media (min-width:600px)': {
      fontSize: '3rem', // Tablet (48px)
    },
    '@media (min-width:900px)': {
      fontSize: '3.8125rem', // Desktop (61px)
    }
  },

  display3: {
    ...baseTypography,
    fontSize: '1.75rem', // Mobile (28px)
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '2.125rem', // Desktop (34px)
    }
  },

  display4: {
    ...baseTypography,
    fontSize: '1.5rem', // Mobile (24px)
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '1.625rem', // Desktop (26px)
    }
  },

  display5: {
    ...baseTypography,
    fontSize: '1.375rem', // Mobile (22px)
    lineHeight: 1.2,
    '@media (min-width:900px)': {
      fontSize: '1.5rem', // Desktop (24px)
    }
  }
};