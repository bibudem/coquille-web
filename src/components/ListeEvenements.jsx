import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { format } from 'date-fns'
import { frCA } from 'date-fns/locale'
import { Box, List, ListItem, ListItemButton, Skeleton, styled, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { CalendarBlankIcon } from '@phosphor-icons/react'
import Button from '@/components/Button'
import { isInternalLink } from '@/utils/link'
import { useSmall } from '@/hooks/use-small'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'

const FETCH_TIMEOUT = 3_000

const Img = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: theme.shape.corner.medium,
  width: '100%',
  maxWidth: '80vw',
  height: 'auto',
  aspectRatio: 2,
  [theme.breakpoints.up('md')]: {
    width: '100%',
    // height: '9.5625rem',
  },
  [theme.breakpoints.up('lg')]: {
    // width: '15.8125rem',
    // height: '10.5625rem',
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
    <Box
      sx={{
        fontFamily: 'Lora',
        fontSize: '1.75rem',
        fontWeight: 500,
        lineHeight: 1.5,
        color: 'var(--_title-color)',
      }}
    >
      {children}
    </Box>
  )
}

function Upper({ children }) {
  const theme = useTheme()
  return (
    <Box
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
      <CalendarBlankIcon size="1.25rem" color={theme.palette.rougeOrange.main} />
      {children}
    </Box>
  )
}

function Lower({ url }) {
  return (
    <Box
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '.5em',
        }}
      >
        {/* <ClockCountdownIcon size="1.25rem" color={theme.palette.bleuPrincipal.main} />
        {children} */}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
      >
        {isInternalLink(url) ? <ArrowRightCircleIcon color="var(--_lower-color)" fontSize={50} /> : <ArrowUpRightCircleIcon color="var(--_lower-color)" fontSize={50} />}
      </Box>
    </Box>
  )
}

function ListeEvenementsContainer({ title, id, moreText, moreLink, children, sx }) {
  return (
    <Grid container spacing="2.25rem" size={12} direction="column">
      <Typography
        component="h3"
        id={id}
        sx={{
          fontSize: '32px',
          fontWeight: 500,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      <Box
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
      </Box>
      {moreLink && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'flex-start',
              md: 'flex-end',
            },
          }}
        >
          <Button primary href={moreLink}>
            {moreText}
          </Button>
        </Box>
      )}
    </Grid>
  )
}

function ListeEvenementsItem({ imageVedette, upper, title, lower, url, ...rest }) {
  const { sx, ...props } = rest
  const isSmall = useSmall('lg')

  return (
    <ListItem {...props} alignItems="flex-start" disableGutters sx={{ ...sx }} {...props}>
      <ListItemButton component="a" href={url} disableGutters /* sx={{ '--bib-palette-action-hover': 'none' }} */>
        <Grid container spacing="1.5rem" sx={{ width: '100%' }} direction={{ xs: 'column', md: 'column' }}>
          {isSmall && <Grid>{upper}</Grid>}
          <Grid size="fill">{imageVedette}</Grid>
          <Grid
            size="grow"
            container
            direction="column"
            spacing="1rem"
            sx={{
              justifyContent: 'flex-start',
            }}
          >
            {!isSmall && <Grid>{upper}</Grid>}
            <Grid>{title}</Grid>
            <Grid>{lower}</Grid>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

const SERVICE_URL = 'https://calendrier.umontreal.ca/activites/export.rss?tx_solr[filter][0]=types:activites-culturelles&tx_solr[filter][1]=types:activites-de-reseautage&tx_solr[filter][2]=types:activites-dinformation&tx_solr[filter][3]=types:activites-philanthropiques&tx_solr[filter][4]=types:activites-sportives&tx_solr[filter][5]=types:ceremonies-officielles&tx_solr[filter][6]=types:concours&tx_solr[filter][7]=types:conferences-colloques&tx_solr[filter][8]=types:cours-seminaires&tx_solr[filter][9]=types:journees-thematiques&tx_solr[filter][10]=types:portes-ouvertes&tx_solr[filter][11]=types:soutenances-de-these&tx_solr[filter][12]=organisateurs:les-bibliotheques'
const MORE_LINK = 'https://calendrier.umontreal.ca/activites?organisateurs=les-bibliotheques'

/**
 * Affiche une liste d'événements récupérés depuis le Calendrier UdeM
 *
 * @param {Object} props - Propriétés du composant
 * @param {string} [props.title='Événements'] - Titre de la section d'événements
 * @param {string} [props.id] - Identifiant unique pour l'élément de titre
 * @param {string} [props.service='https://calendrier.umontreal.ca/activites/export.rss?tx_solr[filter][0]=types:activites-culturelles&tx_solr[filter][1]=types:activites-de-reseautage&tx_solr[filter][2]=types:activites-dinformation&tx_solr[filter][3]=types:activites-philanthropiques&tx_solr[filter][4]=types:activites-sportives&tx_solr[filter][5]=types:ceremonies-officielles&tx_solr[filter][6]=types:concours&tx_solr[filter][7]=types:conferences-colloques&tx_solr[filter][8]=types:cours-seminaires&tx_solr[filter][9]=types:journees-thematiques&tx_solr[filter][10]=types:portes-ouvertes&tx_solr[filter][11]=types:soutenances-de-these&tx_solr[filter][12]=organisateurs:les-bibliotheques'] - URL du service RSS des événements
 * @param {number} [props.limit=3] - Nombre maximum d'événements à afficher
 * @param {string} [props.moreText='Tous nos événements'] - Texte du bouton "voir plus"
 * @param {string} [props.moreLink='https://calendrier.umontreal.ca/activites?organisateurs=les-bibliotheques'] - Lien optionnel pour voir plus d'événements
 * @returns {React.ReactElement} Une liste d'événements avec un bouton optionnel "voir plus"
 */
export default function ListeEvenements({ title = 'Événements', id, service = SERVICE_URL, limit = 3, moreText = 'Tous nos événements', moreLink = MORE_LINK }) {
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
      <ListeEvenementsContainer title={title} id={id} moreLink={moreLink} moreText={moreText}>
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
        id={id}
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
