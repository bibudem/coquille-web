import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@/components/Button'

/**
 * Une colonne de la section Quoi de neuf (accueil) : en-tête, liste qui occupe
 * la hauteur libre, puis le bouton « Tous nos… » en bas. Les colonnes ont la
 * même hauteur dans la grille : les boutons tombent donc au même niveau.
 */
export default function ColonneQuoiDeNeuf({ title, id, moreText, moreLink, externe = false, children }) {
  return (
    <Box component="section" aria-labelledby={id} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', height: '100%' }}>
      <Typography component="h3" id={id} sx={{ fontSize: '1.75rem', fontWeight: 500, lineHeight: 1.2 }}>
        {title}
      </Typography>

      <Box sx={{ flexGrow: 1 }}>{children}</Box>

      {moreLink && (
        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Button secondary href={moreLink} {...(externe && { target: '_blank', rel: 'noopener noreferrer' })}>
            {moreText}
          </Button>
        </Box>
      )}
    </Box>
  )
}
