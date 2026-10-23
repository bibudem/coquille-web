import { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { format } from 'date-fns/format'
import { parseISO } from 'date-fns/parseISO'
import { isValid } from 'date-fns/isValid'
import { frCA } from 'date-fns/locale/fr-CA'
import revueDePresse from '../../../content/revue-de-presse/articles.json'

// Les nouvelles réunissent deux sources :
// - nos communications (content/nouvelles/**.mdx, type: interne), qui ont
//   leur propre page sur le site ;
// - la revue de presse (content/revue-de-presse/articles.json), des liens
//   vers les articles parus dans les médias.
// Le JSON est importé directement : il est petit, et l'équipe peut l'éditer
// sans connaître la structure du site.

export const TYPE_NOUVELLE = 'nouvelle'
export const TYPE_PRESSE = 'presse'

// On ne garde que « AAAA-MM-JJ » : GraphQL renvoie minuit UTC, que new Date()
// afficherait la veille au Québec. parseISO lit la date en heure locale.
function champsDate(valeur) {
  const date = parseISO(String(valeur ?? '').slice(0, 10))
  if (!isValid(date)) return null
  return {
    date: format(date, 'yyyy-MM-dd'),
    dateTexte: format(date, 'd MMMM yyyy', { locale: frCA }),
    annee: date.getFullYear(),
    timestamp: date.getTime(),
  }
}

const articlesPresse = revueDePresse
  .map((article) => {
    const dates = champsDate(article.date)
    return dates && article.title && article.url
      ? {
          id: article.url,
          type: TYPE_PRESSE,
          title: article.title,
          url: article.url,
          source: article.source,
          lang: article.lang || 'fr',
          externe: true,
          ...dates,
        }
      : null
  })
  .filter(Boolean)

/**
 * Toutes les nouvelles, de la plus récente à la plus ancienne.
 */
export default function useNouvelles() {
  const { fichiers, pages } = useStaticQuery(graphql`
    query UseNouvellesQuery {
      fichiers: allFile(filter: { sourceInstanceName: { eq: "nouvelles" }, extension: { eq: "mdx" } }) {
        nodes {
          id
          childMdx {
            frontmatter {
              date
              title
              type
            }
          }
        }
      }
      pages: allSitePage(filter: { path: { glob: "/nouvelles/**" } }) {
        nodes {
          path
          pageContext
        }
      }
    }
  `)

  return useMemo(() => {
    // Le chemin réel de chaque nouvelle, tel que gatsby-node l'a créé
    // (slug du frontmatter ou nom de fichier passé dans slugify), plutôt
    // que de le recalculer ici au risque de le rater.
    const cheminParFichier = new Map(pages.nodes.map(({ path, pageContext }) => [pageContext?.id, path]))

    const communications = fichiers.nodes
      .map(({ id, childMdx }) => {
        const { date, title, type } = childMdx?.frontmatter ?? {}
        const dates = champsDate(date)
        const url = cheminParFichier.get(id)
        return type === 'interne' && dates && title && url
          ? { id, type: TYPE_NOUVELLE, title, url, lang: 'fr', externe: false, ...dates }
          : null
      })
      .filter(Boolean)

    return [...communications, ...articlesPresse].sort((a, b) => b.timestamp - a.timestamp)
  }, [fichiers, pages])
}
