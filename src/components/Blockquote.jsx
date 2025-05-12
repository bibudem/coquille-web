import { styled } from '@mui/material'

const Figure = styled('figure')(({ theme }) => ({
  padding: '0 0 0 30px',
  position: 'relative',
  margin: '1rem 0',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    width: '3px',
    height: '95%',
    margin: 'auto 0',
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.bleuPrincipal.main,
    borderRadius: theme.shape.corner.full,
  },
}))

const Figcaption = styled('figcaption')(({ theme }) => ({
  color: '#607386',
  fontSize: 'smaller',
  marginTop: '1em',
}))

const StyledBlockquote = styled('blockquote')(({ theme }) => ({
  margin: 0,
  padding: '0 0 0 0',
  position: 'relative',
  quotes: '"«" "»"',
  '& > *': {
    display: 'inline',
  },
  '&::before, &::after': {
    color: '#607386',
  },
  '&::before': {
    content: 'open-quote',
    paddingRight: '.325ch',
  },
  '&::after': {
    content: 'close-quote',
    paddingLeft: '.325ch',
  },
}))

/**
 * Renders a styled blockquote component with optional source attribution.
 *
 * @param {Object} props - Component properties
 * @param {string} [props.cite] - Optional citation reference
 * @param {string} [props.source] - Optional source text to display below the blockquote
 * @param {React.ReactNode} [props.children] - The content of the blockquote
 * @param {Object} [props.sx] - Optional styling overrides
 * @returns {React.ReactElement} A styled blockquote with optional source
 */
export default function Blockquote({ cite, source, ...rest }) {
  const { sx, children, ...props } = rest
  return (
    <Figure sx={sx}>
      <StyledBlockquote {...props}>{typeof children === 'text' ? <p>{children}</p> : children}</StyledBlockquote>
      {source && <Figcaption>{source}</Figcaption>}
    </Figure>
  )
}
