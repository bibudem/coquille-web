import Div from '@/components/utils/Div'

export default function Bloc({ title, Icon, children }) {
  return (
    <Div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        lineHeight: 1.5,
        '& p, & dd': {
          margin: 0,
        },
        '& ul, & ol': {
          margin: 0,
          paddingLeft: '1em',
        },
      }}
    >
      {title && Icon && <BlocTitle Icon={Icon}>{title}</BlocTitle>}
      <Div sx={{ fontSize: '16px' }}>{children}</Div>
    </Div>
  )
}

export function BlocTitle({ Icon, children }) {
  return (
    <Div
      sx={{
        display: 'flex',
        gap: '.5rem',
        fontSize: '1.3125rem',
        fontWeight: 500,
        lineHeight: 1.3,
        color: 'bleuPrincipal.main',
      }}
    >
      <Icon size="1.5rem" color="currentColor" />
      {children}
    </Div>
  )
}
