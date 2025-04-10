import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ClockCountdown } from '@phosphor-icons/react'
import GridOffset from '@/components/utils/GridOffset'
import LayoutGrid from '@/components/utils/LayoutGrid'
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
  const bibliotheques = useStaticQuery(graphql`
    query FichesBibliotheques {
      allFile(filter: { sourceInstanceName: { eq: "bibliotheques" }, childMdx: { internal: { type: { eq: "Mdx" } } } }, sort: { childMdx: { frontmatter: { title: ASC } } }) {
        nodes {
          absolutePath
          childMdx {
            frontmatter {
              code
              title
            }
            internal {
              type
            }
            body
          }
        }
      }
    }
  `).allFile.nodes
  console.log('bibliotheques:', bibliotheques)
  return (
    <GridOffset offset={1}>
      <Grid>
        {bibliotheques?.map(
          ({
            childMdx: {
              frontmatter: { title, code },
              body,
            },
            absolutePath,
          }) => {
            console.log('body:', typeof body)
            return <Div key={absolutePath}>{body && <MDXRenderer>{'<Alert>allo</Alert>'}</MDXRenderer>}</Div>
          }
        )}
      </Grid>
    </GridOffset>
  )
}
