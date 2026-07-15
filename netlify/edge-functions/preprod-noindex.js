// bib-pp.umontreal.ca et bib.umontreal.ca servent le même build Gatsby : le
// robots.txt statique généré au build (voir gatsby-config.mjs) est donc
// identique sur les deux domaines et ne peut pas bloquer l'un sans bloquer
// l'autre. Seule une Edge Function, qui voit le Host de chaque requête, peut
// distinguer les deux domaines à la volée.
//
// Ici, uniquement pour bib-pp.umontreal.ca (le préprod, qui ne doit jamais
// être indexé ni cité) : on sert un robots.txt qui bloque tout, et on injecte
// un <meta name="robots" content="noindex, nofollow"> sur chaque page HTML.
const PREPROD_HOSTNAME = 'bib-pp.umontreal.ca'

export default async (request, context) => {
  const url = new URL(request.url)

  if (url.hostname !== PREPROD_HOSTNAME) {
    return
  }

  if (url.pathname === '/robots.txt') {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  const response = await context.next()
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/html')) {
    return response
  }

  // Remplacement de texte simple plutôt que HTMLRewriter : évite une
  // dépendance externe (non versionnée) pour insérer une seule balise dans
  // un <head> dont on connaît le format exact (généré par Gatsby, sans
  // attributs).
  const html = await response.text()
  // content-length retiré : le corps change de taille, la valeur d'origine
  // serait fausse (le runtime recalcule/gère l'encodage du transfert).
  const headers = new Headers(response.headers)
  headers.delete('content-length')
  return new Response(html.replace('<head>', '<head><meta name="robots" content="noindex, nofollow">'), {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export const config = { path: '/*' }
