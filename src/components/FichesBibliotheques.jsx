import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import GridOffset from '@/components/utils/GridOffset'
import Div from '@/components/utils/Div'
import { graphql, useStaticQuery } from 'gatsby'

function Header1({ Icon, children }) {
  return (
    <Div
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
        marginBottom: '16px',
      })}
    >
      <Icon size={24} color="currentColor" />
      <Typography
        component="h4"
        sx={{
          fontSize: '1.6667rem',
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {children}
      </Typography>
    </Div>
  )
}

export default function FichesBibliotheques({ title, ...rest }) {
  console.log('title:', title)
  const { children, ...props } = rest

  return (
    <GridOffset offset={1}>
      <Grid>{children}</Grid>
    </GridOffset>
  )
}
