import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { format, isValid } from 'date-fns'
import { frCA } from 'date-fns/locale'
import { Box, Divider, List, ListItem, ListItemButton, Skeleton, styled, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { CalendarBlankIcon } from '@phosphor-icons/react'
import Button from '@/components/Button'
import { isInternalLink } from '@/utils/link'
import { useSmall } from '@/hooks/use-small'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'

const FETCH_TIMEOUT = 3_000
const FALLBACK_IMAGE = '/images/fallback.jpg'

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
  },
}))

function fetcher(...args) {
  return fetch(...args, { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Erreur HTTP! statut: ${res.status}`)
      }
      const text = await res.text()
      const parser = new DOMParser()
      const data = parser.parseFromString(text, 'text/xml')
      
      const errorNode = data.querySelector('parsererror')
      if (errorNode) {
        throw new Error('Erreur de parsing du XML: ' + errorNode.textContent)
      }
      
      /*if (!data.querySelector('channel') || !data.querySelector('item')) {
        throw new Error('Structure RSS invalide')
      }*/
     if (!data.querySelector('channel')) {
        throw new Error('Structure RSS invalide')
      }
      
      return data
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du flux RSS:', error)
      throw error
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
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
      >
        {isInternalLink(url) ? 
          <ArrowRightCircleIcon color="var(--_lower-color)" fontSize={50} /> : 
          <ArrowUpRightCircleIcon color="var(--_lower-color)" fontSize={50} />
        }
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
          <Button primary href={moreLink} target="_blank" rel="noopener noreferrer">
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
    <>
      <ListItem {...props} alignItems="flex-start" disableGutters sx={{ ...sx }}>
        <ListItemButton 
          component="a" 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          disableGutters 
          sx={{ '--bib-palette-action-hover': 'none' }}
        >
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
      <Divider component="li" aria-hidden="true" sx={{ borderColor: 'bleu200.main', margin: '0' }} />
    </>
  )
}

const SERVICE_URL = 'https://calendrier.umontreal.ca/activites/export.rss?tx_solr[filter][0]=types:activites-culturelles&tx_solr[filter][1]=types:activites-de-reseautage&tx_solr[filter][2]=types:activites-dinformation&tx_solr[filter][3]=types:activites-philanthropiques&tx_solr[filter][4]=types:activites-sportives&tx_solr[filter][5]=types:ceremonies-officielles&tx_solr[filter][6]=types:concours&tx_solr[filter][7]=types:conferences-colloques&tx_solr[filter][8]=types:cours-seminaires&tx_solr[filter][9]=types:journees-thematiques&tx_solr[filter][10]=types:portes-ouvertes&tx_solr[filter][11]=types:soutenances-de-these&tx_solr[filter][12]=organisateurs:les-bibliotheques'
const MORE_LINK = 'https://calendrier.umontreal.ca/activites?organisateurs=les-bibliotheques'

export default function ListeEvenements({ 
  title = 'Événements', 
  id, 
  service = SERVICE_URL, 
  limit = 3, 
  moreText = 'Tous nos événements', 
  moreLink = MORE_LINK 
}) {
  // Validation des props avec valeurs par défaut
  const validatedLimit = typeof limit === 'number' && limit > 0 ? limit : 3
  
  let validatedService = SERVICE_URL
  try {
    validatedService = typeof service === 'string' ? new URL(service).toString() : SERVICE_URL
  } catch (e) {
    console.error('URL de service invalide, utilisation de la valeur par défaut', e)
  }

  let validatedMoreLink = MORE_LINK
  try {
    validatedMoreLink = typeof moreLink === 'string' ? new URL(moreLink).toString() : MORE_LINK
  } catch (e) {
    console.error('URL moreLink invalide, utilisation de la valeur par défaut', e)
  }

  const { 
    data: rss, 
    error, 
    isValidating,
    mutate
  } = useSWR(validatedService, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: true,
    retryCount: 2
  })

  const theme = useTheme()
  const [events, setEvents] = useState(null)
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (eventIndex) => {
    setImageErrors(prev => ({ ...prev, [eventIndex]: true }))
  }

  useEffect(() => {
    if (rss) {
      try {
        const index = new Set()
        const items = rss.querySelectorAll('item')

        if (items.length === 0) {
          setEvents([])
          return
        }

        const filteredEvents = Array.from(items)
          .filter(item => {
            try {
              const titleElement = item.querySelector('title')
              const title = titleElement?.textContent?.trim()
              if (!title) return false

              const pubDateElement = item.querySelector('pubDate')
              const pubDateText = pubDateElement?.textContent?.trim()
              if (!pubDateText) return false

              const dateData = new Date(pubDateText)
              if (!isValid(dateData)) return false

              if (index.size >= validatedLimit) return false

              const uid = `${title}:::${format(dateData, 'H:mm')}`
              if (index.has(uid)) return false
              index.add(uid)

              return true
            } catch (error) {
              console.error('Erreur lors du filtrage des événements:', error)
              return false
            }
          })
          .slice(0, validatedLimit)
          .map((item, idx) => {
            try {
              const titleElement = item.querySelector('title')
              const title = titleElement?.textContent?.trim() || ''

              const pubDateElement = item.querySelector('pubDate')
              const pubDateText = pubDateElement?.textContent?.trim()
              const dateData = pubDateText ? new Date(pubDateText) : new Date()

              const date = isValid(dateData) ? 
                format(dateData, 'd MMMM yyyy', { locale: frCA }) : 
                ''
              
              const debut = isValid(dateData) ? 
                format(dateData, 'H:mm', { locale: frCA }) : 
                ''

              const linkElement = item.querySelector('link')
              const url = linkElement?.textContent?.trim() || '#'

              const enclosureElement = item.querySelector('enclosure')
              let imageVedette = enclosureElement?.getAttribute('url')?.trim() || FALLBACK_IMAGE

              if (imageErrors[idx]) {
                imageVedette = FALLBACK_IMAGE
              }

              return {
                title,
                url,
                imageVedette,
                date,
                debut,
              }
            } catch (error) {
              console.error('Erreur lors du mapping des événements:', error)
              return {
                title: '',
                url: '#',
                imageVedette: FALLBACK_IMAGE,
                date: '',
                debut: '',
              }
            }
          })

        setEvents(filteredEvents)
      } catch (error) {
        console.error('Erreur lors du traitement du flux RSS:', error)
        setEvents([])
      }
    }
  }, [rss, validatedLimit, imageErrors])

  if (error) {
    return (
      <ListeEvenementsContainer title={title} id={id}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography color="error">
            Erreur lors du chargement des événements: {error.message}
          </Typography>
          <Button onClick={() => mutate()} sx={{ alignSelf: 'flex-start' }}>
            Réessayer
          </Button>
        </Box>
      </ListeEvenementsContainer>
    )
  }

  if (isValidating) {
    return (
      <ListeEvenementsContainer title={title} id={id} moreLink={validatedMoreLink} moreText={moreText}>
        <List>
          {Array(validatedLimit).fill().map((_, i) => (
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
  }

  return (
    <ListeEvenementsContainer
      title={title}
      id={id}
      moreLink={validatedMoreLink}
      moreText={moreText}
      sx={{
        '--_title-color': theme.palette.bleuFonce.main,
        '--_lower-color': theme.palette.bleuPrincipal.main,
      }}
    >
      {events?.length ? (
        <List sx={{ padding: 0 }}>
          {events.map(({ url, imageVedette, date, title, debut }, i) => (
            <ListeEvenementsItem
              key={i}
              url={url}
              imageVedette={
                <Img 
                  src={imageErrors[i] ? FALLBACK_IMAGE : imageVedette} 
                  alt="" 
                  aria-hidden="true"
                  onError={() => handleImageError(i)}
                />
              }
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
      ) : (
        <Typography>Aucun événement à afficher pour le moment</Typography>
      )}
    </ListeEvenementsContainer>
  )
}