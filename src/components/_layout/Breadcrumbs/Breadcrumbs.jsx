import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import MUIBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { HouseLine } from '@phosphor-icons/react'

const StyledBreadcrumb = styled(Link)(({ theme }) => ({
  textDecoration: 'underline',
  ':hover': {
    textDecoration: 'none',
  },
}))

function handleClick(event) {
  // event.preventDefault()
  // console.info('You clicked a breadcrumb.', event)
}

export default function Breadcrumbs({ crumbs }) {
  // console.log('crumbs:', crumbs)

  return (
    <Container
      role="presentation"
      className={`breadcrumbs`}
      sx={{
        paddingInline: 0,
      }}
    >
      <div onClick={handleClick}>
        <MUIBreadcrumbs aria-label="Fil d'ariane">
          {crumbs.map(({ pathname, crumbLabel }, index) => (
            <StyledBreadcrumb key={index} href={pathname}>
              {index === 0 ? <HouseLine size="1.125rem" /> : ''}
              {crumbLabel}
            </StyledBreadcrumb>
          ))}
        </MUIBreadcrumbs>
      </div>
    </Container>
  )
}
