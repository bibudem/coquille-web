import { useEffect } from 'react'
import { Container } from '@mui/material'

export default function RetroactionUsager({ formId = '20e7ff6aa4aeadadbea8aa877a806bb9' }) {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = `https://umontreal.libwizard.com/form_loader.php?id=${formId}&noheader=0`
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Container>
      <div id={`form_${formId}`} style={{ display: 'inline-block', height: '258px' }}></div>
    </Container>
  )
}
