import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/csr/ArrowSquareOut'
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown'
import { ClockIcon } from '@phosphor-icons/react/dist/csr/Clock'
import { DoorIcon } from '@phosphor-icons/react/dist/csr/Door'
import { DoorOpenIcon } from '@phosphor-icons/react/dist/csr/DoorOpen'
import { MapPinIcon } from '@phosphor-icons/react/dist/csr/MapPin'
import { UsersIcon } from '@phosphor-icons/react/dist/csr/Users'
import Link from '@/components/Link'
import HoraireSemaine from './HoraireSemaine'
import { directionsUrl, formatDistance, telHref } from './horaires'
import { srOnly } from './styles'
import useImagesLieux from './useImagesLieux'

// Couleur de la pastille de statut. Le texte du statut porte toujours
// l'information : la couleur n'est qu'un repère visuel en plus.
const STATUS_COLORS = {
  open: 'success.main',
  'closing-soon': 'warning.main',
  closed: 'error.main',
  unknown: 'text.secondary',
}

function Statut({ status, extra }) {
  if (!status) return <Skeleton variant="text" width="60%" sx={{ my: 1 }} aria-hidden="true" />
  return (
    <Typography variant="body2" component="p" sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', columnGap: 1, my: 1 }}>
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          flex: '0 0 auto',
          alignSelf: 'center',
          backgroundColor: status.state === 'closed' ? 'transparent' : STATUS_COLORS[status.state],
          border: '2px solid',
          borderColor: STATUS_COLORS[status.state],
        }}
      />
      <Box component="span" sx={{ fontWeight: 600 }}>
        {status.text}
      </Box>
      {extra?.length > 0 && (
        <Box component="span" sx={{ color: 'text.secondary', flexBasis: '100%', pl: '18px' }}>
          {extra.join(' · ')}
        </Box>
      )}
    </Typography>
  )
}

// Nom du lieu ajouté, pour les lecteurs d'écran seulement, aux liens et aux
// titres de volets qui reviennent dans chaque fiche (« Itinéraire »,
// « Cabine », « Horaire de la semaine »…). Dans la liste des liens ou des
// titres de la page, chacun reste ainsi compréhensible seul (WCAG 2.4.9).
// Le texte visible reste en tête, comme le demande WCAG 2.5.3.
function Contexte({ lieu }) {
  return (
    <Box component="span" sx={srOnly}>
      {' '}– {lieu.name}
    </Box>
  )
}

