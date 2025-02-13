import { Box, Container, styled } from '@mui/material'

const colors = {
  'bleu-50': { bg: '#eef4f7' },
  'bleu-200': { bg: '#cce2f3' },
  'bleu-600': { bg: '#00407f', fg: '#fff' },
  'rose-100': { bg: '#fcf3f1' },
  'rose-300': { bg: '#fee1de' },
  'vert-foncé-600': { bg: '#024244', fg: '#fff' },
  rien: { bg: 'red' },
}

const baseStyles = {
  py: '96px',
}

const SectionRoot = styled('div', {
  name: 'BibSection',
  slot: 'root',
})(({ theme }) => ({}))

/**
 * Composant Section qui affiche une section avec une image de fond optionnelle, une couleur et une largeur fixe.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} [props.fond] - Le nom de la couleur à employer ou une valeur css pour la couleur de fond. La couleur de l'icône sera déterminée en fonction de la couleur de fond.
 * @param {React.ReactElement} [props.image] - L'élément image à utiliser comme image de fond.
 * @param {boolean} [props.fixedWidth] - Indicateur pour déterminer si la section doit avoir une largeur fixe.
 * @param {React.ReactNode} [props.action] - L'élément action à afficher en bas de la section.
 *
 * @throws {Error} Si la clé de la couleur de fond spécifiée n'est pas définie dans l'objet colors.
 *
 * @returns {JSX.Element} Le composant section rendu.
 */
export default function Section({ children, sx, fond, image, fixedWidth, action, ...rest }) {
  if (image) {
    baseStyles.backgroundImage = `url(${image.props.src})`
  } else if (fond) {
    if (typeof colors[fond] !== 'undefined' && !Reflect.has(colors[fond], 'bg')) {
      throw new Error(`La couleur \`${fond}\` n'est pas définie dans la liste des couleurs du composant Section.`)
    }

    baseStyles.backgroundColor = colors[fond].bg
    if (colors[fond]?.fg) {
      baseStyles.color = colors[fond].fg
    }
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
      <Container>
        {children}
        {action && <Box sx={{ mt: 4 }}>{action}</Box>}
      </Container>
    </SectionRoot>
  )
}
