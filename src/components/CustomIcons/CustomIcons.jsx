import { SvgIcon } from '@mui/material'
import SofiaSVG from '@/icons/Sofia.svg'

export function SofiaIcon(color, ...props) {
  return <SvgIcon {...props} component={SofiaSVG} inheritViewBox sx={(theme) => ({ color: color ?? theme.palette.grey['700'] })} />
}
