import { useStaticQuery, graphql } from 'gatsby'
import { Box, Chip, Grid, Typography, IconButton, Stack, Autocomplete, TextField } from '@mui/material'
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

function disciplinesSort(a, b) {
  const nameA = a.discipline.toUpperCase() // ignore upper and lowercase
  const nameB = b.discipline.toUpperCase() // ignore upper and lowercase
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  // names must be equal
  return 0
}

export default function ListePersonnel() {
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
  const disciplinesMap = new Map()
  const fallbackPicture = data.allFile.nodes.find((node) => node.name === '_profile').childImageSharp.gatsbyImageData

  data.allListePersonnelXlsxSheet1.nodes.forEach(({ courriel, disciplines, fonction, id, nom, photo, prenom }) => {
    const _disciplines = disciplines.split(/\s*\|\s*/)

    const photoId = photo.replace(/\.\w+$/, '')
    const photoData = data.allFile.nodes.find((node) => node.name === photoId)?.childImageSharp.gatsbyImageData ?? fallbackPicture

    _disciplines.forEach((discipline) => {
      if (!disciplinesMap.has(discipline)) {
        disciplinesMap.set(discipline, [])
      }

      disciplinesMap.get(discipline).push({ courriel, discipline, fonction, nom, photo: photoData, prenom })
    })
  })

  const personnelByDiscipline = [...disciplinesMap.values()].flat().sort(disciplinesSort)

  return (
    <Autocomplete
      options={personnelByDiscipline}
      getOptionLabel={(option) => option.discipline}
      renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                {/* <LocationOnIcon sx={{ color: 'text.secondary' }} /> */}awef
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box key={index} component="span" sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
