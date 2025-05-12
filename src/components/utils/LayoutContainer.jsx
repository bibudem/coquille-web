import Div from '@/components/utils/Div'

export default function LayoutContainer({ sx, children, ...props }) {
  return (
    <Div sx={sx}>
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
        {...props}
      >
        {children}
      </Div>
    </Div>
  )
}
