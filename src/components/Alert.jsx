import MuiAlert from '@mui/material/Alert'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle'
import { InfoIcon } from '@phosphor-icons/react/dist/csr/Info'
import { WarningIcon } from '@phosphor-icons/react/dist/csr/Warning'
import { WarningDiamondIcon } from '@phosphor-icons/react/dist/csr/WarningDiamond'

/**
 * Renders a customized Material-UI Alert component with predefined icons for different severity levels.
 *
 * @param {Object} props - The component props
 * @param {'success' | 'info' | 'warning' | 'error'} [props.severity='info'] - The severity level of the alert
 * @param {React.ReactNode} props.children - The content of the alert
 * @returns {React.ReactElement} A configured MUI Alert component
 */
export default function Alert({ severity = 'info', children, ...props }) {
  return (
    <MuiAlert
      className="bib-comp-alert"
      severity={severity}
      iconMapping={{
        success: <CheckCircleIcon color="currentColor" size={24} />,
        info: <InfoIcon color="currentColor" size={24} />,
        warning: <WarningIcon color="currentColor" size={24} />,
        error: <WarningDiamondIcon color="currentColor" size={24} />,
      }}
      {...props}
    >
      {children}
    </MuiAlert>
  )
}
