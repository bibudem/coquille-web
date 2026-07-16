import { Box, IconButton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { X as CloseIcon } from '@phosphor-icons/react'
import { BurgerIcon } from '@/components/CustomIcons'

/**
 * `dark` bascule vers une couleur sombre quand le fond derrière l'icône est
 * clair, même logique que SearchButton juste à côté : blanc par défaut
 * (header transparent), sombre une fois que le header passe en fond blanc
 * (scroll sur TopAppBar, ou toujours sur TopAppBarSm).
 */
export default function MenuBurger({ open, onClick, dark = false, sx = {} }) {
  const theme = useTheme()
  const color = dark ? theme.palette.text.primary : '#fff'

  return (
    <IconButton
      onClick={onClick}
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      sx={{
        color,
        fontSize: '3.5rem',
        zIndex: 1400,
        ...sx,
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&:active': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {open ? (
          <CloseIcon size={34} weight="bold" color={color} />
        ) : (
          <BurgerIcon size={34} color={color} />
        )}
        <Typography
          component="span"
          aria-hidden="true"
          sx={{
            display: { xs: 'none', lg: 'block' },
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginRight: '4px',
            whiteSpace: 'nowrap',
            fontSize: '0.65rem',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '0.03em',
            color: 'inherit',
          }}
        >
          {open ? 'Fermer' : 'Menu'}
        </Typography>
      </Box>
    </IconButton>
  )
}