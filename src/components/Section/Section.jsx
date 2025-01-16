import { styled } from '@mui/material'

const colors = {
  'bleu-très-pâle': '#eef4f7',
  'bleu-pâle': '#cce2f3',
  bleu: '#00407f',
}

const StyledSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(2),
  margin: '0 auto',
  // padding: 3,
}))

export default function Section({ children, sx, fond = 'bleu-très-pâle', ...props }) {
  return (
    <StyledSection
      {...props}
      children={children}
      className={`section section--${fond}`}
      sx={{
        ...sx,
        backgroundColor: colors[fond],
      }}
    />
  )
}
