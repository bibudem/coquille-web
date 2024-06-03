import { styled } from '@mui/material/styles'
import { AppBar, Fab, SvgIcon, Toolbar } from '@mui/material'
import { HomeOutlined } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import Link from '@/components/Link'
import ManageSearch from '@/icons/manage_search_24dp_FILL0_wght400_GRAD0_opsz48.svg'
import Home from '@/icons/home_24dp_FILL0_wght400_GRAD0_opsz48.svg'

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  bottom: 15,
  right: 15,
  width: 70,
  height: 70,
  boxShadow: 'unset',
})

export default function BottomAppBarSm() {
  return (
    <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0 }} elevation={24}>
      <Toolbar>
        <IconButton component={Link} to="/" color="inherit" size="large" aria-label="open drawer">
          <SvgIcon component={Home} inheritViewBox />
        </IconButton>
        <StyledFab color="primary" size="large" aria-label="add">
          <SvgIcon component={ManageSearch} inheritViewBox sx={{ fontSize: '3rem', position: 'relative', right: -2 }} />
        </StyledFab>
      </Toolbar>
    </AppBar>
  )
}
