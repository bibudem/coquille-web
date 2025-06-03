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
          ? (theme) => ({
              position: 'sticky',
              top: '145px',
              backgroundColor: theme.palette.background.paper,
              '&:hover > .anchor': {
                opacity: 1,
              },
            })
          : {
              position: 'relative',
              '&:hover > .anchor': {
                opacity: 1,
              },
              // marginTop: '1.8rem',
              marginBottom: '1.8rem',
            }
      }
    >
      <Typography
        id={id}
        component="h2"
        sx={(theme) => ({
          fontSize: '1.5rem', // 26px
          fontWeight: 400,
          lineHeight: 1.2,
          [theme.breakpoints.up('lg')]: {
            fontSize: '1.7778rem', // 32px
            width: 240,
          },
          ['@media (min-width: 1370px) ']: {
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
  const isLG = useSmall('lg')
  const isSM = useSmall('md')

  const miscContent = children && <Div sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', fontSize: '0.8889rem' }}>{children}</Div>

  return isSM ? (
    <Div>
      <Div>
        <Title title={codeBibs[codeBib].court} />
        <Div
          sx={{
            marginBottom: '.5em',
          }}
        >
          {children}
        </Div>
      </Div>
      <BlocHoraire codeBib={codeBib} />
    </Div>
  ) : (
    <Div
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: {
          xs: '1em',
          lg: '20px',
        },
        marginBottom: '3.5556rem',
        [theme.breakpoints.up('lg')]: {
          flexDirection: 'row',
        },
      })}
    >
      <Div
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Title title={codeBibs[codeBib].court} />
        {!isLG && miscContent}
      </Div>
      <BlocHoraire codeBib={codeBib} />
      {isLG && miscContent}
    </Div>
  )
}
