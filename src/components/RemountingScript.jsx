import { useEffect } from 'react'

/**
 * Charge un script tiers qui doit s'exécuter à nouveau à chaque montage de la
 * page qui l'utilise — typiquement un widget/formulaire externe (LibWizard,
 * UneQuestion, etc.) dont le script va chercher un `<div id="...">` par son
 * id et y injecte son contenu.
 *
 * Le composant `<Script>` de gatsby-script ne convient PAS pour ce cas : il
 * déduplique les scripts par `src` dans un `Set` global au module, jamais
 * vidé (voir node_modules/gatsby-script/dist/index.modern.mjs, fonction
 * `y()` : `if (u.has(s)) return null` avant même de créer la balise
 * <script>). Cette déduplication est correcte pour un script à charger une
 * seule fois par session (ex. un tag analytics), mais pas ici : après une
 * navigation cliente (Link) qui quitte la page puis y revient, le `<div>`
 * cible est bel et bien recréé, vide, mais gatsby-script refuse de
 * réinjecter le `<script>` puisqu'il l'a déjà vu une fois — le widget ne
 * s'initialise donc plus jamais après le premier passage sur la page, pour
 * le reste de la session du navigateur.
 *
 * On charge donc le script nous-mêmes, dans un `useEffect` propre à ce
 * composant, en dehors du mécanisme de déduplication de gatsby-script : à
 * chaque montage, une nouvelle balise <script> est ajoutée (et réellement
 * réexécutée par le navigateur), puis retirée au démontage avec le contenu
 * qu'elle avait injecté dans le conteneur.
 */
export default function RemountingScript({ containerId, src }) {
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return undefined

    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)

    return () => {
      script.remove()
      container.innerHTML = ''
    }
  }, [containerId, src])

  return <div id={containerId} />
}
