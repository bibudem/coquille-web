import Link from '@/components/Link'

export default function FooterLink({ children, sx, ...props }) {
  return (
    <Link
      {...props}
      children={children}
      sx={{
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
        color: 'inherit',
        ...sx,
      }}
    />
  )
}
