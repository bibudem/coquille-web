import Div from '@/components/utils/Div'

export default function FooterContainer({ sx, children }) {
  return (
    <Div sx={sx}>
      <Div
        sx={(theme) => ({
          width: '100%',
          maxWidth: theme.breakpoints.values[theme.breakpoints.keys[theme.breakpoints.keys.length - 1]],
          marginInline: 'auto',
        })}
      >
        {children}
      </Div>
    </Div>
  )
}
