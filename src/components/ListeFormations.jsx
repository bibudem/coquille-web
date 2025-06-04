import { Box, List, ListItem, ListItemButton, Skeleton, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import useSWR from 'swr'
import Button from '@/components/Button'
import { CalendarBlankIcon, ClockCountdownIcon, MapPinSimpleAreaIcon } from '@phosphor-icons/react'

const FETCH_TIMEOUT = 2000

function fetcher(...args) {
  return fetch(...args, { signal: AbortSignal.timeout(FETCH_TIMEOUT) }).then((res) => res.json())
}

function Title({ children }) {
  return (
    <Box
      sx={{
        fontFamily: 'Lora',
        fontSize: '2rem',
        fontWeight: 500,
        lineHeight: 1.2,
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

function Lower({ children, typeLocalisation, lieu }) {
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
        color: 'var(--_lower-color)',
      }}
    >
      <ClockCountdownIcon size="1.25rem" color={theme.palette.bleuPrincipal.main} />
      {children}
      {typeLocalisation === 'en-ligne' && (
        <>
          <MapPinSimpleAreaIcon size="1.25rem" color={theme.palette.bleuPrincipal.main} /> En ligne
        </>
      )}
      {typeLocalisation === 'physique' && (
        <>
          <MapPinSimpleAreaIcon size="1.25rem" color="red" /> {lieu ?? 'En présentiel'}
        </>
      )}
    </Box>
  )
}

function ListeFormationsContainer({ children, sx }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
        ...sx,
      }}
    >
      {children}
    </Box>
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
 * Composant qui affiche une liste d'événements récupérés depuis un flux RSS
 *
 * Ce composant récupère les données d'événements depuis un service RSS,
 * les formate et les affiche dans une liste avec images, dates et titres.
 * Il gère automatiquement les états de chargement et d'erreur.
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} [props.title='Événements'] - Le titre affiché en en-tête de la liste
 * @param {string} [props.id] - L'identifiant HTML unique pour l'élément de titre (pour l'accessibilité)
 * @param {string} [props.service='https://calendrier.umontreal.ca/activites/export.rss?tx_solr[filter][0]=organisateurs:les-bibliotheques'] - L'URL du flux RSS des événements
 * @param {number} [props.limit=3] - Le nombre maximum d'événements à afficher (doit être un nombre entre 1 et 500)
 * @param {string} [props.moreText='Tous nos événements'] - Le texte affiché sur le bouton "voir plus"
 * @param {string} [props.moreLink='https://calendrier.umontreal.ca/activites?organisateurs=les-bibliotheques'] - L'URL vers laquelle redirige le bouton "voir plus"
 *
 * @throws {Error} Lance une erreur si le paramètre `limit` n'est pas un nombre
 * @throws {Error} Lance une erreur si le paramètre `service` n'est pas une chaîne de caractères
 * @throws {Error} Lance une erreur si le paramètre `service` n'est pas une URL valide
 * @throws {Error} Lance une erreur si le paramètre `moreLink` n'est pas une chaîne de caractères
 * @throws {Error} Lance une erreur si le paramètre `moreLink` n'est pas une URL valide
 *
 * @returns {React.ReactElement} Un composant React qui affiche la liste des événements avec :
 *   - Un titre de section
 *   - Une liste d'événements avec image, date et titre pour chaque élément
 *   - Un bouton optionnel "voir plus" si moreLink est fourni
 *   - Des états de chargement avec des squelettes d'interface
 *   - La gestion des erreurs de récupération des données
 *
 * @example
 * // Utilisation basique avec les paramètres par défaut
 * <ListeEvenements />
 *
 * @example
 * // Utilisation avec des paramètres personnalisés
 * <ListeEvenements
 *   title="Nos prochains événements"
 *   id="evenements-section"
 *   limit={5}
 *   moreText="Voir tous les événements"
 *   moreLink="https://example.com/evenements"
 * />
 */
export default function ListeFormations({ id, service = 'https://api.bib.umontreal.ca/formations/', limit = 4, moreText = 'Voir plus de formations', moreLink, ...props }) {
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button primary href={moreLink}>
            {moreText}
          </Button>
        </Box>
      )}
    </ListeFormationsContainer>
  )
}
