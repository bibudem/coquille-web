// src/components/FormulaireConsentement.jsx
import IframeResizer from '@iframe-resizer/react'

const FORMULAIRE_URL = 'https://api.bib.umontreal.ca/usagers/formulaire/'

export default function FormulaireConsentement() {
  // Détermination de l'environnement
  const isProduction = typeof window !== 'undefined' && window.location.hostname === 'bib.umontreal.ca'
  const isPreProduction = typeof window !== 'undefined' && window.location.hostname === 'bib-pp.umontreal.ca'
  
  // Configuration des URLs selon l'environnement
  const BASE_URL = isProduction 
    ? 'https://bib.umontreal.ca' 
    : isPreProduction
      ? 'https://bib-pp.umontreal.ca'
      : 'http://localhost:8000'

  const hostPageUrl = `${BASE_URL}${typeof window !== 'undefined' ? window.location.pathname : ''}`
  const successUrl = `${BASE_URL}/pret-renouvellement-avis/formulaire-consentement`

  // Construction de l'URL du formulaire
  const src = new URL(FORMULAIRE_URL)
  src.searchParams.set('hostPageUrl', hostPageUrl)
  src.searchParams.set('successUrl', successUrl)

  // Gestion du ticket CAS côté client
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('ticket')) {
      src.searchParams.set('ticket', urlParams.get('ticket'))
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  function onMessage(event) {
    const { data } = event
    if (typeof data === 'object') {
      // Gestion de l'authentification CAS
      if (data?.authenticate) {
        window.location.replace(
          `https://identification.umontreal.ca/cas/login.ashx?service=${encodeURIComponent(window.location.href)}`
        )
      }
      // Gestion de la navigation
      else if (data?.navigate) {
        data.navigate ? window.location.assign(data.navigate) : window.location.reload()
      }
    }
  }

  return (
    <IframeResizer
      license="GPLv3"
      src={src.href}
      style={{
        width: '100%',
        minHeight: '160vh',
        height:'auto',
        border: 'none',
      }}
      checkOrigin={[BASE_URL, FORMULAIRE_URL]}
      log={!isProduction}
      waitForLoad
      onMessage={onMessage}
      scrolling={true} // Désactive les barres de défilement internes
    sizeWidth={true}
    />
  )
}