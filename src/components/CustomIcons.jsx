import { SvgIcon } from '@mui/material'
import SofiaSVG from '@/icons/sofia.svg'
import BurgerSVG from '@/icons/burger.svg'
import ArrowLeftCircle from '@/icons/arrow-left-circle.svg'
import ArrowRightCircle from '@/icons/arrow-right-circle.svg'
import ArrowUpRightCircle from '@/icons/arrow-up-right-circle.svg'

function iconComponentFactory(IconComponent) {
  return function IconComponentFactory({ color, size = 50, sx, ...props }) {
    console.log('typeof size', typeof size, size)
    return (
      <SvgIcon
        inheritViewBox
        {...props}
        component={IconComponent}
        sx={(theme) => ({
          color: color ?? theme.palette.grey['700'],
          fontSize: typeof size === 'string' ? size : `${size}px`,
          ...sx,
        })}
      />
    )
  }
}

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

export function ArrowUpRightCircleIcon(color, sx, ...props) {
  return <SvgIcon {...props} component={ArrowUpRightCircle} inheritViewBox sx={(theme) => ({ color: color ?? theme.palette.grey['700'], ...sx })} />
}

// export const ArrowUpRightCircleIcon = iconComponentFactory(ArrowUpRightCircle)
