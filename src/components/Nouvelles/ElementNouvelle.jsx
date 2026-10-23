import { Link as GatsbyLink } from 'gatsby'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import visuallyHidden from '@mui/utils/visuallyHidden'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'
import { ITEM_HEIGHT, ITEM_PADDING_TOP, ITEM_PADDING_BOTTOM, clampLines } from '@/utils/quoi-de-neuf'
import { TYPE_PRESSE } from './useNouvelles'

/**
 * Une ligne de la liste des nouvelles : une ligne orange (le média et la date
 * pour un article de presse, « Les bibliothèques » et la date pour nos
 * communications), puis le titre en lien, et la même pastille fléchée que
 * les Événements et les Formations. Les articles de presse s'ouvrent dans un
 * nouvel onglet (pastille ↗) ; nos communications restent sur le site (→).
 * La ligne orange reprend la hauteur et la place de la date des colonnes
 * Événements et Formations, pour que la section Quoi de neuf reste alignée.
 * Avec `compact` (accueil), la ligne suit le gabarit de Quoi de neuf : hauteur
 * fixe et titre coupé à trois lignes quand les colonnes sont côte à côte.
 */
export default function ElementNouvelle({ item, titleVariant = 'body1', component = 'li', compact = false }) {
  const { title, url, source, dateTexte, date, lang, externe, type } = item

  const lien = externe ? { component: 'a', href: url, target: '_blank', rel: 'noopener noreferrer' } : { component: GatsbyLink, to: url }

  return (
    <Box
      component={component}
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
        listStyle: 'none',
        borderBottom: `1px solid ${theme.palette.bleu200.main}`,
        ...(compact
          ? { height: ITEM_HEIGHT, boxSizing: 'border-box', flexShrink: 0, paddingTop: ITEM_PADDING_TOP, paddingBottom: ITEM_PADDING_BOTTOM }
          : { paddingBlock: '1.25rem' }),
      })}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          minHeight: '1.25rem',
          fontSize: '0.875rem',
          lineHeight: 1,
          letterSpacing: '.00875rem',
          color: theme.palette.rougeOrange.main,
        })}
      >
        <Box component="span" sx={{ fontWeight: 600 }}>
          {type === TYPE_PRESSE ? source : 'Les bibliothèques'}
        </Box>
        &nbsp;·&nbsp;
        <time dateTime={date}>{dateTexte}</time>
      </Box>
      <Typography
        {...lien}
        variant={titleVariant}
        // Comme les titres des événements : foncé au repos, bleu au survol.
        // « &&& » triple la classe pour passer devant la règle globale
        // « main :link:not(.MuiButtonBase-root) » (global-styles/links.css),
        // à laquelle les événements échappent parce que ce sont des boutons MUI.
        sx={(theme) => ({
          fontWeight: 500,
          textDecoration: 'none',
          // Laisse la place à la pastille, ancrée en bas à droite
          paddingRight: '2.75rem',
          ...(compact && clampLines()),
          // Le lien couvre tout l'élément, comme pour les événements
          '&::after': { content: '""', position: 'absolute', inset: 0 },
          transition: `color ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.emphasized}`,
          '&&&': {
            color: theme.palette.bleuFonce.main,
          },
          '&&&:hover, &&&:focus-visible': {
            color: theme.palette.bleuPrincipal.main,
            textDecoration: 'none',
          },
        })}
      >
        <span lang={lang}>{title}</span>
        {externe && (
          <Box component="span" sx={visuallyHidden}>
            {' '}(nouvel onglet)
          </Box>
        )}
      </Typography>
      <Box
        aria-hidden="true"
        sx={(theme) => ({ position: 'absolute', right: 0, bottom: '1rem', display: 'flex', pointerEvents: 'none', color: theme.palette.bleuPrincipal.main })}
      >
        {externe ? <ArrowUpRightCircleIcon fontSize={36} /> : <ArrowRightCircleIcon fontSize={36} />}
      </Box>
    </Box>
  )
}
