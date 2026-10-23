import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { format } from 'date-fns/format'
import { isValid } from 'date-fns/isValid'
import { frCA } from 'date-fns/locale/fr-CA'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid2'
import { CalendarBlankIcon } from '@phosphor-icons/react/dist/csr/CalendarBlank'
import Button from '@/components/Button'
import { isInternalLink } from '@/utils/link'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'
import { ITEM_HEIGHT, ITEM_GAP, ITEM_PADDING_TOP, ITEM_PADDING_BOTTOM, clampLines } from '@/utils/quoi-de-neuf'

// Le flux du calendrier UdeM met 2 à 3 s à répondre (100 événements, aucun
// cache côté serveur) : avec 3 s, il expirait souvent sur un réseau lent.
// On laisse donc 10 s par tentative, et une seconde tentative en cas d'échec.
const FETCH_TIMEOUT = 10_000
const FETCH_ATTEMPTS = 2
const FALLBACK_IMAGE = '/images/fallback.jpg'
// Vignette carrée : la section Quoi de neuf partage la largeur en trois colonnes.
const IMG_SIZE = '5.5rem'

const Img = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: theme.shape.corner.medium,
  display: 'block',
  width: IMG_SIZE,
  height: IMG_SIZE,
}))

function fetchRss(url) {
  return fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
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
      
     /*Éviter l'erreur lorsque le flux RSS est vide*/
     if (!data.querySelector('channel')) {
        throw new Error('Structure RSS invalide')
      }
      
      return data
    })
}

// Les nouvelles tentatives se font ici plutôt qu'avec celles de SWR : SWR
// expose l'erreur dès le premier échec (et attend 5 s avant de réessayer),
// alors qu'on veut garder le squelette de chargement jusqu'au bout.
async function fetcher(url) {
  for (let tentative = 1; ; tentative++) {
    try {
      return await fetchRss(url)
    } catch (error) {
      console.error(`Erreur lors de la récupération du flux RSS (tentative ${tentative}/${FETCH_ATTEMPTS}) :`, error)
      if (tentative >= FETCH_ATTEMPTS) throw error
    }
  }
}

function Title({ children }) {
  return (
    <Box
      sx={(theme) => ({
        // Même taille que les titres des nouvelles (body1)
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body1.lineHeight,
        color: 'var(--_title-color)',
        // Laisse la place à la flèche, ancrée en bas à droite de l'élément
        paddingRight: '2.75rem',
        ...clampLines(),
      })}
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
        minHeight: '1.25rem',
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
        position: 'absolute',
        right: 0,
        bottom: '1rem',
        display: 'flex',
        color: 'var(--_lower-color)',
      }}
    >
      {isInternalLink(url) ? 
        <ArrowRightCircleIcon color="var(--_lower-color)" fontSize={36} /> : 
        <ArrowUpRightCircleIcon color="var(--_lower-color)" fontSize={36} />
      }
    </Box>
  )
}

// Même structure que les colonnes Nouvelles et Revue de presse de la section
// Quoi de neuf : en-tête, liste qui occupe la hauteur libre, bouton en bas,
// pour que les trois colonnes restent alignées.
function ListeEvenementsContainer({ title, id, moreText, moreLink, children, sx }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', height: '100%' }}>
      <Typography
        component="h3"
        id={id}
        sx={{
          fontSize: '1.75rem',
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
          flexGrow: 1,
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
          <Button secondary href={moreLink} target="_blank" rel="noopener noreferrer">
            {moreText}
          </Button>
        </Box>
      )}
    </Box>
  )
}

function ListeEvenementsItem({ imageVedette, upper, title, lower, url, ...rest }) {
  const { sx, ...props } = rest

  return (
    <>
      <ListItem
        {...props}
        alignItems="flex-start"
        disableGutters
        disablePadding
        sx={(theme) => ({
          height: ITEM_HEIGHT,
          boxSizing: 'border-box',
          borderBottom: `1px solid ${theme.palette.bleu200.main}`,
          ...sx,
        })}
      >
        <ListItemButton 
          component="a" 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          disableGutters 
          sx={{ '--bib-palette-action-hover': 'none', paddingBlock: 0, height: '100%', alignItems: 'flex-start' }}
        >
          <Grid container spacing="1rem" wrap="nowrap" sx={{ width: '100%', paddingTop: ITEM_PADDING_TOP, paddingBottom: ITEM_PADDING_BOTTOM }}>
            <Grid>{imageVedette}</Grid>
            <Grid
              size="grow"
              container
              direction="column"
              spacing=".5rem"
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
    shouldRetryOnError: false,
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

  // Message pour les visiteurs ; le détail technique reste dans la console.
  // Le bouton « Tous nos événements » reste affiché : le calendrier, lui,
  // est sans doute accessible.
  if (error && !isValidating) {
    return (
      <ListeEvenementsContainer title={title} id={id} moreLink={validatedMoreLink} moreText={moreText}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
          <Typography>Les événements ne sont pas disponibles pour le moment.</Typography>
          <Button secondary onClick={() => mutate()}>
            Réessayer
          </Button>
        </Box>
      </ListeEvenementsContainer>
    )
  }

  if (isValidating) {
    return (
      <ListeEvenementsContainer title={title} id={id} moreLink={validatedMoreLink} moreText={moreText}>
        <List sx={{ padding: 0, display: 'flex', flexDirection: 'column', gap: ITEM_GAP }}>
          {Array(validatedLimit).fill().map((_, i) => (
            <ListeEvenementsItem
              key={i}
              imageVedette={
                <Skeleton
                  variant="rectangular"
                  sx={{
                    borderRadius: theme.shape.corner.small,
                    width: IMG_SIZE,
                    height: IMG_SIZE,
                  }}
                />
              }
              upper={<Skeleton sx={{ fontSize: '1.25rem' }} width={115} />}
              title={<Skeleton sx={{ fontSize: '1.25rem' }} />}
              lower={null}
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
        <List sx={{ padding: 0, display: 'flex', flexDirection: 'column', gap: ITEM_GAP }}>
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