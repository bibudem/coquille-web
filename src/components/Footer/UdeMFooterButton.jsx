import { ButtonBase, styled } from '@mui/material'

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  '--_bullet-size': '0.9333em',
  '--_bullet-margin-inline': '.6667em',
  '--_padding-block': '.785em',
  '--_padding-inline-start': '1.0667em',
  '--_padding-inline-end': '1.3333em',
  color: theme.palette.udemBleuFonce.main,
  backgroundColor: theme.palette.Button.inheritContainedBg,
  borderRadius: theme.shape.corner.full,
  fontSize: '.875rem',
  whiteSpace: 'nowrap',
  fontWeight: 600,
  padding: 'var(--_padding-block) var(--_padding-inline-end) var(--_padding-block) calc(var(--_padding-inline-start) + var(--_bullet-size) + var(--_bullet-margin-inline))',
  lineHeight: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 'calc(var(--_padding-inline-start))',
    width: 'var(--_bullet-size)',
    height: 'var(--_bullet-size)',
    backgroundColor: theme.palette.udemBleuFonce.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.Button.inheritContainedHoverBg,
  },
}))

export default function UdeMFooterButton({ children, ...props }) {
  return <StyledButton>{children}</StyledButton>
}
