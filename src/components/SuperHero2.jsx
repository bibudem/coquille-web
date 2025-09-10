import { useEffect, useState } from 'react'
import { Typography, useTheme, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Section from '@/components/Section'
import { SuperHeroContext } from '@/components/_layout/SuperHero/SuperHeroContext'
import { useSmall } from '@/hooks/use-small'

// Constantes pour les dimensions
export const INLINE_OFFSET_DESKTOP = '3.75rem'
export const INLINE_OFFSET_MOBILE = '1.5rem'
export const INLINE_OFFSET_XS = '1rem'
export const BOTTOM_OFFSET_DESKTOP = '4.25rem'
export const BOTTOM_OFFSET_MOBILE = '2rem'
export const BOTTOM_OFFSET_XS = '1.5rem'

// Dimensions pour différentes tailles d'écran
const BOX_SIZES = {
  default: {
    desktop: {
      height: '65vh',  
      minHeight: '28rem', 
      width: '100%',
    },
    tablet: {
      height: '55vh',  
      minHeight: '24rem',
      width: '100%',
    },
    mobile: {
      height: '58vh',  
      minHeight: '20rem',
      width: '100%',
    }
  },
  small: {
    desktop: {
      height: '30vh',  
      minHeight: '12rem', 
      width: '100%',
    },
    tablet: {
      height: '32vh',  
      minHeight: '10rem',
      width: '100%',
    },
    mobile: {
      height: '34vh',  
      minHeight: '8rem',
      width: '100%',
    }
  }
}

// Valeurs par défaut pour le contexte
const DEFAULT_CONTEXT = {
  inlineOffset: INLINE_OFFSET_DESKTOP,
  bottomOffset: BOTTOM_OFFSET_DESKTOP
}

/**
 * A full-width hero section component with background image and text overlay
 * @param {string} title - The main heading text to display (required)
 * @param {React.ReactNode} subTitle - Optional subtitle content below the heading
 * @param {string} imageName - Name of the image file to use as background (required)
 * @param {string} alt - Alt text for the background image (defaults to empty string)
 * @param {number} lvl - Niveau de superposition (optionnel)
 * @param {string} size - Taille de la section: 'default' ou 'small' (défaut: 'default')
 * @returns {JSX.Element} A hero section with gradient overlay and text content
 */
export default function SuperHero2({ 
  title, 
  subTitle, 
  imageName, 
  alt = '', 
  lvl, 
  children, 
  size = 'default',
  ...rest 
}) {
  // Validation des props requises
  if (typeof title === 'undefined') {
    throw new Error('title prop is required')
  }

  if (typeof imageName === 'undefined') {
    throw new Error('imageName prop is required')
  }

  // Validation de la taille
  if (size !== 'default' && size !== 'small') {
    throw new Error('size prop must be either "default" or "small"')
  }

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm')) // < 600px
  const isSmall = useSmall()
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md')) // 600px - 900px
  const isLarge = useMediaQuery(theme.breakpoints.up('md')) // >= 900px
  
  const [contextData, setContextData] = useState(DEFAULT_CONTEXT)

  // Requête GraphQL pour les images
  const data = useStaticQuery(graphql`
    query ImageQuery {
      allFile(filter: { sourceInstanceName: { eq: "super-heroes" } }) {
        nodes {
          id
          name
          absolutePath
          relativePath
          relativeDirectory
          childrenImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  `)

  // Trouver l'image correspondante
  const imageNode = data.allFile.nodes.find((node) => node.name === imageName)
  const image = imageNode?.childrenImageSharp[0]?.gatsbyImageData

  // Gestion d'erreur si l'image n'est pas trouvée
  if (!image) {
    throw new Error(`Image with name "${imageName}" not found in super-heroes directory`)
  }

  // Mise à jour du contexte en fonction de la taille d'écran
  useEffect(() => {
    if (isXs) {
      setContextData({
        inlineOffset: INLINE_OFFSET_XS,
        bottomOffset: BOTTOM_OFFSET_XS,
      })
    } else if (isMedium) {
      setContextData({
        inlineOffset: INLINE_OFFSET_MOBILE,
        bottomOffset: BOTTOM_OFFSET_MOBILE,
      })
    } else {
      setContextData({
        inlineOffset: INLINE_OFFSET_DESKTOP,
        bottomOffset: BOTTOM_OFFSET_DESKTOP,
      })
    }
  }, [isXs, isMedium, isLarge])

  // Déterminer les dimensions en fonction de la taille d'écran et de la prop size
  const getBoxSize = () => {
    const sizeConfig = BOX_SIZES[size] || BOX_SIZES.default
    
    if (isXs) return sizeConfig.mobile
    if (isMedium) return sizeConfig.tablet
    return sizeConfig.desktop
  }

  const currentBoxSize = getBoxSize()
  const spacerHeight = `calc(${currentBoxSize.height} - ${isXs ? '4rem' : isMedium ? '6rem' : '8rem'})`

  return (
    <SuperHeroContext.Provider value={contextData}>
      {/* Conteneur principal du hero */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          ...currentBoxSize,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden', 
        }}
        {...rest}
      >
        {/* Conteneur pour l'image et l'overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Image de fond */}
          <GatsbyImage
            image={image}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            loading="eager"
          />
          
          {/* Overlay sombre - même dimensions que l'image */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `rgba(0, 0, 0, 0.50)`,
            }}
          />
        </div>
        
        {/* Contenu textuel */}
        <Section
            sx={{
              zIndex: 2,
              width: '100%',
              position: 'relative', 
              ...(size === 'small' ? { marginBottom: '-4rem!important' } : {})
            }}
          >
          <Grid container>
            <Grid
              size={{
                xs: 12,
                sm: 10,
                md: size === 'small' ? 12 : 8,
              }}
               >
              <Typography
                  component="h1"
                  variant={size === 'small' ? 'titreSuperHeroSmall' : 'titreSuperHero'}
                >
                {title}
              </Typography>
              {subTitle && React.isValidElement(subTitle) && 
                React.cloneElement(subTitle, {
                  sx: {
                    mt: {
                      xs: 1,
                      sm: 1.5,
                      md: 2
                    }
                  }
                })
              }
            </Grid>
          </Grid>
        </Section>
        
        {/* Contenu enfant */}
        {children && (
          <div style={{ 
            zIndex: 2, 
            width: '100%',
            padding: isXs ? '0 1rem 1rem' : `0 ${contextData.inlineOffset} ${contextData.bottomOffset}`,
            position: 'relative', // Important pour le contexte d'empilement
          }}>
            {children}
          </div>
        )}
      </div>
      
      {/* Espaceur pour préserver l'espace dans le flux du document */}
      <div style={{ width: '100%', height: spacerHeight }} />
    </SuperHeroContext.Provider>
  )
}