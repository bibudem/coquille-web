import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { format } from 'date-fns'
import { frCA } from 'date-fns/locale'
import { List, ListItem, ListItemButton, Skeleton, styled, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { CalendarBlank, ClockCountdown } from '@phosphor-icons/react'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'
import { isInternalLink } from '@/utils/link'

const FETCH_TIMEOUT = 3_000

const Img = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: theme.shape.corner.medium,
  width: '15.8125rem',
  height: '10.5625rem',
  [theme.breakpoints.up('md')]: {
    width: '10.8125rem',
    height: '9.5625rem',
  },
  [theme.breakpoints.up('lg')]: {
    width: '15.8125rem',
    height: '10.5625rem',
  },
}))

function fetcher(...args) {
  return fetch(...args, { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
    .then((res) => res.text())
    .then((text) => {
      const parser = new DOMParser()
      const data = parser.parseFromString(text, 'text/xml')
      return data
    })
}

function Title({ children }) {
  return (
    <Div
      sx={{
        fontFamily: 'Lora',
        fontSize: '1.75rem',
        fontWeight: 500,
        lineHeight: 1.5,
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

function Lower({ children, url }) {
  const theme = useTheme()
  return (
    <Div
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '.00875rem',
        color: 'var(--_lower-color)',
      }}
    >
      <Div
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '.5em',
        }}
      >
        {/* <ClockCountdown size="1.25rem" color={theme.palette.bleuPrincipal.main} />
        {children} */}
      </Div>
      <Div
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
      >
        {isInternalLink(url) ? <ArrowRightCircleIcon color="var(--_lower-color)" fontSize={50} /> : <ArrowUpRightCircleIcon color="var(--_lower-color)" fontSize={50} />}
      </Div>
    </Div>
  )
}

function ListeEvenementsContainer({ title, moreText, moreLink, children, sx }) {
  return (
    <Grid container spacing="2.25rem" size={12} direction="column">
      <Typography component="h3" variant="h3">
        {title}
      </Typography>
      <Div
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
          transition: `color ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.emphasized}`,
          '*': {
            transition: `color ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.emphasized}`,
          },
          ...sx,
        })}
      >
        {children}
      </Div>
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
    </Grid>
  )
}

function ListeEvenementsItem({ imageVedette, upper, title, lower, url, ...rest }) {
  const { sx, ...props } = rest
  return (
    <ListItem {...props} alignItems="flex-start" disableGutters sx={{ ...sx }} {...props}>
      <ListItemButton component="a" href={url} disableGutters /* sx={{ '--bib-palette-action-hover': 'none' }} */>
        <Grid container spacing="1.5rem" sx={{ width: '100%' }}>
          <Grid size="auto">{imageVedette}</Grid>
          <Grid
            size="grow"
            container
            direction="column"
            spacing="1rem"
            sx={{
              justifyContent: 'flex-start',
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
 * Renders a list of événements fetched from a specified service
 *
 * @param {Object} props - Component properties
 * @param {string} [props.service='https://calendrier.umontreal.ca/activites/export.rss?tx_solr[filter][0]=organisateurs:les-bibliotheques'] - URL of the événements API
 * @param {number} [props.limit=4] - Maximum number of événements to display (between 1-500)
 * @param {string} [props.moreText='Voir plus de événements'] - Text for the "see more" button
 * @param {string} [props.moreLink] - Optional link to view more événements
 * @returns {React.ReactElement} A list of événements with optional "see more" button
 */
export default function ListeEvenements({ title = 'Événements', service = 'https://calendrier.umontreal.ca/activites/export.rss?tx_solr[filter][0]=organisateurs:les-bibliotheques', limit = 3, moreText = 'Tous nos événements', moreLink = 'https://calendrier.umontreal.ca/activites?organisateurs=les-bibliotheques' }) {
  if (typeof limit !== 'number') {
    throw new Error('The `limit` parameter must be a number')
  }

  if (typeof service !== 'string') {
    throw new Error('The `service` parameter must be a url')
  }

  try {
    new URL(service)
  } catch (e) {
    throw new Error('The `service` parameter must be a valid url')
  }

  if (typeof moreLink !== 'string') {
    throw new Error('The `moreLink` parameter must be a url')
  }

  try {
    new URL(moreLink)
  } catch (e) {
    throw new Error('The `moreLink` parameter must be a valid url')
  }

  const {
    data: rss,
    error,
    isValidating,
  } = useSWR(service, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })
  const theme = useTheme()
  const [events, setEvents] = useState(null)

  useEffect(() => {
    if (rss) {
      const index = new Set()

      setEvents(
        [...rss.querySelectorAll('item')]
          .filter((item, _) => {
            if (index.size === limit) {
              return false
            }

            const title = item.querySelector('title').textContent.trim()
            const pubDate = item.querySelector('pubDate').textContent.trim()

            const uid = `${title}:::${format(new Date(pubDate), 'H:mm')}`
            if (index.has(uid)) {
              return false
            }

            index.add(uid)

            return true
          })
          .map((item) => {
            const dateData = new Date(item.querySelector('pubDate').textContent.trim())
            const date = format(dateData, 'd MMMM yyyy', { locale: frCA })
            const debut = format(dateData, 'H:mm', { locale: frCA })
            const title = item.querySelector('title').textContent.trim()
            const url = item.querySelector('link').textContent.trim()
            const imageVedette = item.querySelector('enclosure').getAttribute('url').trim()

            return {
              title,
              url,
              imageVedette,
              date,
              debut,
            }
          })
      )
    }
  }, [rss])

  // Handles error and loading state
  if (error) return <>{error.message}</>

  if (isValidating)
    return (
      <ListeEvenementsContainer title={title} moreLink={moreLink} moreText={moreText}>
        <List>
          {Array(limit)
            .fill()
            .map((_, i) => (
              <ListeEvenementsItem
                key={i}
                imageVedette={
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: theme.shape.corner.small,
                      width: '15.8125rem',
                      height: '10.5625rem',
                      [theme.breakpoints.up('md')]: {
                        width: '10.8125rem',
                        height: '10.5625rem',
                      },
                      [theme.breakpoints.up('lg')]: {
                        width: '15.8125rem',
                        height: '10.5625rem',
                      },
                    }}
                  />
                }
                upper={<Skeleton sx={{ fontSize: '1.25rem' }} width={115} />}
                title={<Skeleton sx={{ fontSize: '2.1667rem' }} />}
                lower={<Skeleton sx={{ fontSize: '1.6667rem', lineHeight: 1.5 }} width={175} />}
              />
            ))}
        </List>
      </ListeEvenementsContainer>
    )

  return (
    events && (
      <ListeEvenementsContainer
        title={title}
        moreLink={moreLink}
        moreText={moreText}
        sx={{
          '--_title-color': theme.palette.bleuFonce.main,
          '--_lower-color': 'inherit',
        }}
      >
        <List sx={{ padding: 0 }}>
          {events.map(({ url, imageVedette, date, title, debut }, i) => (
            <ListeEvenementsItem
              key={i}
              url={url}
              imageVedette={<Img src={imageVedette} alt="" aria-hidden="true" />}
              upper={<Upper>{date}</Upper>}
              title={<Title>{title}</Title>}
              lower={<Lower url={url}>{debut}</Lower>}
              sx={{
                '&:hover': {
                  '--_title-color': theme.palette.bleuPrincipal.main,
                  '--_lower-color': theme.palette.bleuPrincipal.main,
                },
              }}
            />
          ))}
        </List>
      </ListeEvenementsContainer>
    )
  )
}
