import SEO from '@/components/_layout/SEO'

export function Head({ pageContext, location, ...rest }) {
  const { children } = rest
  const { frontmatter = {} } = pageContext
  const { noIndex, title } = frontmatter
  const { pathname } = location
  return (
    <>
      <html lang="fr" />
      <SEO title={title} pathname={pathname} />
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@1/dist/bib-gtm.min.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@1/dist/bib-avis.min.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@1/dist/bib-retroaction-usager.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@1/dist/udem-urgence.min.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@1/dist/bib-consent.min.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/gh/bibudem/ui@1/dist/bib-consent-preferences-btn.min.js"></script>
      <bib-gtm></bib-gtm>

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {children}
    </>
  )
}
