import { GlobalStyles as MuiGlobalStyles } from '@mui/material'

export default function GlobalStyles() {
  return (
    <MuiGlobalStyles
      styles={{
        html: {
          fontSize: '18px',
        },
        body: {
          fontSize: '18px',
        },
      }}
    />
  )
}
