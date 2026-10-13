import BreadcrumbSm from './BreadcrumbSm'
import BreadcrumbLg from './BreadcrumbLg'
import { useSmall } from '@/hooks/use-small'
import crumbLabelOverrides from '../../../../public/crumb-labels.json'

// gatsby-plugin-breadcrumb ne connaît que les segments d'URL : le libellé de
// chaque maillon est par défaut le slug lui-même. Une page peut définir
// `crumbLabel` dans son frontmatter pour lui substituer un mot arbitraire
// (voir gatsby-node.mjs, qui construit ce mapping à partir de tout le site et
// l'écrit dans public/crumb-labels.json) ; en son absence, le slug reste
// utilisé tel quel — c'est le comportement de repli.
function stripTrailingSlash(pathname) {
  return pathname.replace(/\/+$/, '') || '/'
}

function applyCrumbLabelOverrides(crumbs) {
  return crumbs?.map((crumb) => {
    const override = crumbLabelOverrides[stripTrailingSlash(crumb.pathname)]
    return override ? { ...crumb, crumbLabel: override } : crumb
  })
}

export default function Breadcrumbs({ crumbs, ...props }) {
  const isSmall = useSmall('lg')
  const resolvedCrumbs = applyCrumbLabelOverrides(crumbs)

  return isSmall ? <BreadcrumbSm crumbs={resolvedCrumbs} {...props} /> : <BreadcrumbLg crumbs={resolvedCrumbs} {...props} />
}
