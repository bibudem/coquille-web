import { useEffect, useState } from 'react'
import { Box, Container, useTheme, useMediaQuery } from '@mui/material'
import { secondaryColors } from '../../plugins/gatsby-plugin-bib-theme/tokens/tokens.js'

const baseStyles = {
  py: { xs: '48px', md: '64px', lg: '96px' },
  px: { xs: 0, md: 0 },
  backgroundColor: 'transparent',
  color: 'inherit',
}

/**
 * Composant Section responsive avec support des images de fond, couleurs et largeurs variables.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} [props.bg] - Nom de la couleur secondaire pour le fond.
 * @param {React.ReactElement} [props.image] - Élément image pour le fond.
 * @param {boolean} [props.fixedWidth] - Si la section doit avoir une largeur fixe.
 * @param {string} [props.minHeight] - Hauteur minimale de la section.
 * @param {string} [props.textAlign] - Alignement du texte (left, center, right).
 * @param {boolean} [props.parallax] - Effet parallaxe pour l'image de fond.
 * @param {string} [props.overlay] - Couleur de superposition pour améliorer la lisibilité.
 * @param {number} [props.overlayOpacity] - Opacité de la superposition (0-1).
 *
 * @returns {JSX.Element} Le composant section rendu.
 */
export default function Section({ 
  bg, 
  image,
  marginTop, 
  fixedWidth = false, 
  minHeight = 'auto',
  textAlign = 'left',
  parallax = false,
  overlay,
  overlayOpacity = 0.4,
  ...rest 
}) {
  const { children, sx, ...props } = rest
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  if (image && bg) {
    throw new Error('Les propriétés `image` et `bg` sont mutuellement exclusives.')
  }

  const [styles, setStyles] = useState(baseStyles)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Effet de parallaxe
  useEffect(() => {
    if (parallax && image) {
      const handleScroll = () => {
        setScrollPosition(window.scrollY)
      }
      
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [parallax, image])

  useEffect(() => {
    function getSecondaryColor(color) {
      if (bg && !Reflect.has(secondaryColors, color)) {
        throw new Error(`La couleur \`${color}\` utilisée dans le composant Section n'existe pas dans le thème.`)
      }
      return secondaryColors[color]
    }

    const newStyles = { ...baseStyles }

    if (bg) {
      const color = getSecondaryColor(bg)
      newStyles.backgroundColor = color.main
      newStyles.color = color.contrastText
    }

    if (marginTop) {
      newStyles.marginTop = {     
        md: '3rem',   
      }
    }

    if (image) {
      const backgroundPosition = parallax ? `50% ${scrollPosition * 0.5}px` : '50% 50%'
      
      newStyles.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url('${image}')`
      newStyles.backgroundRepeat = 'no-repeat'
      newStyles.backgroundSize = 'cover'
      newStyles.backgroundPosition = backgroundPosition
      newStyles.backgroundAttachment = parallax ? 'fixed' : 'scroll'
      newStyles.color = '#fff'
    }

    if (minHeight !== 'auto') {
      newStyles.minHeight = minHeight
    }

    newStyles.textAlign = textAlign

    setStyles(newStyles)
  }, [bg, image, minHeight, textAlign, parallax, scrollPosition])

  useEffect(() => {
    if (!fixedWidth) {
      setStyles(prev => ({
        ...prev,
        maxWidth: 'unset',
      }))
    }
  }, [fixedWidth])

  // Styles pour la superposition
  const overlayStyles = overlay ? {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: overlay,
      opacity: overlayOpacity,
      zIndex: 0,
    }
  } : {}

  return fixedWidth ? (
    <Container
      fixed
      sx={{
        ...styles,
        position: 'relative',
        ...overlayStyles,
        ...sx,
      }}
      {...props}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Container>
  ) : (
    <Box
      sx={{
        ...styles,
        position: 'relative',
        ...overlayStyles,
        ...sx,
      }}
    >
      <Container
        {...props}
        sx={{
          padding: '0!important',
          position: 'relative',
        }}
      >
        <Box
          sx={(theme) => ({
            padding: { xs: '0 16px', sm: '0 20px', md: '0 40px', lg: '0 64px' },
            position: 'relative',
            zIndex: 1,
          })}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}