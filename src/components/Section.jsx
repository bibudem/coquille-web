import { Container, styled } from '@mui/material'
import { secondaryColors } from '../../plugins/gatsby-plugin-bib-theme/tokens.js'

function getsecondaryColor(color) {
  if (!Reflect.has(secondaryColors, color)) {
    throw new Error(`La couleur \`${color}\` utilisée dans le composant Section n'existe pas dans le thème.`)
  }

  return secondaryColors[color]
}

const baseStyles = {
  py: '96px',
  backgroundColor: 'transparent',
  color: 'inherit',
}

const SectionRoot = styled('div', {
  name: 'BibSection',
  slot: 'root',
})(({ theme }) => ({}))

/**
 * Composant Section qui affiche une section avec une image de fond optionnelle, une couleur et une largeur fixe.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} [props.bg] - Le nom de la couleur ou une valeur css à employer pour la couleur de fond. La couleur de l'icône sera déterminée en fonction de la couleur de fond.
 * @param {React.ReactElement} [props.image] - L'élément image à utiliser comme image de fond.
 * @param {boolean} [props.fixedWidth] - Indicateur pour déterminer si la section doit avoir une largeur fixe.
 *
 * @throws {Error} Si la clé de la couleur de fond spécifiée n'est pas définie dans l'objet colors.
 *
 * @returns {JSX.Element} Le composant section rendu.
 */
export default function Section({ bg, image, fixedWidth, children, sx, ...rest }) {

  if (image) {
    baseStyles.backgroundImage = `url(${image.props.src})`
  } else if (bg) {
    const color = getsecondaryColor(bg)
    baseStyles.backgroundColor = color.main
    baseStyles.color = color.contrastText
  }

  if (fixedWidth) {
    //
  } else {
    baseStyles.maxWidth = 'unset'
  }

  return fixedWidth ? (
    <Container
      maxWidth={fixedWidth ? 'none' : undefined}
      {...rest}
      component={fixedWidth ? Container : SectionRoot}
      sx={{
        ...baseStyles,
        ...sx,
      }}
    >
      {children}
    </Container>
  ) : (
    <SectionRoot
      maxWidth={fixedWidth ? 'none' : undefined}
      {...rest}
      component={fixedWidth ? Container : SectionRoot}
      sx={{
        ...baseStyles,
        ...sx,
      }}
    >
      <Container>{children}</Container>
    </SectionRoot>
  )
}
