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
        fontSize: '2.5rem',
        zIndex: 1400,
        ...sx,
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