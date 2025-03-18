import { Divider, IconButton, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import isInternalLink from '../utils/internLink.js'

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

export default function ListItemRichWithLink({ title, description, href, linkText = null, ...rest }) {
  const { sx, ...props } = rest

  function onButtonClick(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  const isInternal = isInternalLink(href)

  return (
    <>
      <ListItem disableGutters>
        <ListItemButton component="a" href={href}>
          <ListItemText
            disableTypography
            primary={
              <Div
                sx={(theme) => ({
                  [theme.breakpoints.up('md')]: {
                    width: '83.3333%',
                  },
                  [theme.breakpoints.up('lg')]: {
                    width: '66.6667%',
                  },
                })}
              >
                <Header>{title}</Header>
              </Div>
            }
            secondary={
              <Div
                sx={(theme) => ({
                  [theme.breakpoints.up('md')]: {
                    width: '83.3333%',
                  },
                  [theme.breakpoints.up('lg')]: {
                    width: '66.6667%',
                  },
                })}
              >
                <Description>{description}</Description>
              </Div>
            }
          />
          {linkText ? (
            <Button primary href={href} onClick={onButtonClick}>
              {linkText}
            </Button>
          ) : (
            <IconButton href={href} sx={{ color: 'inherit' }}>
              {isInternal ? <ArrowRight size={24} color="currentColor" /> : <ArrowUpRight size={24} color="currentColor" />}
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>
      <Divider component="li" sx={{ borderColor: 'currentColor' }} />
    </>
  )
}
