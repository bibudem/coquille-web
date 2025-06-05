import IframeResizer from '@iframe-resizer/react'

export default function SuggestionAchat() {
  return (
    <IframeResizer
      license="GPLv3"
      src="https://jupiter.bib.umontreal.ca/formulaires/suggestions-achat-3.asp?hostPageUrl=https%3A%2F%2Fbib.umontreal.ca%2Fnous-joindre%2Fsuggestion-achat&successUrl=https%3A%2F%2Fbib.umontreal.ca%2Fnous-joindre%2Fsuggestion-achat"
      style={{
        width: '100%',
        height: '100vh',
        border: 'unset',
      }}
      waitForLoad
    />
  )
}
