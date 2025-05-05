import Div from '@/components/utils/Div'

export default function HoraireNonDisponible() {
  return (
    <Div
      className="bib-comp-horaires--message-non-disponible"
      sx={{
        padding: '1em 2em',
        textAlign: 'center',
      }}
    >
      Horaire non disponible pour cette semaine.
    </Div>
  )
}
