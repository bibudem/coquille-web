import Link from '@/components/Link'

export default function FooterLink({ children, sx, ...props }) {
  return (
    <Link
      {...props}
      children={children}
      sx={{
        ...sx,
        textDecoration: 'none',
        color: 'inherit',
      }}
    />
  )
}
