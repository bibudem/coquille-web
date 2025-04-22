import { useEffect, useState } from 'react'
import { styled } from '@mui/material'

const ArrowRight = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"/></svg>'
const ArrowRightUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"%3E%3Cpath d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"/%3E%3C/svg%3E'

const styles = {
  base: {
    paddingLeft: 0,
  },
  variant: {
    puce: {
      listStyleType: 'disc',
      paddingLeft: '40px',
    },
    fleche: {
      paddingLeft: '.5em',
      listStyleType: 'none',

      '& > li': {
        position: 'relative',
        paddingLeft: '1.8125em',

        '&::before': {
          content: '""',
          fontSize: 'inherit',
          position: 'absolute',
          left: '4px',
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
  type: {
    ol: {
      listStyleType: 'decimal',
    },
  },
}

/**
 * Renders a customizable list component with configurable type and variant styles.
 *
 * @param {Object} props - Component properties
 * @param {'ul' | 'ol'} [props.type='ul'] - The type of list (unordered or ordered)
 * @param {'puce' | 'fleche'} [props.variant='puce'] - The list style variant
 * @param {Object} [props.style] - Additional custom styles to apply to the list
 * @returns {React.ReactElement} A styled list component
 * @throws {Error} If an invalid list type or variant is provided
 */
export default function Liste({ type = 'ul', variant = 'puce', ...rest }) {
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
    const currentStyles = {
      ...styles.base,
      ...styles.variant[variant],
      ...(type === 'ol' && styles.type[type]),
    }
    setStyles(currentStyles)
  }, [variant, type])

  return (
    <Tag role="list" sx={{ ..._styles, ...style }} {...props}>
      {children}
    </Tag>
  )
}
