import { useState } from 'react'
import { Fab, SvgIcon } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useSmall } from '@/hooks/use-small'
import ManageSearch from '@/icons/manage_search_24dp_FILL0_wght400_GRAD0_opsz48.svg'
import Menu from '@/icons/menu_24dp_FILL0_wght400_GRAD0_opsz48.svg'

const StyledFab = styled(Fab)({
  boxShadow: 'unset',
})

const fabStylesProps = {
  width: 50,
  height: 50,
}

const fabStylesSmProps = {
  width: 70,
  height: 70,
}

const iconStylesProps = {
  fontSize: '34px',
}

const iconStylesSmProps = {
  fontSize: '3rem',
  position: 'relative',
  right: -2,
}

export default function MenuFab({ sx, ...props }) {
  const isSmall = useSmall('lg')
  const [fabStyles, setFabStyles] = useState({})
  const [iconStyles, setIconStyles] = useState({})

  useState(() => {
    setIconStyles(isSmall ? iconStylesSmProps : iconStylesProps)
    setFabStyles(isSmall ? fabStylesSmProps : fabStylesProps)
  }, [isSmall])

  return (
    <StyledFab
      color="primary"
      size="large"
      aria-label="Ouvrir le menu du site"
      sx={{
        ...sx,
        ...fabStyles,
      }}
      {...props}
    >
      <SvgIcon component={isSmall ? ManageSearch : Menu} inheritViewBox sx={{ ...iconStyles }} />
    </StyledFab>
  )
}
