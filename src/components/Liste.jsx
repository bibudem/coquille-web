import { useEffect, useState } from 'react'
import { styled } from '@mui/material'

const ArrowRight = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"/></svg>'
const ArrowRightUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"%3E%3Cpath d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"/%3E%3C/svg%3E'

const styles = {
  variant: {
    puce: {
      listStyleType: 'disc',
    },
    fleche: {
      listStyleType: 'none',

      '& > li': {
        position: 'relative',
        paddingLeft: '1.5em',

        '&::before': {
          content: '""',
          fontSize: 'inherit',
          position: 'absolute',
          left: 0,
          top: '0.2916em',
          width: '1em',
          height: '1em',
          backgroundImage: `url('${ArrowRightUrl}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1em',
        },
      },
    },
  },
  markerPosition: {
    outside: {
      listStylePosition: 'outside',
    },
    inside: {
      listStylePosition: 'inside',
    },
  },
}

export default function Liste({ type = 'ul', variant = 'puce', markerPosition = 'outside', ...rest }) {
  const { style, children, ...props } = rest
  const Tag = styled(type)()
  const [_styles, setStyles] = useState(null)

  useEffect(() => {
    if (!['ul', 'ol'].includes(type)) {
      throw new Error(`Le paramètre type doit être "ul" ou "ol". Valeur rencontrée: ${type}`)
    }
  }, [type])

  useEffect(() => {
    if (!['puce', 'fleche'].includes(variant)) {
      throw new Error(`Le paramètre variant doit être "puce" ou "fleche" (sans accent). Valeur rencontrée: ${variant}`)
    }
  }, [variant])

  useEffect(() => {
    if (!['outside', 'inside'].includes(markerPosition)) {
      throw new Error(`Le paramètre markerPosition doit être "outside" ou "inside". Valeur rencontrée: ${markerPosition}`)
    }
  }, [markerPosition])

  useEffect(() => {
    setStyles({
      ...styles.variant[variant],
      ...styles.markerPosition[markerPosition],
    })
  }, [variant, markerPosition])

  return (
    <Tag role="list" sx={{ ..._styles, ...style }} {...props}>
      {children}
    </Tag>
  )
}