// Volet repliable, dans le style des accordéons du site mais plus compact :
// une fiche en compte jusqu'à trois.
function Volet({ id, lieu, icon: Icon, title, headingLevel, children }) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      square
      // Les titres des volets sont un niveau sous le nom de la fiche.
      slotProps={{ heading: { component: `h${headingLevel}` }, transition: { unmountOnExit: true } }}
      sx={{ backgroundColor: 'transparent', borderTop: '1px solid', borderColor: 'divider', '&::before': { display: 'none' } }}
    >
      <AccordionSummary
        id={`${id}-entete`}
        aria-controls={`${id}-contenu`}
        expandIcon={<CaretDownIcon aria-hidden="true" size={18} />}
        sx={{
          px: 0,
          py: 0,
          minHeight: 48,
          color: 'bleuPrincipal.main',
          '& .MuiAccordionSummary-content': { fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 },
          '& .MuiAccordionSummary-expandIconWrapper': { color: 'bleuPrincipal.main' },
        }}
      >
        <Icon aria-hidden="true" size={20} />
        {title}
        <Contexte lieu={lieu} />
      </AccordionSummary>
      {/* Pas d'id ici : MUI le pose déjà sur la région qui enveloppe ce contenu (aria-controls du titre). */}
      <AccordionDetails sx={{ px: 0, pt: 0, pb: 2, '@media (min-width: 900px)': { px: 0, pt: 0, pb: 2 } }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

function Contacts({ contact }) {
  return (
    <Box component="dl" sx={{ m: 0, fontSize: '0.875rem', '& dt': { fontWeight: 600, mt: 1 }, '& dt:first-of-type': { mt: 0 }, '& dd': { m: 0 } }}>
      {contact.map(({ label, phone, email }) => (
        <div key={label}>
          <dt>{label}</dt>
          {phone && <dd>{telHref(phone) ? <Link to={telHref(phone)}>{phone}</Link> : phone}</dd>}
          {email && (
            <dd>
              <Link to={`mailto:${email}`}>{email}</Link>
            </dd>
          )}
        </div>
      ))}
    </Box>
  )
}

function Espaces({ lieu, spaces }) {
  return (
    <Box component="ul" sx={{ m: 0, pl: 2.5, fontSize: '0.875rem', '& li': { py: 0.25 } }}>
      {spaces.map(({ label, url }) => (
        <li key={label}>
          {url ? (
            // Les pages du Studio et du calendrier sont sur d'autres sites :
            // nouvel onglet, comme les autres liens externes de la fiche.
            /^https?:/.test(url) ? (
              <Link to={url} target="_blank" rel="noopener noreferrer" Icon={ArrowSquareOutIcon} iconProps={{ 'aria-hidden': true, size: 16 }}>
                {label}
                <Contexte lieu={lieu} />
                <Box component="span" sx={srOnly}> (nouvel onglet)</Box>
              </Link>
            ) : (
              <Link to={url}>
                {label}
                <Contexte lieu={lieu} />
              </Link>
            )
          ) : (
            label
          )}
        </li>
      ))}
    </Box>
  )
}

// Un bouton par type de salle, dans le style des boutons arrondis du site.
// Chaque bouton ouvre le calendrier de réservation dans un nouvel onglet.
function Reservations({ lieu, reservations }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
      {reservations.map(({ label, url }) => (
        <Button
          key={label}
          variant="outlined"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<ArrowSquareOutIcon aria-hidden="true" color="currentColor" size={18} />}
          sx={(theme) => ({
            mt: 0,
            minHeight: 44,
            px: 2.5,
            borderRadius: theme.shape.corner.full,
            borderColor: 'bleuPrincipal.main',
            color: 'bleuPrincipal.main',
            fontWeight: 600,
            textAlign: 'left',
            '&:hover': { backgroundColor: 'bleuPrincipal.main', borderColor: 'bleuPrincipal.main', color: 'common.white' },
          })}
        >
          {label}
          <Contexte lieu={lieu} />
          <Box component="span" sx={srOnly}> (nouvel onglet)</Box>
        </Button>
      ))}
    </Box>
  )
}

// Photo du lieu, collée au coin haut-droit de la fiche. Elle est décorative (le nom
// est juste à côté) : alt vide. Quand la personne s'est localisée, la
// distance s'affiche par-dessus.
function Vignette({ image, distance, compact }) {
  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        flex: '0 0 auto',
        // Collée aux bords de la fiche : on annule sa marge intérieure
        // (p: { xs: 2, md: 3 }) plus l'épaisseur de sa bordure (1 px), pour que
        // la photo recouvre la bordure au lieu de s'arrêter juste avant. Son
        // arrondi reprend alors exactement celui de la fiche.
        // Toutes les valeurs par largeur d'écran sont dans les blocs @media
        // ci-dessous : des valeurs responsives { md: … } à côté produiraient
        // la même règle et seraient écrasées par ces blocs.
        mt: `calc(${theme.spacing(-2)} - 1px)`,
        mr: `calc(${theme.spacing(-2)} - 1px)`,
        // Mobile seulement : le texte à côté prend beaucoup de lignes et une
        // photo étirée deviendrait une bande étroite et haute. On garde une
        // petite vignette carrée, arrondie en bas à gauche.
        width: 88,
        height: 88,
        borderRadius: `0 ${theme.shape.corner.medium} 0 ${theme.shape.corner.small}`,
        // À partir de sm, elle s'étire jusqu'à la bordure du premier volet (sa
        // hauteur suit celle du contenu à côté) ou, en version compacte (sans
        // volets), jusqu'au bas de la fiche, dont elle épouse alors le coin.
        [theme.breakpoints.up('sm')]: {
          width: 148,
          height: 'auto',
          alignSelf: 'stretch',
          minHeight: 96,
          mb: compact ? `calc(${theme.spacing(-2)} - 1px)` : 0,
          borderRadius: compact ? `0 ${theme.shape.corner.medium} ${theme.shape.corner.medium} 0` : `0 ${theme.shape.corner.medium} 0 0`,
        },
        [theme.breakpoints.up('md')]: {
          mt: `calc(${theme.spacing(-3)} - 1px)`,
          mr: `calc(${theme.spacing(-3)} - 1px)`,
          mb: compact ? `calc(${theme.spacing(-3)} - 1px)` : 0,
        },
        [theme.breakpoints.up('lg')]: {
          width: 168,
        },
        overflow: 'hidden',
        backgroundColor: 'bleu100.main',
        // Le wrapper de GatsbyImage remplit la vignette et la photo est
        // recadrée (object-fit: cover), quelle que soit la hauteur.
        '& .gatsby-image-wrapper': { position: 'absolute', inset: 0, width: '100%', height: '100%' },
        '& .gatsby-image-wrapper img': { objectFit: 'cover' },
      })}
    >
      <GatsbyImage image={image} alt="" />
      {distance != null && (
        <Chip
          label={formatDistance(distance)}
          size="small"
          sx={{
            position: 'absolute',
            top: { xs: 4, sm: 6 },
            right: { xs: 4, sm: 6 },
            // Plus petite sur la vignette mobile, pour ne pas la couvrir.
            height: { xs: 20, sm: 24 },
            fontSize: { xs: '0.6875rem', sm: '0.8125rem' },
            '& .MuiChip-label': { px: { xs: 0.75, sm: 1 } },
            backgroundColor: 'common.white',
            color: 'bleuPrincipal.main',
            fontWeight: 600,
            boxShadow: 1,
          }}
        />
      )}
    </Box>
  )
}

