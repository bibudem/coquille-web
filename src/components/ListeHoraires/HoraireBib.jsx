import codeBibs from 'code-bib'
import BlocHoraire from './BlocHoraire'
import Div from '@/components/utils/Div'

function Title({ children }) {
  return (
    <Div
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
      {children}
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
        <Title>{codeBibs[codeBib].court}</Title>
        {children}
      </Div>
      <BlocHoraire codeBib={codeBib} />
    </Div>
  )
}
