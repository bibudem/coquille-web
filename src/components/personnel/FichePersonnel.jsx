import { useStaticQuery, graphql } from 'gatsby'
import { Box, Button, Card, CardActions, CardContent, Typography, Autocomplete, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useState } from 'react'

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
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const data = useStaticQuery(graphql`
    query ListePersonnelQuery {
      allFile(filter: { sourceInstanceName: { eq: "personnel" }, relativeDirectory: { eq: "photos" } }) {
        nodes {
          name
          extension
          ext
          thumb: childImageSharp {
            gatsbyImageData(width: 60, height: 60, formats: WEBP, placeholder: BLURRED, transformOptions: { cropFocus: ENTROPY })
          }
          photo: childImageSharp {
            gatsbyImageData(width: 150, formats: WEBP, placeholder: BLURRED)
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
          direction
          disciplines
          courriel
        }
      }
    }
  `)

  const disciplinesMap = new Map()
  const fallbackPicturesFile = data.allFile.nodes.find((node) => node.name === '_profile')

  data.allListePersonnelXlsxSheet1.nodes.forEach(({ courriel, disciplines, fonction, nom, photo: photoId, prenom }) => {
    disciplines = disciplines?.split(/\s*\|\s*/) ?? []

    photoId = photoId?.replace(/\.\w+$/, '')
    const file = data.allFile.nodes.find((node) => node.name === photoId) || fallbackPicturesFile
    const photo = getImage(file.photo)
    const thumb = getImage(file.thumb)

    disciplines.forEach((discipline) => {
      if (!disciplinesMap.has(discipline)) {
        disciplinesMap.set(discipline, [])
      }

      disciplinesMap.get(discipline).push({ id: `${discipline}#${courriel}`, courriel, discipline, disciplines, fonction, nom, nomComplet: `${prenom} ${nom}`, photo, thumb, prenom })
    })
  })

  const personnelByDiscipline = [...disciplinesMap.values()].flat().sort(disciplinesSort)

  function onAutocompleteChange(event, newValue) {
    setInputValue(newValue)
  }

  return (
    <Box width={{ xs: '100%', md: 400 }} mx="auto" my={5}>
      {process.env.JSDELIVR_SERVICE_URL}
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={onAutocompleteChange}
        options={personnelByDiscipline}
        getOptionLabel={(option) => option.discipline}
        getOptionKey={(option) => {
          return option.id
        }}
        isOptionEqualToValue={(option, value) => {
          return option.discipline === value.discipline
        }}
        renderInput={(params) => <TextField {...params} label="Cherchez une discipline..." fullWidth sx={{ mb: 2 }} />}
        renderOption={(props, { nomComplet, discipline, thumb, ...rest } = option) => {
          console.log('rest: ', rest)
          return (
            <li {...props}>
              <Grid container gap={2} alignItems="center" flexWrap="nowrap">
                <Grid item sx={{ display: 'flex' }}>
                  <GatsbyImage image={getImage(thumb)} alt={nomComplet} />
                </Grid>
                <Grid item sx={{ wordWrap: 'break-word' }}>
                  <Typography variant="body">{nomComplet}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {discipline}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          )
        }}
      />
      {value && (
        <Card>
          <CardContent>
            <Box mb={2} sx={{ display: 'flex', flex: '1 0 auto' }}>
              <Grid container gap={2}>
                <Grid sx={{ width: 100, height: 150 }}>
                  <GatsbyImage image={value.photo} alt={value.nomComplet} />
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography component="div" variant="h5">
                    {value.nomComplet}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ textTransform: 'uppercase' }}>
                    {value.fonction}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div" mt={1}>
                    {value.disciplines.map((discipline, index) => {
                      const sep = index ? <>, </> : null
                      const node =
                        discipline === value.discipline ? (
                          <span key={index}>
                            <strong>{discipline}</strong>
                          </span>
                        ) : (
                          <span key={index}>{discipline}</span>
                        )
                      return (
                        <>
                          {sep}
                          {node}
                        </>
                      )
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Typography variant="body2">{`Integer consectetur lectus diam, sed pulvinar ante efficitur eu. Curabitur quis felis et erat eleifend eleifend in eu nisi. Nulla gravida turpis congue, luctus ac gravida pellentesque, vehicula id quam.`}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button>Action secondaire</Button>
            <Button variant="contained" disableElevation href={`https://teams.microsoft.com/l/chat/0/0?users=${value.courriel}`} target="_blank" rel="noopener noreferrer">
              Textez-moi!
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  )
}
