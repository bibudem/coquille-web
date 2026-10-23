import useSWR from 'swr'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { CalendarBlankIcon } from '@phosphor-icons/react/dist/csr/CalendarBlank'
import visuallyHidden from '@mui/utils/visuallyHidden'
import ColonneQuoiDeNeuf from '@/components/QuoiDeNeuf/ColonneQuoiDeNeuf'
import { ArrowUpRightCircleIcon } from '@/components/CustomIcons'
import { ITEM_HEIGHT, ITEM_GAP, ITEM_PADDING_TOP, ITEM_PADDING_BOTTOM, clampLines } from '@/utils/quoi-de-neuf'

const SERVICE_URL = 'https://api.bib.umontreal.ca/formations/'
const MORE_LINK = 'https://calendrier.bib.umontreal.ca/calendar?cid=7690&t=m&d=0000-00-00&cal=7690&inc=0'
const FETCH_TIMEOUT = 5_000
const IMG_SIZE = '5.5rem'

function fetcher(url) {
  return fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT) }).then((res) => {
    if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`)
    return res.json()
  })
}

const Img = styled('img')(({ theme }) => ({
  display: 'block',
  width: IMG_SIZE,
  height: IMG_SIZE,
  objectFit: 'cover',
  borderRadius: theme.shape.corner.medium,
}))

function Element({ children }) {
  return (
    <Box
      component="li"
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        gap: '1rem',
        listStyle: 'none',
        height: ITEM_HEIGHT,
        boxSizing: 'border-box',
        flexShrink: 0,
        paddingTop: ITEM_PADDING_TOP,
        paddingBottom: ITEM_PADDING_BOTTOM,
        borderBottom: `1px solid ${theme.palette.bleu200.main}`,
      })}
    >
      {children}
    </Box>
  )
}

function LigneDate({ children }) {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '.5em',
        minHeight: '1.25rem',
        fontSize: '0.875rem',
        lineHeight: 1,
        letterSpacing: '.00875rem',
        color: theme.palette.rougeOrange.main,
      })}
    >
      <CalendarBlankIcon size="1.25rem" color="currentColor" aria-hidden="true" />
      {children}
    </Box>
  )
}

/**
 * Colonne « Formations » de la section Quoi de neuf (accueil), au même
 * gabarit que la colonne Événements : vignette, date et heure, titre.
 * La liste complète (ListeFormations) reste utilisée ailleurs, notamment
 * sur la page Études.
 */
export default function ListeFormationsAccueil({ title = 'Formations', id, limit = 4, moreText = 'Toutes nos formations', moreLink = MORE_LINK }) {
  const { data, error, isLoading } = useSWR(`${SERVICE_URL}?limit=${limit}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })

  let contenu
  if (error) {
    contenu = <Typography>Les formations ne sont pas disponibles pour le moment.</Typography>
  } else if (isLoading || !data) {
    contenu = (
      <Box component="ul" sx={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: ITEM_GAP }}>
        {Array.from({ length: limit }, (_, i) => (
          <Element key={i}>
            <Skeleton variant="rounded" sx={{ width: IMG_SIZE, height: IMG_SIZE, flexShrink: 0 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton width={140} />
              <Skeleton />
            </Box>
          </Element>
        ))}
      </Box>
    )
  } else if (!data.length) {
    contenu = <Typography>Aucune formation à venir pour le moment.</Typography>
  } else {
    contenu = (
      <Box component="ul" sx={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: ITEM_GAP }}>
        {data.slice(0, limit).map(({ url, titre, date, debut, fin, imageVedette }) => (
          <Element key={url}>
            {imageVedette ? <Img src={imageVedette} alt="" aria-hidden="true" loading="lazy" decoding="async" /> : <Box sx={{ width: IMG_SIZE, flexShrink: 0 }} />}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem', minWidth: 0, flexGrow: 1 }}>
              <LigneDate>
                {date}
                {debut && ` · ${debut}${fin ? `–${fin}` : ''}`}
              </LigneDate>
              <Typography
                component="a"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                // Le lien couvre tout l'élément (::after), comme pour les
                // événements ; mêmes couleurs : foncé au repos, bleu au survol.
                // « &&& » passe devant la règle globale des liens (links.css).
                sx={(theme) => ({
                  fontWeight: 500,
                  textDecoration: 'none',
                  paddingRight: '2.75rem',
                  ...clampLines(),
                  transition: `color ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.emphasized}`,
                  '&::after': { content: '""', position: 'absolute', inset: 0 },
                  '&&&': { color: theme.palette.bleuFonce.main },
                  '&&&:hover, &&&:focus-visible': { color: theme.palette.bleuPrincipal.main, textDecoration: 'none' },
                })}
              >
                {titre}
                <Box component="span" sx={visuallyHidden}>
                  {' '}(nouvel onglet)
                </Box>
              </Typography>
            </Box>
            <Box sx={(theme) => ({ position: 'absolute', right: 0, bottom: '1rem', display: 'flex', pointerEvents: 'none', color: theme.palette.bleuPrincipal.main })}>
              <ArrowUpRightCircleIcon fontSize={36} />
            </Box>
          </Element>
        ))}
      </Box>
    )
  }

  return (
    <ColonneQuoiDeNeuf title={title} id={id} moreText={moreText} moreLink={moreLink} externe>
      {contenu}
    </ColonneQuoiDeNeuf>
  )
}
