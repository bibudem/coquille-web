import BlocHoraireWide from './BlocHoraireWide'
import BlocHoraireNarrow from './BlocHoraireNarrow'
import { useSmall } from '@/hooks/use-small'

export default function BlocHoraire({ codeBib }) {
  const isSmall = useSmall('md')
  console.log('### isSmall(md):', isSmall)
  return isSmall ? <BlocHoraireNarrow codeBib={codeBib} /> : <BlocHoraireWide codeBib={codeBib} />
}
