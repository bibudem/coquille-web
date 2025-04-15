import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'

export default function Bloc({ title, Icon, children }) {
  return (
    <Div
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8333rem',
        [theme.breakpoints.up('md')]: {
          gap: '1rem',
        },

        lineHeight: 1.5,
        '& p, & dd, & ol, & ul': {
          margin: 0,
        },
        '& ul, & ol': {
          paddingLeft: '1em',
        },
        '& p, & li': {
          marginBottom: '.3333em',
        },
      })}
    >
      {title && <BlocTitle Icon={Icon}>{title}</BlocTitle>}
      <Div sx={{ fontSize: '16px' }}>{children}</Div>
    </Div>
  )
}

export function BlocTitle({ Icon, children }) {
  const isSmall = useSmall('md')
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
      {Icon && !isSmall && <Icon size="1.5rem" color="currentColor" />}
      {children}
    </Div>
  )
}
