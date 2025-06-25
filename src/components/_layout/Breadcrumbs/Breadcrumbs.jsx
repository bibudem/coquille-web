import BreadcrumbSm from './BreadcrumbSm'
import BreadcrumbLg from './BreadcrumbLg'
import { useSmall } from '@/hooks/use-small'

export default function Breadcrumbs(props) {
  const isSmall = useSmall('lg')

  return isSmall ? <BreadcrumbSm {...props} /> : <BreadcrumbLg {...props} />
}
