import Div from '@/components/utils/Div'
import LayoutContainer from '@/components/utils/LayoutContainer'

export default function ListeHorairesContainer({ children }) {
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
        {children}
      </Div>
    </LayoutContainer>
  )
}
