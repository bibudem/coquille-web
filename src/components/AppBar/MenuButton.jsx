import { IconButton, SvgIcon } from '@mui/material'
import { List } from '@phosphor-icons/react'

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
      <SvgIcon component={List} inheritViewBox sx={{ ...iconStyles }} />
    </IconButton>
  )
}
