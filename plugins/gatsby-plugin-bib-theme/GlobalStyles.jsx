import { GlobalStyles as MuiGlobalStyles } from '@mui/material'

export default function GlobalStyles() {
  return (
    <MuiGlobalStyles
      styles={(theme) => ({
        html: {
          fontSize: '17px',
        },
        body: {
          fontSize: '17px',
        },
        [theme.breakpoints.up('md')]: {
          html: {
            fontSize: '18px',
          },
          body: {
            fontSize: '18px',
          },
        },
      })}
    />
  )
}
