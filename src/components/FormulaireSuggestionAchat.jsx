import IframeResizer from '@iframe-resizer/react'
import { useEffect, useState } from 'react'

const NAV_TYPES = ['assign', 'reload', 'replace']
const FORM_URL = 'https://jupiter.bib.umontreal.ca/formulaires/suggestions-achat-3.asp'

export default function FormulaireSuggestionAchat() {
  const [src, setSrc] = useState(null)

  function onIframeMessage(event) {
    console.log('[iframeResizer] event:', event)
    const { message } = event
    if (typeof message === 'object') {
      if ('authenticate' in message) {
        if (typeof message.authenticate === 'string' && NAV_TYPES.indexOf(message.authenticate) >= 0) {
          return location[NAV_TYPES[NAV_TYPES.indexOf(message.authenticate)]]('https://identification.umontreal.ca/cas/login.ashx?service=' + location.href)
        }

        // typeof message.authenticate === 'boolean'
        location.replace('https://identification.umontreal.ca/cas/login.ashx?service=' + location.href)
      } else if ('navigate' in message) {
        message.navigate ? location.assign(message.navigate) : location.reload(true)
      }
    }
  }

  useEffect(() => {
    const url = new URL(FORM_URL)
    const hostPageUrl = location.href.replace(/\??ticket=[^&]+/, '')
    const successUrl = `${hostPageUrl}/succes`

    url.searchParams.set('hostPageUrl', hostPageUrl)
    url.searchParams.set('successUrl', successUrl)

    if (location.search.indexOf('ticket=') > 0) {
      const ticket = location.search.split('ticket=')[1].split('&')[0]

      // Get rid of the ticket parameter in the current URL
      history.replaceState(null, '', hostPageUrl)

      // Then pass it to the child window
      url.searchParams.set('ticket', ticket)
    }
    setSrc(url.href)
  }, [])

  return (
    <IframeResizer
      license="GPLv3"
      // src="https://jupiter.bib.umontreal.ca/formulaires/suggestions-achat-3.asp?hostPageUrl=https%3A%2F%2Fbib.umontreal.ca%2Fnous-joindre%2Fsuggestion-achat&successUrl=https%3A%2F%2Fbib.umontreal.ca%2Fnous-joindre%2Fsuggestion-achat"
      src={src}
      style={{
        width: '100%',
        height: '100vh',
        border: 'unset',
      }}
      waitForLoad
      onMessage={onIframeMessage}
    />
  )
}
