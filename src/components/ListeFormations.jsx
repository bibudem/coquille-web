import { Box, List, ListItem, ListItemButton, Skeleton, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import useSWR from 'swr'
import Button from '@/components/Button'
import { ArrowUpRightCircleIcon } from '@/components/CustomIcons'
import { CalendarBlankIcon, ClockCountdownIcon, MapPinSimpleAreaIcon,ArrowUpRight } from '@phosphor-icons/react'

const FETCH_TIMEOUT = 2000

function fetcher(...args) {
  return fetch(...args, { signal: AbortSignal.timeout(FETCH_TIMEOUT) }).then((res) => res.json())
}

function Title({ children }) {
  const theme = useTheme()
  return (
    <Typography  component='h4' variant='h4'>
      {children}
    </Typography>
  );
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
  const theme = useTheme()
  
  return (
    <ListItem {...props} alignItems="flex-start" disableGutters>
      <ListItemButton
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        sx={(theme) => ({
          borderRadius: theme.shape.corner.small,
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
          },
          position: 'relative', 
        })}
      >
        <Grid
          container
          spacing={1.5}
          sx={{
            width: '100%',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
            },
          }}
        >
          <Grid
            size="auto"
            sx={(theme) => ({
              width: 150,
              [theme.breakpoints.down('sm')]: {
                width: '100%',
                '& img': {
                  width: '100%',
                  height: 'auto',
                  maxHeight: '200px', 
                  objectFit: 'cover', 
                  display: 'block',
                },
              },
            })}
          >
            {imageVedette}
          </Grid>
          <Grid
            size="grow"
            container
            direction="column"
            spacing={0}
            sx={{
              flex: 1,
              minWidth: 0,
              justifyContent: 'flex-start',
              '& > *:not(:last-child)': {
                marginBottom: '.5rem',
              },
              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
            }}
          >
            <Grid>{upper}</Grid>
            <Grid>{title}</Grid>
            <Grid>{lower}</Grid>
          </Grid>

          {/* Nouveau Grid pour l'icône positionnée à droite au milieu */}
          <Grid
            size="auto"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '1rem',
              [theme.breakpoints.down('sm')]: {
                display: 'none', // Cache l'icône en version mobile
              },
            }}
          >
            <ArrowUpRightCircleIcon color="var(--_lower-icon-color)" fontSize={50} />
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

/**
 * Composant qui affiche une liste de formations récupérées depuis une API
 *
 * Ce composant récupère les données de formations depuis notre service REST,
 * les formate et les affiche dans une liste avec images, dates et titres.
 * Il gère automatiquement les états de chargement et d'erreur.
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} [props.id] - L'identifiant HTML unique pour l'élément
 * @param {string} [props.service='https://api.bib.umontreal.ca/formations/'] - L'URL de l'API des formations
 * @param {number} [props.limit=4] - Le nombre maximum de formations à afficher (doit être un nombre entre 1 et 500)
 * @param {string} [props.moreText='Voir plus de formations'] - Le texte affiché sur le bouton "voir plus"
 * @param {string} [props.moreLink] - L'URL vers laquelle redirige le bouton "voir plus"
 *
 * @throws {Error} Lance une erreur si le paramètre `limit` n'est pas un nombre
 * @throws {Error} Lance une erreur si le paramètre `limit` n'est pas compris entre 1 et 50
 * @throws {Error} Lance une erreur si le paramètre `service` n'est pas une chaîne de caractères
 * @throws {Error} Lance une erreur si le paramètre `service` n'est pas une URL valide
 *
 * @returns {React.ReactElement} Un composant React qui affiche la liste des formations avec :
 *   - Une liste de formations avec image, date et titre pour chaque élément
 *   - Un bouton optionnel "voir plus" si moreLink est fourni
 *   - Des états de chargement avec des squelettes d'interface
 *   - La gestion des erreurs de récupération des données
 *
 * @example
 * // Utilisation basique avec les paramètres par défaut
 * <ListeFormations />
 *
 * @example
 * // Utilisation avec des paramètres personnalisés
 * <ListeFormations
 *   id="formations-section"
 *   limit={6}
 *   moreText="Toutes nos formations"
 *   moreLink="https://example.com/formations"
 * />

 */

export default function ListeFormations({ id, service = 'https://api.bib.umontreal.ca/formations/', limit = 4, moreText = 'Voir plus de formations', moreLink, ...props }) {
  if (typeof limit !== 'number') {
    throw new Error('The `limit` parameter must be a number')
  }

  if (limit < 1 || limit > 50) {
    throw new Error('The `limit` parameter must be between 1 and 50')
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

  if (isValidating) {
    return (
      <ListeFormationsContainer>
        <List>
          {Array(limit)
            .fill()
            .map((_, i) => (
              <ListeFormationsItem 
                key={i} 
                imageVedette={
                  <Skeleton 
                    variant="rectangular" 
                    width={150} 
                    height={100}
                    sx={{ 
                      borderRadius: theme.shape.corner.small, 
                      display: 'block',
                      [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        height: 200,
                      },
                    }} 
                  />
                } 
                upper={<Skeleton sx={{ fontSize: '0.875rem', lineHeight: 1.2 }} width={115} />} 
                title={<Skeleton sx={{ fontSize: '2rem' }} />} 
                lower={<Skeleton sx={{ fontSize: '0.875rem', lineHeight: 1.2 }} width={175} />} 
              />
            ))}
        </List>
      </ListeFormationsContainer>
    )
  }

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
                  width: '100%',
                  height: 'auto',
                  maxHeight: '160px',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: theme.shape.corner.small,
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
        <Button 
          primary 
          href={moreLink}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={
            <ArrowUpRight size={24}/>
          }
          sx={{
            '& .MuiButton-endIcon': {
              marginLeft: '7px' 
            }
          }}
        >
          {moreText}
        </Button>
      </Box>
    )}
    </ListeFormationsContainer>
  )
}