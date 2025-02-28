import { SvgIcon } from '@mui/material'
import SofiaSVG from '@/icons/sofia.svg'
import BurgerSVG from '@/icons/burger.svg'
import ArrowLeftCircle from '@/icons/arrow-left-circle.svg'
import ArrowRightCircle from '@/icons/arrow-right-circle.svg'

export function SofiaIcon(color, sx, ...props) {
  return <SvgIcon {...props} component={SofiaSVG} inheritViewBox sx={(theme) => ({ color: color ?? theme.palette.grey['700'], ...sx })} />
}

export function BurgerIcon(color, sx, ...props) {
  return <SvgIcon {...props} component={BurgerSVG} inheritViewBox sx={(theme) => ({ color: color ?? theme.palette.grey['700'], ...sx })} />
}

export function ArrowLeftCircleIcon(color, sx, ...props) {
  return <SvgIcon {...props} component={ArrowLeftCircle} inheritViewBox sx={(theme) => ({ color: color ?? theme.palette.grey['700'], ...sx })} />
}

export function ArrowRightCircleIcon(color, sx, ...props) {
  return <SvgIcon {...props} component={ArrowRightCircle} inheritViewBox sx={(theme) => ({ color: color ?? theme.palette.grey['700'], ...sx })} />
}
