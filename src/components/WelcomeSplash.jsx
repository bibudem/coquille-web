import { Typography } from '@mui/material'

export default function WelcomeSplash({ title, image, ...rest }) {
  if (typeof title === 'undefined') {
    throw new Error('title prop is required')
  }

  if (typeof image === 'undefined') {
    throw new Error('image prop is required')
  }

  const { children, ...props } = rest
  return (
    <div
      style={{
        outline: '1px solid red',
        height: '49.75rem',
        background: `url(${image}) no-repeat center center`,
        backgroundSize: 'cover',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {typeof title === 'string' ? <Typography variant="h1">{title}</Typography> : title}

      {children}
    </div>
  )
}
