import { styled } from '@mui/material'

const StyledA = styled('a')(({ theme }) => ({
  position: 'absolute',
  left: '-9999px',
  padding: '.75rem 1rem',
  background: '#fff',
  opacity: 0,
  zIndex: theme.zIndex.appBar + 1,
  '&:focus': {
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: 1,
  },
}))

export default function SkipTo({ href, ...props }) {
  return <StyledA href={href} {...props} />
}
