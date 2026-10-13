import { forwardRef } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import MuiLink from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { isInternalLink } from '../utils/link.js'

const linkStyles = {
  color: 'bleuPrincipal.main',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}

const iconStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.375em',
}

const A = styled('a')({})

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = forwardRef(function Link(props, ref) {
  const { children, sx, Icon, iconProps, to = '#', href, ...rest } = props

  // Le routage de Gatsby ne sait suivre que des chemins du site (« /espaces/ »,
  // « ../peb/ ») : une adresse absolue, même d'un sous-domaine des
  // Bibliothèques (studio.bib.umontreal.ca), va dans un <a> ordinaire. Sinon
  // Gatsby avertit « External link detected » et le lien ne fonctionne qu'à
  // moitié. isInternalLink garde son sens (famille Bibliothèques) pour le
  // choix des icônes ailleurs dans le site.
  const isRelative = typeof to === 'string' && !/^[a-z][a-z\d+.-]*:|^\/\//i.test(to.trim())
  const isInternal = isRelative && isInternalLink(to)
  const styles = Icon ? { ...linkStyles, ...iconStyles } : { ...linkStyles }
  const _iconProps = { size: '1.125rem', color: 'currentColor', ...iconProps }

  // Pas d'icône du tout quand Icon est absent : l'évaluer quand même donnait
  // un avertissement React « type is invalid » pour chaque lien sans icône.
  const icon = !Icon ? null : typeof Icon === 'boolean' ? <ArrowRight {..._iconProps} /> : <Icon {..._iconProps} />

  // Gatsby Link pour les chemins du site, <a> pour le reste
  if (!isInternal) {
    return (
      <A ref={ref} href={to} sx={{ ...styles, ...sx }} {...rest}>
        {children}
        {Icon && icon}
      </A>
    )
  }

  return (
    <MuiLink ref={ref} component={GatsbyLink} to={to} sx={{ ...styles, ...sx }} {...rest}>
      {children}
      {Icon && icon}
    </MuiLink>
  )
})

Link.muiName = MuiLink.muiName

export default Link
