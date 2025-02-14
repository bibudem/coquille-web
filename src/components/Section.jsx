import { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { secondaryColors } from '../../plugins/gatsby-plugin-bib-theme/tokens.js'

const baseStyles = {
  py: '96px',
  backgroundColor: 'transparent',
  color: 'inherit',
}

/**
 * Composant Section qui affiche une section avec une image de fond optionnelle, une couleur et une largeur fixe.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} [props.bg] - Le nom de la couleur secondaire employer pour la couleur de fond.
 * @param {React.ReactElement} [props.image] - L'élément image à utiliser comme image de fond.
 * @param {boolean} [props.fixedWidth] - Indicateur pour déterminer si la section doit avoir une largeur fixe.
 *
 * @throws {Error} Si la clé de la couleur de fond spécifiée n'est pas définie dans l'objet colors.
 *
 * @returns {JSX.Element} Le composant section rendu.
 */
export default function Section({ bg, image, fixedWidth = false, ...rest }) {
  const { children, sx, ...props } = rest

  if (image) {
    throw new Error("La propriété `image` n'est pas encore implémentée.")
  }

  const [styles, setStyles] = useState(baseStyles)
  console.log('secondaryColors', secondaryColors)

  useEffect(() => {
    function getsecondaryColor(color) {
      if (bg && !Reflect.has(secondaryColors, color)) {
        throw new Error(`La couleur \`${color}\` utilisée dans le composant Section n'existe pas dans le thème.`)
      }

      return secondaryColors[color]
    }

    console.log('bg', bg)

    if (bg) {
      const color = getsecondaryColor(bg)
      console.log('yep:', bg)
      console.log('color:', color)
      setStyles((oldStyles) => ({
        ...oldStyles,
        backgroundColor: color.main,
        color: color.contrastText,
      }))
    }
  }, [bg])

  useEffect(() => {
    if (!fixedWidth) {
      setStyles((oldStyles) => ({
        ...oldStyles,
        maxWidth: 'unset',
      }))
    }
  }, [fixedWidth])

  // if (image) {
  //   console.log('image', image)
  //   baseStyles.backgroundImage = `url(${image})`
  //   baseStyles.backgroundSize = 'cover'
  //   baseStyles.backgroundPosition = 'center'
  //   baseStyles.backgroundRepeat = 'no-repeat'
  // }

  return fixedWidth ? (
    <Container
      maxWidth="xl"
      {...props}
      sx={{
        ...styles,
        ...sx,
      }}
    >
      {children}
    </Container>
  ) : (
    <Box
      sx={{
        ...styles,
        ...sx,
        outline: '1px dotted blue',
      }}
    >
      <Container maxWidth="xl" {...props}>
        {children}
      </Container>
    </Box>
  )
}
