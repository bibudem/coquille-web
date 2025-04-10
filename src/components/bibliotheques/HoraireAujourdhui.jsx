import { ArrowRight, ClockCountdown } from '@phosphor-icons/react'
import Link from '@/components/Link'
import Bloc from './Bloc'
export default function HoraireAujourdhui() {
  return (
    <Bloc title="Horaire d'aujourd'hui" Icon={ClockCountdown}>
      <p>
        <Link to="/horaires/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5em' }}>
          Tous les horaires <ArrowRight size={18} />
        </Link>
      </p>
    </Bloc>
  )
}
