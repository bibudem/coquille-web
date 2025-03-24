import { List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import useSWR from 'swr'
import Div from '@/components/utils/Div'
import { CalendarBlank, ClockCountdown, MapPinSimpleArea } from '@phosphor-icons/react'

function fetcher(...args) {
  return fetch(...args).then((res) => res.json())
}

function Title({ children }) {
  const theme = useTheme()
  return (
    <Div
      sx={{
        fontFamily: 'Lora',
        fontSize: '2rem',
        fontWeight: 500,
        color: theme.palette.bleuFonce.main,
      }}
    >
      {children}
    </Div>
  )
}

function Upper({ children }) {
  const theme = useTheme()
  return (
    <Div
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '.5em',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '.00875rem',
        color: theme.palette.rougeOrange.main,
      }}
    >
      <CalendarBlank size="1.25rem" color={theme.palette.rougeOrange.main} />
      {children}
    </Div>
  )
}

function Lower({ children, typeLocalisation, lieu }) {
  const theme = useTheme()
  return (
    <Div
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '.5em',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '.00875rem',
      }}
    >
      <ClockCountdown size="1.25rem" color={theme.palette.bleuPrincipal.main} />
      {children}
      {typeLocalisation === 'en-ligne' && (
        <>
          <MapPinSimpleArea size="1.25rem" color={theme.palette.bleuPrincipal.main} /> En ligne
        </>
      )}
      {typeLocalisation === 'physique' && (
        <>
          <MapPinSimpleArea size="1.25rem" color="red" /> {lieu ?? 'En présentiel'}
        </>
      )}
    </Div>
  )
}

export default function ListeFormations({ limit = 15 }) {
  const { data, error, isValidating } = useSWR(`http://localhost:3000/?limit=${limit}`, fetcher)
  const theme = useTheme()

  // Handles error and loading state
  if (error) return <div className="failed">failed to load</div>
  if (isValidating) return <div className="Loading">Loading...</div>

  console.log('data:', data)

  return (
    <List>
      {data.map(({ url, imageVedette, date, titre, typeLocalisation, lieu, debut, fin }, i) => (
        <ListItem key={i} alignItems="flex-start">
          <ListItemButton component="a" href={url}>
            <Grid container spacing={2}>
              <Grid size="auto">
                <img
                  src={imageVedette}
                  alt=""
                  style={{
                    borderRadius: theme.shape.corner.small,
                    width: 120,
                    height: 120,
                  }}
                />
              </Grid>
              <Grid container direction="column">
                <Grid>
                  <Upper>{date}</Upper>
                </Grid>
                <Grid>
                  <Title>{titre}</Title>
                </Grid>
                <Grid>
                  <Lower typeLocalisation={typeLocalisation} lieu={lieu}>
                    {debut} à {fin}
                  </Lower>
                </Grid>
              </Grid>
            </Grid>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
