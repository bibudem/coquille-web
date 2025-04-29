import Div from '@/components/utils/Div'
import LayoutContainer from '@/components/utils/LayoutContainer'

export default function ListeHorairesContainer({ children }) {
  return (
    <LayoutContainer>
      <Div
        sx={(theme) => ({
          paddingTop: '2.1667rem',
          [theme.breakpoints.down('md')]: {
            marginLeft: '90px',
            marginRight: '90px',
          },
          [theme.breakpoints.down('sm')]: {
            marginLeft: '60px',
            marginRight: '60px',
          },
        })}
      >
        {children}
      </Div>
    </LayoutContainer>
  )
}
