import { Box, Container, styled } from '@mui/material'

const colors = {
  'bleu-50': { bg: '#eef4f7' },
  'bleu-200': { bg: '#cce2f3' },
  'bleu-600': { bg: '#00407f', fg: '#fff' },
  'rose-100': { bg: '#fcf3f1' },
  'rose-300': { bg: '#fee1de' },
  'vert-foncé-600': { bg: '#024224', fg: '#fff' },
  rien: { bg: 'red' },
}

const SectionRoot = styled('section', {
  name: 'BibSection',
  slot: 'root',
})(({ theme }) => ({
}))

export default function Section({ children, sx, fond, image, fixedWidth, action, ...props }) {
  const styles = {
    py: '96px'
  }

  console.log('image:', image)

  if (image) {
    styles.backgroundImage = `url(${image.props.src})`
  } else if (fond) {
    if (typeof colors[fond] !== 'undefined' && !Reflect.has(colors[fond], 'bg')) {
      throw new Error(`La couleur \`${fond}\` n'est pas définie dans la liste des couleurs du composant Section.`)
    }

    styles.backgroundColor = colors[fond].bg
    if (colors[fond]?.fg) {
      styles.color = colors[fond].fg
    }
  }

  if (fixedWidth) {
    styles.outline = '1px solid red'
  } else {
    styles.maxWidth = 'unset'
  }

  return fixedWidth ? (
    <Container
      maxWidth={fixedWidth ? 'none' : undefined}
      {...props}
      component={fixedWidth ? Container : SectionRoot}
      sx={{
        // paddingInline: 0,
        ...styles,
        ...sx,
      }}
    >
        {children}
    </Container>
  ) : (
    <SectionRoot
      maxWidth={fixedWidth ? 'none' : undefined}
      {...props}
      component={fixedWidth ? Container : SectionRoot}
      sx={{
        // paddingInline: 0,
        ...styles,
        ...sx,
      }}
    >
      <Container>
        {children}
        {
          action && (
            <Box  sx={{mt: 4}}>
              {action}
            </Box>
          )
        }
      </Container>
    </SectionRoot>
  )
}
