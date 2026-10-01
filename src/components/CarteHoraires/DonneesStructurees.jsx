import { useSiteMetadata } from '@/hooks/use-site-metadata'

// Données structurées schema.org (JSON-LD) des lieux, pour aider les moteurs
// de recherche à répondre à « bibliothèque de droit UdeM », etc. Rendues au
// SSR, dans le HTML statique. Les heures d'ouverture n'y sont pas : elles
// viennent en direct de l'API et changent (examens, congés, fermetures).
export default function DonneesStructurees({ lieux }) {
  const { siteUrl } = useSiteMetadata()
  const pageUrl = `${siteUrl}/horaires/`

  const graph = lieux
    .filter((l) => l.addr)
    .map((l) => {
      const phone = l.contact?.find((c) => c.phone)?.phone
      const email = l.contact?.find((c) => c.email)?.email
      return {
        '@type': 'Library',
        '@id': `${pageUrl}#${l.id}`,
        name: l.name,
        url: `${pageUrl}#${l.id}`,
        address: { '@type': 'PostalAddress', streetAddress: l.addr, addressRegion: 'QC', addressCountry: 'CA' },
        ...(l.lat != null && { geo: { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lng } }),
        ...(phone && { telephone: phone }),
        ...(email && { email }),
        parentOrganization: { '@type': 'CollegeOrUniversity', name: 'Université de Montréal', url: 'https://www.umontreal.ca' },
      }
    })

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }} />
}
