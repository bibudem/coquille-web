const fontStack = '"Figtree", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';
const loraStack = '"Lora", Georgia, serif';

export default {
  fontFamily: fontStack,
  fontSize: 18,
  htmlFontSize: 18,

  h1: {
      fontFamily: fontStack,
      fontWeight: 600,
      margin: '0.5em 0',               // semibold
      fontSize: '3.125rem',               // desktop (56px)
      '@media (max-width:899px)': {
        fontSize: '3rem',           // tablette (~48px)
      },
      '@media (max-width:599px)': {
        fontSize: '2.25rem',           // mobile (~36px)
      },
    },

h2: {
    fontFamily: loraStack,
    fontWeight: 500,
    margin: '0.5em 0',                // medium
    fontSize: '1.889rem',  
    wordSpacing: '-0.2em',            
    '@media (max-width:899px)': {
      fontSize: '1.65rem',  
      wordSpacing: '-0.2em',          // tablette (~28px)
    },
    '@media (max-width:599px)': {
      fontSize: '1.4rem', 
      wordSpacing: '-0.2em',            // mobile (~25.6px)
    },
  },

  h3: {
    fontFamily: fontStack,
    fontWeight: 500, 
    margin: '0.5em 0',            // medium
    fontSize: '1.556rem',        // desktop (28px)
    '@media (max-width:899px)': {
      fontSize: '1.4rem',        // tablette (env 25px)
    },
    '@media (max-width:599px)': {
      fontSize: '1.25rem',       // mobile (env 20px)
    },
  },

  h4: {
    fontFamily: fontStack,
    fontWeight: 500,
    margin: '0.5em 0',             // medium
    fontSize: '1.1667rem',       // desktop (21px)
    '@media (max-width:899px)': {
      fontSize: '1.05rem',       // tablette (17px)
    },
    '@media (max-width:599px)': {
      fontSize: '0.95rem',       // mobile (15px)
    },
  },

  h5: {
    fontFamily: fontStack,
    fontWeight: 500,
    margin: '0.5em 0',             // medium
    fontSize: '1.056rem',        // desktop (19px)
    '@media (max-width:899px)': {
      fontSize: '0.95rem',       // tablette (15px)
    },
    '@media (max-width:599px)': {
      fontSize: '0.85rem',       // mobile (13.5px)
    },
  },

  

};