// `idPrefix` distingue une copie de la fiche (dans « Les plus proches de
// vous ») de la fiche de la liste, qui garde l'id nu : les ancres
// /horaires/#<id> visent toujours cette dernière. `headingLevel` est le
// niveau du nom ; les volets prennent le niveau suivant. `compact` donne la
// version courte de « Les plus proches de vous » : même apparence, mais le
// pavillon au lieu de l'adresse, « Itinéraire » et « Voir la fiche », sans
// note ni volets.
export default function FicheLieu({ lieu, idPrefix = '', headingLevel = 2, compact = false, status, extra, distance, horaires, dates, today, hoursError, ensureWeek, isWeekLoaded, platform, highlighted, onShowOnMap, onVoirFiche }) {
  const uid = `${idPrefix}${lieu.id}`
  const voletLevel = headingLevel + 1
  const hasLocation = lieu.lat != null && lieu.lng != null
  const image = useImagesLieux()[lieu.codeBib]

  return (
    <Box
      component="article"
      id={uid}
      aria-labelledby={`${uid}-nom`}
      tabIndex={-1}
      sx={(theme) => ({
        backgroundColor: 'common.white',
        borderRadius: theme.shape.corner.medium,
        border: '1px solid',
        borderColor: highlighted ? 'jaune.main' : 'divider',
        boxShadow: highlighted ? `0 0 0 3px ${theme.palette.jaune.main}` : 'none',
        transition: 'box-shadow 300ms ease, border-color 300ms ease',
        p: { xs: 2, md: 3 },
        pb: compact ? { xs: 2, md: 3 } : { xs: 1, md: 1.5 },
        // Version compacte : les fiches d'une même rangée ont la même hauteur,
        // et la photo descend jusqu'en bas.
        ...(compact && { height: '100%', display: 'flex', flexDirection: 'column' }),
        scrollMarginTop: '100px',
        '&:focus': { outline: 'none' },
      })}
    >
      {/* L'image reste dans la partie haute de la fiche : les volets passent dessous, sur toute la largeur. */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2.5 }, flex: compact ? '1 1 auto' : undefined }}>
        <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
            <Typography id={`${uid}-nom`} component={`h${headingLevel}`} sx={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3, m: 0 }}>
              {lieu.name}
            </Typography>
            {distance != null && !image && <Chip label={formatDistance(distance)} size="small" sx={{ backgroundColor: 'bleu100.main', color: 'bleuPrincipal.main', fontWeight: 600, flex: '0 0 auto' }} />}
          </Box>

          {(compact ? lieu.pavillon : lieu.addr) && (
            <Typography variant="body2" component="p" sx={{ color: 'text.secondary', mt: 0.5, display: 'flex', gap: 0.75, alignItems: 'flex-start' }}>
              <MapPinIcon aria-hidden="true" size={18} style={{ flex: '0 0 auto', marginTop: 1 }} />
              {compact ? lieu.pavillon : lieu.addr}
            </Typography>
          )}

          <Statut status={status} extra={compact ? null : extra} />

          {!compact && lieu.note && (
            <Typography
              variant="body2"
              component="p"
              sx={(theme) => ({ backgroundColor: 'bleu100.main', borderRadius: theme.shape.corner.small, px: 1.5, py: 1, my: 1.5 })}
            >
              {lieu.note}
              {lieu.noteLink && (
                <>
                  {' '}
                  <Link to={lieu.noteLink.url} Icon={ArrowSquareOutIcon} iconProps={{ 'aria-hidden': true }} sx={{ fontWeight: 600 }}>
                    {lieu.noteLink.label}
                  </Link>
                </>
              )}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 3, rowGap: 1, mt: 1.5, mb: compact ? 0 : 1.5, fontSize: '0.875rem', fontWeight: 600 }}>
            {!compact && hasLocation && (
              <ButtonBase
                onClick={() => onShowOnMap(lieu.id)}
                sx={{ font: 'inherit', color: 'bleuPrincipal.main', '&:hover': { textDecoration: 'underline' }, '&.Mui-focusVisible': { outline: '2px solid', outlineOffset: 2 } }}
              >
                Voir sur la carte
                <Contexte lieu={lieu} />
              </ButtonBase>
            )}
            {hasLocation && (
              <Link to={directionsUrl(lieu, platform)} Icon={ArrowSquareOutIcon} iconProps={{ 'aria-hidden': true }} target="_blank" rel="noopener noreferrer">
                Itinéraire
                <Contexte lieu={lieu} />
                <Box component="span" sx={srOnly}> (nouvel onglet)</Box>
              </Link>
            )}
            {compact && (
              <Link to={`#${lieu.id}`} onClick={(e) => { e.preventDefault(); onVoirFiche(lieu.id) }} Icon iconProps={{ 'aria-hidden': true }}>
                Voir la fiche
                <Contexte lieu={lieu} />
              </Link>
            )}
          </Box>
        </Box>
        {image && <Vignette image={image} distance={distance} compact={compact} />}
      </Box>

      {!compact && lieu.codeBib && (
        <Volet id={`${uid}-horaire`} lieu={lieu} headingLevel={voletLevel} icon={ClockIcon} title="Horaire de la semaine">
          {horaires ? (
            <HoraireSemaine lieu={lieu} horaires={horaires} dates={dates} today={today} ensureWeek={ensureWeek} isWeekLoaded={isWeekLoaded} error={hoursError} />
          ) : hoursError ? (
            <Typography variant="body2">L’horaire est indisponible pour le moment. Réessayez plus tard.</Typography>
          ) : (
            <Skeleton variant="rounded" height={200} />
          )}
        </Volet>
      )}
      {!compact && (lieu.contact?.length > 0 || lieu.staffFragment) && (
        <Volet id={`${uid}-contact`} lieu={lieu} headingLevel={voletLevel} icon={UsersIcon} title="Nous joindre">
          {lieu.contact?.length > 0 && <Contacts contact={lieu.contact} />}
          {lieu.staffFragment && (
            <Link
              to={`/nous-joindre/notre-equipe/#${lieu.staffFragment}`}
              Icon
              iconProps={{ 'aria-hidden': true }}
              sx={{ display: 'inline-flex', mt: lieu.contact?.length ? 2 : 0, fontSize: '0.875rem', fontWeight: 600 }}
            >
              Répertoire du personnel
              <Contexte lieu={lieu} />
            </Link>
          )}
        </Volet>
      )}
      {!compact && lieu.spaces?.length > 0 && (
        <Volet id={`${uid}-espaces`} lieu={lieu} headingLevel={voletLevel} icon={DoorIcon} title="Espaces">
          <Espaces lieu={lieu} spaces={lieu.spaces} />
        </Volet>
      )}
      {!compact && lieu.reservations?.length > 0 && (
        <Volet id={`${uid}-reservations`} lieu={lieu} headingLevel={voletLevel} icon={DoorOpenIcon} title="Réserver une salle">
          <Reservations lieu={lieu} reservations={lieu.reservations} />
        </Volet>
      )}
    </Box>
  )
}
