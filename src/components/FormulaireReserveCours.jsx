import IframeResizer from '@iframe-resizer/react'

const FORM_URL = 'https://jupiter.bib.umontreal.ca/formulaires/reserve-cours-3.asp'

export default function FormulaireReserveCours({ hostPageUrl = 'https://bib.umontreal.ca/enseignement/formulaire-reserve', successUrl }) {
  // hostPageUrl param validation
  try {
    new URL(hostPageUrl)
  } catch (error) {
    throw new Error('The `hostPageUrl` parameter must be a valid URL')
  }

  successUrl = successUrl || `${hostPageUrl}/succes`

  const src = new URL(FORM_URL)

  src.searchParams.set('hostPageUrl', hostPageUrl)
  src.searchParams.set('successUrl', successUrl)

  return (
    <IframeResizer
      license="GPLv3"
      src={src.href}
      style={{
        width: '100%',
        height: '100vh',
        border: 'unset',
      }}
      waitForLoad
    />
  )
}
