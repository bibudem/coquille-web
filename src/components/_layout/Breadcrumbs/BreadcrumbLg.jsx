import { styled } from '@mui/material/styles'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { HouseLineIcon } from '@phosphor-icons/react/dist/csr/HouseLine'

const crumbLayoutStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '.5ch',
}

const StyledBreadcrumb = styled(Link)(({ theme }) => ({
  ...crumbLayoutStyles,
  textDecoration: 'underline',
  ':hover': {
    textDecoration: 'none',
  },
}))

// Le dernier maillon représente la page courante : pas de lien (on y est déjà),
// pas de soulignement (qui laisserait croire qu'il est cliquable), et
// aria-current="page" pour le signaler aux technologies d'assistance — même
// traitement que le maillon actif dans BreadcrumbSm.jsx.
const CurrentBreadcrumb = styled('span')(crumbLayoutStyles)

export default function BreadcrumbsLg({ crumbs }) {
  return (
    <MuiBreadcrumbs className="bib-comp-breadcrumbs" aria-label="Fil d'ariane" sx={{ paddingBottom: '24px' }}>
      {crumbs.map(({ pathname, crumbLabel }, index) => {
        const isLeaf = index === crumbs.length - 1
        const content = index === 0 ? <HouseLineIcon size="1.125rem" /> : crumbLabel

        return isLeaf ? (
          <CurrentBreadcrumb key={index} aria-current="page">
            {content}
          </CurrentBreadcrumb>
        ) : (
          <StyledBreadcrumb key={index} href={pathname}>
            {content}
          </StyledBreadcrumb>
        )
      })}
    </MuiBreadcrumbs>
  )
}
