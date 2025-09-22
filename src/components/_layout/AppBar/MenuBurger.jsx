import { IconButton } from '@mui/material'
import { X as CloseIcon } from '@phosphor-icons/react'
import { BurgerIcon } from '@/components/CustomIcons'

export default function MenuBurger({ open, onClick, sx = {} }) {
  return (
    <IconButton
      onClick={onClick}
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      sx={{
        color: 'inherit',
        fontSize: '3.5rem',
        zIndex: 1400,
        paddingLeft: '2rem',
        ...sx,
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      {open ? (
        <CloseIcon size={32} weight="bold" />
      ) : (
        <BurgerIcon size={32} weight="bold" />
      )}
    </IconButton>
  )
}