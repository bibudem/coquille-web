import { Alert as MuiAlert } from '@mui/material'
import { CheckCircle, Info, Warning, WarningDiamond } from '@phosphor-icons/react'

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
      severity={severity}
      iconMapping={{
        success: <CheckCircle color="currentColor" size={24} />,
        info: <Info color="currentColor" size={24} />,
        warning: <Warning color="currentColor" size={24} />,
        error: <WarningDiamond color="currentColor" size={24} />,
      }}
      {...props}
    >
      {children}
    </MuiAlert>
  )
}
