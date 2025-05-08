import { GlobalStyles as MuiGlobalStyles } from '@mui/material'
import typographyLvl1 from './tokens/typography-lvl-1.js'
import 'modern-normalize/modern-normalize.css'

export default function GlobalStyles() {
  const headers = Array(6)
    .fill()
    .map((_, i) => {
      const header = `h${i + 1}`

      return {
        header,
        styles: typographyLvl1[header],
      }
    })
    .reduce((headers, { header, styles }) => {
      headers[header] = styles

      return headers
    }, {})

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
        // Headings styles for plain html
        ...headers,
      })}
    />
  )
}
