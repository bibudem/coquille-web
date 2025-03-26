import { styled } from '@mui/material/styles'

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: theme.breakpoints.values[theme.breakpoints.keys[theme.breakpoints.keys.length - 1]],
  marginInline: 'auto',
  paddingInline: '1rem',
}))

export default function FooterContainer({ children, ...props }) {
  console.log('props:', props)
  return <StyledDiv>{children}</StyledDiv>
}
