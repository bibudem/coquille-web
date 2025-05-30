import { useState, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Avatar, Link, TextField, MenuItem, Pagination
} from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Search } from '@mui/icons-material'
import { EnvelopeSimple, ChatsCircle, Phone } from '@phosphor-icons/react'
import InputAdornment from '@mui/material/InputAdornment'
import { GatsbyImage } from 'gatsby-plugin-image'
import tokens from '../../../plugins/gatsby-plugin-bib-theme/tokens/tokens.js'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { frFR } from '@mui/x-data-grid/locales'

const theme = createTheme(tokens, frFR)
const ITEMS_PER_PAGE = 8

function ucfirst(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function RepertoirePersonnel() {
  const data = useStaticQuery(graphql`
    query RepertoirePersonnelQuery {
      allFile(filter: { sourceInstanceName: { eq: "personnel" }, relativeDirectory: { eq: "photos" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 400, height: 400, formats: WEBP)
          }
        }
      }
      allListePersonnelXlsxSheet1 {
        nodes {
          id
          nom
          prenom
          fonction
          disciplines
          courriel
          telephone
          teams
          photo
          bibliotheque
        }
      }
    }
  `)

  const fallbackPicture = data.allFile.nodes.find(node => node.name === '_profile').childImageSharp.gatsbyImageData

  const rawRows = data.allListePersonnelXlsxSheet1.nodes.map((person) => {
    const photoId = person.photo?.replace(/\.\w+$/, '')
    const photo = data.allFile.nodes.find(node => node.name === photoId)?.childImageSharp.gatsbyImageData ?? fallbackPicture
    return { ...person, photo }
  })

  const allDisciplines = Array.from(new Set(
    rawRows.flatMap(person => (person.disciplines || '').split('|').map(d => d.trim()).filter(Boolean))
  )).sort()

  const [search, setSearch] = useState('')
  const [disciplineFilter, setDisciplineFilter] = useState('')
  const [page, setPage] = useState(1)

  const filteredRows = useMemo(() => {
    const keyword = search.toLowerCase()
    return rawRows.filter(person => {
      const matchSearch =
        person.nom.toLowerCase().includes(keyword) ||
        person.prenom.toLowerCase().includes(keyword) ||
        person.fonction.toLowerCase().includes(keyword)
      const matchDiscipline = !disciplineFilter || (person.disciplines || '').includes(disciplineFilter)
      return matchSearch && matchDiscipline
    })
  }, [search, disciplineFilter, rawRows])

  const paginatedRows = filteredRows.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            placeholder="Chercher par nom ou prénom"
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            sx={{
              height: '45px',
              alignItems: 'center',
              gap: '12px',
              borderRadius: '16px',
              ml: { xs: 0, md: '20%' },
              border: '1px solid #666666',
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              },
              '& fieldset': {
                border: 'none',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            placeholder="Bibliothèque ou Direction"
            variant="outlined"
            size="small"
            fullWidth
            value={disciplineFilter}
            onChange={(e) => {
              setDisciplineFilter(e.target.value)
              setPage(1)
            }}
            sx={{
              height: '45px',
              ml: { xs: 0, md: '10px' },
              alignItems: 'center',
              gap: '12px',
              borderRadius: '16px',
              border: '1px solid #666666',
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              },
              '& fieldset': {
                border: 'none',
              },
            }}
          >
            <MenuItem value="">Toutes les disciplines</MenuItem>
            {allDisciplines.map((d) => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack spacing={3}>
          {paginatedRows.map(person => (
            <Box
              key={person.id}
              sx={{
                padding: '2rem',
                marginTop: '1rem',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                boxShadow: 1,
              }}
            >
              {/* Ligne image + nom/prénom */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <Avatar sx={{ width: 100, height: 100 }}>
                  <GatsbyImage image={person.photo} alt={`${person.prenom} ${person.nom}`} style={{ width: '100%', height: '100%' }} />
                </Avatar>
                <Typography
                  sx={{
                    padding: '2rem',
                    fontWeight: '600',
                  }}
                  variant="h5"
                >
                  {person.prenom} {person.nom}
                </Typography>
              </Stack>

              {/* Ligne à 3 colonnes */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4} xl={4}>
                  <Typography
                    component="h6"
                    sx={{
                      marginTop:'0.5rem',
                      marginBottom: '0.75rem',
                      fontWeight: '600',
                    }}
                  >
                    {ucfirst(person.fonction)}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      marginRight:'0.5rem',
                    }}
                  >
                    {(person.disciplines || '').split('|').join(', ')}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4} xl={4}>
                  <Stack spacing={2}>
                    {person.telephone && (
                      <Link
                        href={`tel:${person.telephone}`}
                        underline="hover"
                        variant="carteProfilLink"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Phone size={20} color="#0057AC" style={{ marginRight: 8 }} />
                        {person.telephone}
                      </Link>
                    )}

                    {person.courriel && (
                      <Link
                        href={`mailto:${person.courriel}`}
                        underline="hover"
                        variant="carteProfilLink"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <EnvelopeSimple size={20} color="#0057AC" style={{ marginRight: 8 }} />
                        {person.courriel}
                      </Link>
                    )}

                    {person.teams && (
                      <Link
                        href={person.teams}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        variant="carteProfilLink"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Box
                          component="img"
                          src="/images/teams-logo.svg"
                          alt="Microsoft Teams"
                          sx={{ width: 20, height: 20 }}
                          style={{ marginRight: 8 }}
                        />
                        Discussion Teams
                      </Link>
                    )}
                  </Stack>
                </Grid>


                <Grid item xs={12} md={4} xl={4}>
                  {person.bibliotheque
                    ?.split(';')
                    .map((nom, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                      >
                        {ucfirst(nom.trim())}
                      </Typography>
                    ))}
                </Grid>

              </Grid>
            </Box>
          ))}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredRows.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            sx={{ marginTop: '4rem' }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
