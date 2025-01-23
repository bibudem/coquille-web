import { styled } from '@mui/material'

const colors = {
  'bleu-50': { bg: '#eef4f7' },
  'bleu-200': { bg: '#cce2f3' },
  'bleu-600': { bg: '#00407f', fg: '#fff' },
  'rose-100': { bg: '#fcf3f1' },
  'rose-300': { bg: '#fee1de' },
  'vert-foncé-600': { bg: '#024224', fg: '#fff' },
  rien: { bg: 'red' },
}

const StyledSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(2),
  margin: '0',
  display: 'block',
  padding: '3.5rem 5.19rem 4.31rem 4.75rem',
}))

export default function Section({ children, sx, fond, image, ...props }) {
  const styles = {}

  if (image) {
    //
  } else if (fond) {
    if (typeof colors[fond] !== 'undefined' && !Reflect.has(colors[fond], 'bg')) {
      throw new Error(`La couleur \`${fond}\` n'est pas définie dans la liste des couleurs du composant Section.`)
    }

    styles.backgroundColor = colors[fond].bg
    if (colors[fond]?.fg) {
      styles.color = colors[fond].fg
    }
  }

  return (
    <StyledSection
      {...props}
      children={children}
      className={`section section--${fond}`}
      sx={{
        ...styles,
        ...sx,
      }}
    />
  )
}
