import Div from '@/components/utils/Div'

export default function LayoutContainer({ children }) {
  return (
    <Div
      sx={(theme) => ({
        margin: '0 auto',
        maxWidth: `${theme.breakpoints.values[theme.breakpoints.keys.at(-1)]}${theme.breakpoints.unit}`,
        paddingLeft: '20px',
        paddingRight: '20px',
        [theme.breakpoints.up('md')]: {
          paddingLeft: '64px',
          paddingRight: '64px',
        },
      })}
    >
      {children}
    </Div>
  )
}
