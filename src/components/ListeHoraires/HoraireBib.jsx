import codeBibs from 'code-bib'
import slugify from '@sindresorhus/slugify'
import { Link } from '@phosphor-icons/react'
import BlocHoraire from './BlocHoraire'
import Div from '@/components/utils/Div'
import { styled, Typography } from '@mui/material'

const A = styled('a')({
  color: 'inherit',
  position: 'absolute',
  top: '50%',
  left: '-28px',
  width: 28,
  height: 28,
  transform: 'translateY(calc(-50% - 0.3rem))',
  lineHeight: 1,
  opacity: 0.8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

function Title({ title }) {
  const id = slugify(title)
  return (
    <Div
      sx={{
        position: 'relative',
        '&:hover > .anchor': {
          opacity: 1,
        },
      }}
    >
      <Typography
        id={id}
        component="h2"
        sx={(theme) => ({
          width: 200,
          [theme.breakpoints.up('lg')]: {
            width: 270,
          },
          [theme.breakpoints.up('xl')]: {
            width: 300,
          },
          fontSize: '1.7778rem',
          fontWeight: 400,
          lineHeight: 1.2,
        })}
      >
        {title}
      </Typography>
      <A className="anchor" href={`#${id}`} aria-label={`Permalien: ${title}`}>
        <Link size="1rem" color="currentColor" weight="bold" />
      </A>
    </Div>
  )
}

export default function HoraireBib({ codeBib, children }) {
  return (
    <Div
      sx={{
        display: 'flex',
        gap: '20px',
        marginBottom: '3.5556rem',
      }}
    >
      <Div>
        <Title title={codeBibs[codeBib].court} />
        {children && <Div sx={{ fontSize: '0.8889rem', marginTop: '1em' }}>{children}</Div>}
      </Div>
      <BlocHoraire codeBib={codeBib} />
    </Div>
  )
}
