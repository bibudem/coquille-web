import { IconButton } from '@mui/material'
import { BurgerIcon } from '@/components/CustomIcons'

const fabStyles = {
  width: 50,
  height: 50,
}

const iconStyles = {
  fontSize: '34px',
}

export default function MenuBurger({ sx, ...props }) {
  return (
    <IconButton
      aria-label="Ouvrir le menu du site"
      sx={{
        ...sx,
        ...fabStyles,
        color: 'currentcolor',
      }}
      {...props}
    >
      <BurgerIcon sx={{ ...iconStyles }} />
    </IconButton>
  )
}
