import { useEffect, useState } from 'react'
import { Box, Container, useTheme } from '@mui/material'
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
  const theme = useTheme()

  if (image && bg) {
    throw new Error('Les propriétés `image` et `bg` sont mutuellement exclusives.')
  }

  const [styles, setStyles] = useState(baseStyles)

  useEffect(() => {
    function getsecondaryColor(color) {
      if (bg && !Reflect.has(secondaryColors, color)) {
        throw new Error(`La couleur \`${color}\` utilisée dans le composant Section n'existe pas dans le thème.`)
      }

      return secondaryColors[color]
    }

    if (bg) {
      const color = getsecondaryColor(bg)
      setStyles((oldStyles) => ({
        ...oldStyles,
        backgroundColor: color.main,
        color: color.contrastText,
      }))
    }
  }, [bg])

  useEffect(() => {
    if (image) {
      setStyles((oldStyles) => ({
        ...oldStyles,
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url('${image}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        color: '#fff',
      }))
    }
  }, [image])

  useEffect(() => {
    if (!fixedWidth) {
      setStyles((oldStyles) => ({
        ...oldStyles,
        maxWidth: 'unset',
      }))
    }
  }, [fixedWidth])

  return fixedWidth ? (
    <Container
      fixed
      sx={{
        ...styles,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Container>
  ) : (
    <Box
      sx={{
        ...styles,
        ...sx,
      }}
    >
      <Container
        {...props}
        sx={{
          padding: '0!important',
          // outline: '1px solid red',
        }}
      >
        <Box
          sx={(theme) => ({
            padding: '0 20px',
            [theme.breakpoints.up('md')]: {
              padding: '0 64px',
            },
          })}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}
