import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

/**
 * Icône de recherche du header, qui déclenche l'ouverture de SearchOverlay.
 * La couleur est calculée ici avec useTheme() et passée explicitement à la
 * fois à l'IconButton (sx) et à l'icône elle-même (prop `color`), plutôt que
 * de compter sur l'héritage CSS `currentColor` : les classes par défaut de
 * MUI IconButton peuvent sinon prendre le dessus selon l'ordre d'injection
 * des styles, ce qui rendait l'icône plus terne que le texte du menu.
 *
 * `dark` sert pour le header mobile (TopAppBarSm), dont le fond est blanc
 * fixe et a donc besoin d'une icône sombre pour rester visible — le header
 * desktop (TopAppBar) garde le blanc par défaut, comme le reste du menu.
 */
export default function SearchButton({ onClick, dark = false }) {
  const theme = useTheme()
  const color = dark ? theme.palette.text.primary : '#fff'

  return (
    <IconButton onClick={onClick} aria-label="Rechercher dans le site" sx={{ color }}>
      <MagnifyingGlassIcon size={24} weight="bold" color={color} />
    </IconButton>
  )
}
