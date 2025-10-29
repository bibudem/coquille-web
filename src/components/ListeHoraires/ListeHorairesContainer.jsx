import { useLocation } from '@reach/router'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import LayoutContainer from '@/components/utils/LayoutContainer'
import codeBibs from 'code-bib'

// Fonction pour normaliser les chaînes (enlever les accents)
const normalizeString = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export default function ListeHorairesContainer({ children, searchTerm = '' }) {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Petit délai pour s'assurer que tout est rendu
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.hash, searchTerm])
  return (
    <LayoutContainer>
      <Box
        sx={(theme) => ({
          paddingTop: '2.1667rem',
          [theme.breakpoints.down('md')]: {
            marginLeft: '60px',
            marginRight: '60px',
          },
          [theme.breakpoints.down('sm')]: {
            marginLeft: '40px',
            marginRight: '40px',
          },
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        })}
        data-clarity-unmask="true"
      >
        {React.Children.toArray(children).filter((child) => {
          if (child.props?.codeBib) {
            const bibTitle = codeBibs[child.props.codeBib]?.court || ''
            const normalizedTitle = normalizeString(bibTitle)
            const normalizedSearch = normalizeString(searchTerm)
            return normalizedTitle.includes(normalizedSearch)
          }
          return true
        })}
      </Box>
    </LayoutContainer>
  )
}
