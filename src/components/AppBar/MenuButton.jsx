import { IconButton } from '@mui/material'
import { BurgerIcon } from '@/components/CustomIcons'

const fabStyles = {
  width: 50,
  height: 50,
}

const iconStyles = {
  fontSize: '34px',
}

export default function MenuFab({ sx, ...props }) {
  return (
    <IconButton
      color="primary"
      aria-label="Ouvrir le menu du site"
      sx={{
        ...sx,
        ...fabStyles,
      }}
      {...props}
    >
      <BurgerIcon sx={{ ...iconStyles }} />
    </IconButton>
  )
}
