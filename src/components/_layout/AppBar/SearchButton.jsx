import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link as GatsbyLink } from 'gatsby'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

/**
 * Icône de recherche du header, qui mène à la page dédiée /rechercher/.
 * La couleur est calculée ici avec useTheme() et passée explicitement à la
 * fois à l'IconButton (sx) et à l'icône elle-même (prop `color`), plutôt que
 * de compter sur l'héritage CSS `currentColor` : les classes par défaut de
 * MUI IconButton peuvent sinon prendre le dessus selon l'ordre d'injection
 * des styles, ce qui rendait l'icône plus terne que le texte du menu.
 *
 * `dark` bascule vers une icône sombre quand le fond derrière elle est clair :
 * toujours vrai sur le header mobile (TopAppBarSm, fond blanc fixe), et sur le
 * header desktop (TopAppBar) une fois que `trigger` (scroll) fait passer son
 * fond au blanc — sinon l'icône blanche disparaît sur ce fond blanc.
 */
export default function SearchButton({ dark = false }) {
  const theme = useTheme()
  const color = dark ? theme.palette.text.primary : '#fff'

  return (
    <IconButton component={GatsbyLink} to="/rechercher/" aria-label="Rechercher dans le site" sx={{ color }}>
      <MagnifyingGlassIcon size={24} weight="bold" color={color} />
    </IconButton>
  )
}
