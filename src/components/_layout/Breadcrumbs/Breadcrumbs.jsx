import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { HouseLineIcon } from '@phosphor-icons/react'

const StyledBreadcrumb = styled(Link)(({ theme }) => ({
  textDecoration: 'underline',
  ':hover': {
    textDecoration: 'none',
  },
}))

export default function Breadcrumbs({ crumbs }) {
  // console.log('crumbs:', crumbs)

  return (
    <MuiBreadcrumbs className="bib-comp-breadcrumbs" aria-label="Fil d'ariane" sx={{ paddingBottom: '24px' }}>
      {crumbs.map(({ pathname, crumbLabel }, index) => (
        <StyledBreadcrumb key={index} href={pathname}>
          {index === 0 ? <HouseLineIcon size="1.125rem" /> : ''}
          {crumbLabel}
        </StyledBreadcrumb>
      ))}
    </MuiBreadcrumbs>
  )
}
