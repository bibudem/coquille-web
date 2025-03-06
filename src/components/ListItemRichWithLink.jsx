import { Divider, IconButton, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import Button from '@/components/Button'
import Div from '@/components/utils/Div'
import isInternalLink from '../utils/internLink.js'

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
            primary={
              <Div
                sx={(theme) => ({
                  [theme.breakpoints.up('md')]: {
                    width: '66%'
                  }
                })}
              >
                <Typography component="h3" variant="h3">{title}</Typography>
              </Div>
            }
            secondary={
              <Div
                sx={(theme) => ({
                  [theme.breakpoints.up('md')]: {
                    width: '66%'
                  }
                })}
              >
                <Typography>{description}</Typography>
              </Div>
            }
          />
          {
            linkText ? (
              <Button primary href={href} onClick={onButtonClick}>{linkText}</Button>
            ) : (
              <IconButton
                color='bleuFonce'
                href={href}
              >
                {
                  isInternal ? (
                    <ArrowRight size={24} />
                  ) : (
                    <ArrowUpRight size={24} />
                  )
                }
              </IconButton>
            )
          }
        </ListItemButton>
      </ListItem>
      <Divider component="li" sx={{borderColor: 'red'}} />
    </>
  )
}