import Div from '@/components/utils/Div'

export default function HoraireNonDisponible() {
  return (
    <Div
      className="bib-comp-horaires--message-non-disponible"
      sx={(theme) => ({
        padding: '.35em .5em',
        [theme.breakpoints.down('md')]: {
          borderBottom: `1px solid ${theme.palette.bleu200.dark}`,
        },
        [theme.breakpoints.up('md')]: {
          padding: '1em 2em',
          textAlign: 'center',
        },
      })}
    >
      Horaire non disponible.
    </Div>
  )
}
