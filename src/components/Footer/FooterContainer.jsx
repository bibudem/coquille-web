import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: theme.breakpoints.values[theme.breakpoints.keys[theme.breakpoints.keys.length - 1]],
  marginInline: 'auto',
  paddingInline: '1rem',
}))

export default function FooterContainer({ children, ...props }) {
  return <StyledBox {...props}>{children}</StyledBox>
}
