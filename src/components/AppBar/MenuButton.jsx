import { IconButton, SvgIcon } from '@mui/material'
import Menu from '@/icons/menu_24dp_FILL0_wght400_GRAD0_opsz48.svg'

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
      <SvgIcon component={Menu} inheritViewBox sx={{ ...iconStyles }} />
    </IconButton>
  )
}
