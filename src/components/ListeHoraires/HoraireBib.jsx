import { styled, Typography } from '@mui/material'
import codeBibs from 'code-bib'
import slugify from '@sindresorhus/slugify'
import { Link } from '@phosphor-icons/react'
import BlocHoraire from './BlocHoraire'
import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'

const A = styled('a')({
  color: 'inherit',
  position: 'absolute',
  top: '50%',
  left: '-28px',
  width: 28,
  height: 28,
  transform: 'translateY(calc(-50% - 0.25rem))',
  lineHeight: 1,
  opacity: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

function Title({ title, sticky = false }) {
  const id = slugify(title)
  return (
    <Div
      sx={
        sticky
          ? {
              position: 'sticky',
              top: 0,
              '&:hover > .anchor': {
                opacity: 1,
              },
            }
          : {
              position: 'relative',
              '&:hover > .anchor': {
                opacity: 1,
              },
            }
      }
    >
      <Typography
        id={id}
        component="h2"
        sx={(theme) => ({
          fontSize: '1.4444rem', // 26px
          fontWeight: 400,
          lineHeight: 1.2,
          [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem', // 28px
          },
          [theme.breakpoints.up('lg')]: {
            fontSize: '1.7778rem', // 32px
            width: 270,
          },
          [theme.breakpoints.up('xl')]: {
            width: 300,
          },
        })}
      >
        {title}
      </Typography>
      <A className="anchor" href={`#${id}`} aria-label={`Permalien: ${title}`}>
        <Link size="1.125rem" color="currentColor" weight="bold" />
      </A>
    </Div>
  )
}

export default function HoraireBib({ codeBib, children }) {
  const isSmall = useSmall('lg')
  const isXSmall = useSmall('sm')

  console.log('isXSmall:', isXSmall)

  const miscContent = children && <Div sx={{ fontSize: '0.8889rem', marginTop: '1em' }}>{children}</Div>
  return isXSmall ? (
    <Div
      sx={{
        position: 'relative',
      }}
    >
      <Title title={codeBibs[codeBib].court} sticky />
      {children}
    </Div>
  ) : (
    <Div
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '3.5556rem',
        [theme.breakpoints.up('lg')]: {
          flexDirection: 'row',
        },
      })}
    >
      <Div>
        <Title title={codeBibs[codeBib].court} />
        {children && !isSmall && miscContent}
      </Div>
      <BlocHoraire codeBib={codeBib} />
      {children && isSmall && miscContent}
    </Div>
  )
}
