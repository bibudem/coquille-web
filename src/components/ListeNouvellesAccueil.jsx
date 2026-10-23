import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ColonneQuoiDeNeuf from '@/components/QuoiDeNeuf/ColonneQuoiDeNeuf'
import ElementNouvelle from '@/components/Nouvelles/ElementNouvelle'
import useNouvelles from '@/components/Nouvelles/useNouvelles'
import { ITEM_GAP } from '@/utils/quoi-de-neuf'

/**
 * Colonne « Nouvelles » de la section Quoi de neuf (accueil) : nos
 * communications et la revue de presse, mêlées par date.
 */
export default function ListeNouvellesAccueil({ title = 'Nouvelles', id, limit = 4, moreLink = '/nouvelles/', moreText = 'Toutes nos nouvelles' }) {
  const nouvelles = useNouvelles().slice(0, limit)

  return (
    <ColonneQuoiDeNeuf title={title} id={id} moreText={moreText} moreLink={moreLink}>
      {nouvelles.length ? (
        <Box component="ul" sx={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: ITEM_GAP }}>
          {nouvelles.map((item) => (
            <ElementNouvelle key={item.id} item={item} compact />
          ))}
        </Box>
      ) : (
        <Typography>Aucune nouvelle pour le moment</Typography>
      )}
    </ColonneQuoiDeNeuf>
  )
}
