import IframeResizer from '@iframe-resizer/react'
import { useEffect, useState } from 'react'

const FORMULAIRE_URL = 'https://jupiter.bib.umontreal.ca/formulaires/suggestions-achat-3.asp'
const CAS_LOGIN_URL = 'https://identification.umontreal.ca/cas/login.ashx'

export default function FormulaireSuggestionAchat() {
  const [iframeUrl, setIframeUrl] = useState('')
  const [ticketUsed, setTicketUsed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const urlParams = new URLSearchParams(window.location.search)
    const ticket = urlParams.get('ticket')
    const cleanUrl = `${window.location.origin}/nous-joindre/suggestion-achat/`

    if (ticket && !ticketUsed) {
      const src = new URL(FORMULAIRE_URL)
      const successUrl = `${cleanUrl}?submit=succes`

      src.searchParams.set('ticket', ticket)
      src.searchParams.set('hostPageUrl', cleanUrl)
      src.searchParams.set('successUrl', successUrl)

      // Ajouter les autres paramètres éventuels
      urlParams.forEach((value, key) => {
        if (key !== 'ticket') src.searchParams.set(key, value)
      })

      setIframeUrl(src.toString())
      setTicketUsed(true)

      // Le nettoyage de l'URL doit se faire plus tard
      // Pas ici pour éviter de supprimer le ticket trop vite
    } else if (!ticket && !ticketUsed) {
      // Pas de ticket, redirection vers CAS
      const serviceUrl = encodeURIComponent(cleanUrl)
      window.location.href = `${CAS_LOGIN_URL}?service=${serviceUrl}`
    }
  }, [ticketUsed])

  const handleMessage = (event) => {
    const { data } = event
    if (typeof data === 'object' && data?.authenticate) {
      const cleanUrl = `${window.location.origin}/nous-joindre/suggestion-achat/`
      window.location.href = `${CAS_LOGIN_URL}?service=${encodeURIComponent(cleanUrl)}`
    }

    // Nettoyer l'URL après réception d'un message de l'iframe (donc après chargement)
    if (typeof window !== 'undefined' && window.history) {
      const cleanUrl = `${window.location.origin}/nous-joindre/suggestion-achat/`
      window.history.replaceState(null, '', cleanUrl)
    }
  }

  if (!iframeUrl) {
    return <div>Chargement du formulaire...</div>
  }

  return (
    <IframeResizer
      license="GPLv3"
      src={iframeUrl}
      style={{ width: '100%', minHeight: '100vh', border: 'none' }}
      checkOrigin={[
        'https://jupiter.bib.umontreal.ca',
        'https://bib.umontreal.ca',
        'https://bib-pp.umontreal.ca',
        'http://localhost:8000',
        'https://api.bib.umontreal.ca',
      ]}
      onMessage={handleMessage}
      scrolling={true}
    />
  )
}
