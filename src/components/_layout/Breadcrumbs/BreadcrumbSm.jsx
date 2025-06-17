import { styled } from '@mui/material/styles'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { HouseLineIcon } from '@phosphor-icons/react'

const StyledBreadcrumb = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'underline',
  ':hover': {
    textDecoration: 'none',
  },
}))

export default function BreadcrumbsSm({ crumbs }) {
  // console.log('crumbs:', crumbs)

  return (
    <MuiBreadcrumbs className="bib-comp-breadcrumbs" aria-label="Fil d'ariane" sx={{ paddingBottom: '24px' }}>
      {crumbs.map(({ pathname, crumbLabel }, index) => (
        <Breadcrumb pathname={pathname} label={crumbLabel} isLeaf={index === crumbs.length - 1} isRoot={index === 0} />
      ))}
    </MuiBreadcrumbs>
  )
}

function Breadcrumb({ pathname, label, isLeaf, isRoot }) {
  if (isLeaf) {
    return <span>{label}</span>
  }

  return (
    <StyledBreadcrumb href={isLeaf ? null : pathname} data-is-leaf={isLeaf}>
      {isRoot ? <HouseLineIcon size="1.125rem" /> : label}
    </StyledBreadcrumb>
  )
}
