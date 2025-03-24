import { Divider, IconButton, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'
import isInternalLink from '../utils/internLink.js'
import { useEffect, useState } from 'react'

function Header({ children }) {
  return (
    <h3
      style={{
        margin: 0,
        padding: 0,
        fontSize: '2rem',
        fontWeight: 500,
        lineHeight: 1.2,
      }}
    >
      {children}
    </h3>
  )
}

function Description({ children }) {
  return (
    <div
      style={{
        padding: '.75rem 0 0',
        fontSize: '17px',
        lineHeight: 1.4,
      }}
    >
      {children}
    </div>
  )
}

export default function RichListItemWithLink({ title, description, href, linkText = null, color = 'default', ...rest }) {
  const { sx, ...props } = rest
  const theme = useTheme()
  const isSmall = useSmall('md')
  const [flexSettings, setFlexSettings] = useState()

  const colorsSettings = {
    default: {
      icon: {
        bg: theme.palette.bleuFonce.main,
        color: '#fff',
      },
      divider: theme.palette.bleuPrincipal.main,
    },
    vertFonce: {
      icon: {
        bg: theme.palette.vertPale.main,
        color: '#fff',
      },
      divider: 'currentColor',
    },
  }

  useEffect(() => {
    setFlexSettings({
      direction: isSmall ? 'column' : 'row',
      alignItems: isSmall ? 'flex-start' : 'center',
      marginBottom: isSmall ? '.75rem' : 0,
    })
  }, [isSmall])

  const [colors, setColors] = useState(colorsSettings.default)

  function onButtonClick(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  const isInternal = isInternalLink(href)

  useEffect(() => {
    setColors(colorsSettings[color])
  }, [color])

  return (
    <>
      <ListItem disableGutters>
        <ListItemButton
          component="a"
          href={href}
          sx={{
            margin: '0 -1rem 0',
            flexDirection: flexSettings?.direction,
            gap: '1rem',
            alignItems: flexSettings?.alignItems,
          }}
        >
          <ListItemText
            disableTypography
            primary={
              <Div
                sx={(theme) => ({
                  width: '100%',
                  [theme.breakpoints.up('md')]: {
                    maxWidth: '83.3333%',
                  },
                  [theme.breakpoints.up('lg')]: {
                    maxWidth: '66.6667%',
                  },
                })}
              >
                <Header>{title}</Header>
              </Div>
            }
            secondary={
              <Div
                sx={(theme) => ({
                  width: '100%',
                  [theme.breakpoints.up('md')]: {
                    maxWidth: '83.3333%',
                  },
                  [theme.breakpoints.up('lg')]: {
                    maxWidth: '66.6667%',
                  },
                })}
              >
                <Description>{description}</Description>
              </Div>
            }
          />
          {linkText ? (
            <Button primary href={href} onClick={onButtonClick} sx={{ flex: 'none', marginBottom: flexSettings?.marginBottom }}>
              {linkText}
            </Button>
          ) : (
            <IconButton
              href={href}
              sx={{
                color: 'inherit',
                marginBottom: flexSettings?.marginBottom,
                backgroundColor: colors.icon.bg,
                '&:hover': {
                  backgroundColor: colors.icon.bg,
                },
              }}
              onClick={onButtonClick}
            >
              {isInternal ? <ArrowRight size={24} color={colors.icon.color} /> : <ArrowUpRight size={24} color={colors.icon.color} />}
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>
      <Divider component="li" sx={{ borderColor: colors.divider, margin: 0 }} aria-hidden role={null} />
    </>
  )
}
