import BlocHoraireWide from './BlocHoraireWide'
import BlocHoraireNarrow from './BlocHoraireNarrow'
import { useSmall } from '@/hooks/use-small'

export default function BlocHoraire({ codeBib }) {
  const isSmall = useSmall('md')

  return isSmall ? <BlocHoraireNarrow codeBib={codeBib} /> : <BlocHoraireWide codeBib={codeBib} />
}
