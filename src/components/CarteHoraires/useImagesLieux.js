import { graphql, useStaticQuery } from 'gatsby'

// Photos des bibliothèques (content/bibliotheques/images), nommées d'après
// le code de bibliothèque de l'API (ss.jpg, mu.jpg…). La vignette prend la
// hauteur de la fiche et recadre la photo : on garde le format d'origine,
// en 640 px, pour qu'elle reste nette une fois recadrée.
export default function useImagesLieux() {
  const data = useStaticQuery(graphql`
    query CarteHorairesImagesQuery {
      allFile(filter: { sourceInstanceName: { eq: "bibliotheques" }, relativePath: { glob: "images/*" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 640, placeholder: BLURRED, quality: 75)
          }
        }
      }
    }
  `)

  return Object.fromEntries(data.allFile.nodes.filter((node) => node.childImageSharp).map((node) => [node.name, node.childImageSharp.gatsbyImageData]))
}
