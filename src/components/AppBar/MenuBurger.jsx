import { IconButton } from '@mui/material'
import { BurgerIcon } from '@/components/CustomIcons'

const fabStyles = {
  width: 50,
  height: 50,
}

const iconStyles = {
  fontSize: '34px',
}

export default function MenuBurger({ sx, lvl, ...props }) {
  return (
    <IconButton
      aria-label="Ouvrir le menu du site"
      sx={{
        ...sx,
        ...fabStyles,
        color: lvl === 1 ? '#fafdfe' : '#0B113A',
      }}
      {...props}
    >
      <BurgerIcon sx={{ ...iconStyles }} />
    </IconButton>
  )
}
