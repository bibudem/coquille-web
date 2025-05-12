import { useStaticQuery, graphql } from 'gatsby'
import { DataGrid } from '@mui/x-data-grid'
import { Avatar, Box, Chip, IconButton, Stack } from '@mui/material'
import { EmailRounded } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid2'
import { frFR } from '@mui/x-data-grid/locales'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import tokens from '../../../plugins/gatsby-plugin-bib-theme/tokens/tokens.js'

const theme = createTheme(tokens, frFR)

const columns = [
  {
    field: 'photo',
    headerName: '',
    width: 75,
    valueGetter: (_, row) => `${row.prenom} ${row.nom}`,
    renderCell: ({ row, value }) => {
      return (
        <Box>
          <Box
            sx={{
              borderRadius: '50%',
            }}
          >
            <GatsbyImage image={row.photo} alt={value} layout="constrained" aspectRatio={1} width={50} height={50} />
          </Box>
          <IconButton href={`mailto:${row.courriel}`} aria-label="courriel">
            <EmailRounded />
          </IconButton>
        </Box>
      )
    },
  },
  {
    field: 'nom',
    headerName: 'Nom',
    width: 150,
    valueGetter: (_, row) => `${row.prenom} ${row.nom}`,
    renderCell: ({ row, value }) => {
      return <Box>{`${row.prenom} ${row.nom}`}</Box>
    },
  },
  // {
  //   field: 'nom',
  //   headerName: 'Nom',
  // },
  {
    field: 'courriel',
    headerName: 'Courriel',
    width: 70,
    renderCell: ({ row, value }) => {
      return (
        <IconButton href={`mailto:${row.courriel}`} aria-label="courriel">
          <EmailRounded />
        </IconButton>
      )
    },
  },
  {
    field: 'fonction',
    headerName: 'Fonction',
    width: 110,
  },
  {
    field: 'disciplines',
    headerName: 'Disciplines',
    display: 'flex',
    flex: 1,
    renderCell: ({ value }) => (
      <Grid container gap={1} py={1}>
        {value.split('|').map((discipline) => (
          <Chip key={discipline} label={discipline} size="small" sx={{ mr: 0.5 }} />
        ))}
      </Grid>
    ),
  },
  // {
  //   field: 'photo',
  //   headerName: 'Photo',
  // },
]

export default function RepertoirePersonnel() {
  const data = useStaticQuery(graphql`
    query RepertoirePersonnelQuery {
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
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={75}
        autosizeOptions={{
          columns: ['fonction'],
          includeOutliers: true,
          includeHeaders: true,
        }}
      />
    </ThemeProvider>
  )
}
