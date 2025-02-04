import { SvgIcon } from '@mui/material'
import SofiaSVG from '@/icons/sofia.svg'
import BurgerSVG from '@/icons/burger.svg'

export function SofiaIcon(color, sx, ...props) {
  return <SvgIcon {...props} component={SofiaSVG} inheritViewBox sx={(theme) => ({ color: color ?? theme.palette.grey['700'] })} />
}

export function BurgerIcon(color, sx, ...props) {
  return <SvgIcon {...props} component={BurgerSVG} inheritViewBox sx={(theme) => ({ color: color ?? theme.palette.grey['700'] })} />
}
