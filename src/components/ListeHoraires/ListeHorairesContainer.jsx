import Div from '@/components/utils/Div'
import LayoutContainer from '@/components/utils/LayoutContainer'
import codeBibs from 'code-bib'

// Fonction pour normaliser les chaînes (enlever les accents)
const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

export default function ListeHorairesContainer({ children, searchTerm = '' }) {
  return (
    <LayoutContainer>
      <Div
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
      >
        {React.Children.toArray(children).filter(child => {
          if (child.props?.codeBib) {
            const bibTitle = codeBibs[child.props.codeBib]?.court || ''
            const normalizedTitle = normalizeString(bibTitle)
            const normalizedSearch = normalizeString(searchTerm)
            return normalizedTitle.includes(normalizedSearch)
          }
          return true
        })}
      </Div>
    </LayoutContainer>
  )
}