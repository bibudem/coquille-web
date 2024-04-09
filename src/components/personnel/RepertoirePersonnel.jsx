import { useStaticQuery, graphql } from 'gatsby'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Chip, IconButton, Stack } from '@mui/material'
import { EmailRounded } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { frFR } from '@mui/x-data-grid/locales'
import tokens from '../../../plugins/gatsby-plugin-bib-theme/tokens'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'

const theme = createTheme(tokens, frFR)

const columns = [
  {
    field: 'nomComplet',
    headerName: 'Nom',
    valueGetter: (_, row) => `${row.prenom} ${row.nom}`,
    renderCell: ({ row, value }) => {
      console.log('row: %o', row)
      return (
        <Box>
          <GatsbyImage image={row.photo} alt={value} />
          <IconButton href={`mailto:${row.courriel}`} aria-label="courriel">
            <EmailRounded />
          </IconButton>
        </Box>
      )
    },
  },
  // {
  //   field: 'prenom',
  //   headerName: 'Prénom',
  // },
  // {
  //   field: 'nom',
  //   headerName: 'Nom',
  // },
  // {
  //   field: 'courriel',
  //   headerName: 'Courriel'
  // },
  // {
  //   field: 'fonction',
  //   headerName: 'Fonction',
  // },
  {
    field: 'disciplines',
    headerName: 'Disciplines',
    flex: 1,
    renderCell: ({ value }) => (
      <Box>
        {value.split('|').map((discipline) => (
          <Chip label={discipline} size="small" sx={{ mr: 0.5 }} />
        ))}
      </Box>
    ),
  },
  // {
  //   field: 'photo',
  //   headerName: 'Photo',
  // },
]

export default function RepertoirePersonnel() {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allFile(filter: { sourceInstanceName: { eq: "personnel" }, relativeDirectory: { eq: "photos" } }) {
        nodes {
          name
          extension
          ext
          childImageSharp {
            gatsbyImageData(width: 50, formats: WEBP)
          }
          sourceInstanceName
          id
          relativePath
          relativeDirectory
          root
          absolutePath
          base
          dir
        }
      }
      allListePersonnelXlsxSheet1 {
        nodes {
          id
          nom
          photo
          prenom
          fonction
          disciplines
          courriel
        }
      }
    }
  `)
  console.log('allFile: %o', data.allFile.nodes)
  const fallbackPicture = data.allFile.nodes.find((node) => node.name === '_profile').childImageSharp.gatsbyImageData
  const rows = data.allListePersonnelXlsxSheet1.nodes.map(({ courriel, disciplines, fonction, id, nom, photo, prenom }) => {
    console.log('photo: %s', photo)
    const photoId = photo.replace(/\.\w+$/, '')
    return {
      id,
      courriel,
      disciplines,
      fonction,
      nom,
      prenom,
      photo: data.allFile.nodes.find((node) => node.name === photoId)?.childImageSharp.gatsbyImageData ?? fallbackPicture,
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <DataGrid columns={columns} rows={rows} />
    </ThemeProvider>
  )
}
