import { List, ListItem, ListItemButton, Skeleton, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import useSWR from 'swr'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import { CalendarBlank, ClockCountdown, MapPinSimpleArea } from '@phosphor-icons/react'

const FETCH_TIMEOUT = 2000

function fetcher(...args) {
  return fetch(...args, { signal: AbortSignal.timeout(FETCH_TIMEOUT) }).then((res) => res.json())
}

function Title({ children }) {
  return (
    <Div
      sx={{
        fontFamily: 'Lora',
        fontSize: '2rem',
        fontWeight: 500,
        lineHeight: 1.2,
        color: 'var(--_title-color)',
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
        lineHeight: 1,
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
        lineHeight: 1,
        letterSpacing: '.00875rem',
        color: 'var(--_lower-color)',
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

function ListeFormationsContainer({ children, sx }) {
  return (
    <Div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
        ...sx,
      }}
    >
      {children}
    </Div>
  )
}

function ListeFormationsItem({ imageVedette, upper, title, lower, url, ...props }) {
  return (
    <ListItem {...props} alignItems="flex-start" disableGutters>
      <ListItemButton component="a" href={url}>
        <Grid container spacing={1.5} sx={{ width: '100%' }}>
          <Grid size="auto">{imageVedette}</Grid>
          <Grid
            size="grow"
            container
            direction="column"
            spacing={0}
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Grid>{upper}</Grid>
            <Grid>{title}</Grid>
            <Grid>{lower}</Grid>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

/**
 * Renders a list of formations fetched from a specified service
 *
 * @param {Object} props - Component properties
 * @param {string} [props.service='https://api.bib.umontreal.ca/formations/'] - URL of the formations API
 * @param {number} [props.limit=4] - Maximum number of formations to display (between 1-500)
 * @param {string} [props.moreText='Voir plus de formations'] - Text for the "see more" button
 * @param {string} [props.moreLink] - Optional link to view more formations
 * @returns {React.ReactElement} A list of formations with optional "see more" button
 */
export default function ListeFormations({ service = 'https://api.bib.umontreal.ca/formations/', limit = 4, moreText = 'Voir plus de formations', moreLink, ...props }) {
  if (typeof limit !== 'number') {
    throw new Error('The `limit` parameter must be a number')
  }

  if (limit < 1 || limit > 500) {
    throw new Error('The `limit` parameter must be between 1 and 500')
  }

  if (typeof service !== 'string') {
    throw new Error('The `service` parameter must be a url')
  }

  try {
    new URL(service)
  } catch (e) {
    throw new Error('The `service` parameter must be a valid url')
  }

  const { data, error, isValidating } = useSWR(`${service}?limit=${limit}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })
  const theme = useTheme()

  // Handles error and loading state
  if (error) return <></>

  if (isValidating)
    return (
      <ListeFormationsContainer>
        <List>
          {Array(limit)
            .fill()
            .map((_, i) => (
              <ListeFormationsItem key={i} imageVedette={<Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: theme.shape.corner.small }} />} upper={<Skeleton sx={{ fontSize: '0.875rem', lineHeight: 1.2 }} width={115} />} title={<Skeleton sx={{ fontSize: '2rem' }} />} lower={<Skeleton sx={{ fontSize: '0.875rem', lineHeight: 1.2 }} width={175} />} />
            ))}
        </List>
      </ListeFormationsContainer>
    )

  return (
    <ListeFormationsContainer
      sx={{
        '--_title-color': theme.palette.bleuFonce.main,
        '--_lower-color': 'inherit',
      }}
    >
      <List>
        {data.map(({ url, imageVedette, date, titre, typeLocalisation, lieu, debut, fin }, i) => (
          <ListeFormationsItem
            key={i}
            url={url}
            imageVedette={
              <img
                src={imageVedette}
                alt=""
                style={{
                  borderRadius: theme.shape.corner.small,
                  width: 120,
                  height: 120,
                }}
              />
            }
            upper={<Upper>{date}</Upper>}
            title={<Title>{titre}</Title>}
            lower={
              <Lower typeLocalisation={typeLocalisation} lieu={lieu}>
                {debut} à {fin}
              </Lower>
            }
            sx={{
              '&:hover': {
                '--_title-color': theme.palette.bleuPrincipal.main,
                '--_lower-color': theme.palette.bleuPrincipal.main,
              },
            }}
          />
        ))}
      </List>
      {moreLink && (
        <Div
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button primary href={moreLink}>
            {moreText}
          </Button>
        </Div>
      )}
    </ListeFormationsContainer>
  )
}
