import { Typography } from '@mui/material'
import Section from '@/components/Section'
import { appBarHeight } from '@/components/AppBar/TopAppBar'

const boxSize = {
  height: '49.75rem',
  width: '100%',
}

export default function WelcomeSplash({ title, subTitle, image, ...rest }) {
  if (typeof title === 'undefined') {
    throw new Error('title prop is required')
  }

  if (typeof image === 'undefined') {
    throw new Error('image prop is required')
  }

  const { children, ...props } = rest
  // const hasChildren = Boolean(children.type() !== null)

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          outline: '1px solid red',
          ...boxSize,
          // background: `url(${image}) no-repeat center center`,
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.48) 5%, rgba(104, 104, 104, 0.11) 22%, rgba(255, 255, 255, 0.00) 36%), url(${image}) lightgray 50% / cover no-repeat`,
          backgroundSize: 'cover',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Section
          sx={{
            padding: `0 0 4.25rem 5.69rem`,
          }}
        >
          <Typography variant="display1" component="h1">
            {title}
          </Typography>
          {subTitle}
        </Section>
        {children}
      </div>
      <div
        style={{
          width: boxSize.width,
          height: `calc(${boxSize.height} - ${appBarHeight})`,
        }}
      />
    </>
  )
}
