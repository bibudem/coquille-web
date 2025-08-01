import { useRef } from 'react'
import { Container, Paper, IconButton, InputBase } from '@mui/material'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { inlineOffset } from '@/components/SuperHero'
import { useSmall } from '@/hooks/use-small'

export default function RechercheSofiaAccueil() {
  const defaultActionUrl = 'https://umontreal.on.worldcat.org/search?clusterResults=true&baseScope=wz:11098&lang=fr&stickyFacetsChecked=on&changedFacet=database&database=Xwc&overrideStickyFacetDefault=true&queryString=kw:'
  const inputRef = useRef(null)
  const isSmall = useSmall()

  function onFormSubmit(event) {
    event.preventDefault()
    const value = inputRef.current.value
    const url = `${defaultActionUrl}${encodeURIComponent(value)}`
    window.location.href = url
  }

  return (
    <div
      style={{
        background: isSmall 
          ? 'rgba(34, 41, 48, 0.46)' 
          : 'linear-gradient(90deg, rgba(34, 41, 48, 0.00) 30%, rgba(34, 41, 48, 0.46) 44%, rgba(106, 128, 150, 0.46) 100%)',
      }}
    >
      <Container
        disableGutters
        sx={{
          padding: isSmall 
            ? '1.5rem 1.5rem 1.5rem 1.5rem' 
            : `2.875rem 4.125rem 2.875rem ${inlineOffset}`,
          height: isSmall ? 'auto' : '9.5625rem',
          display: 'flex',
          flexDirection: isSmall ? 'column' : 'row',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Paper
          component="form"
          action={defaultActionUrl}
          onSubmit={onFormSubmit}
          sx={(theme) => ({
            width: isSmall ? '100%' : '65%',
            borderRadius: theme.shape.corner.full,
            display: 'flex',
            gap: '.8889rem',
            alignItems: 'center',
            padding: isSmall ? '0 1rem' : '0 1rem 0 2rem',
            height: isSmall ? 56 : 80,
          })}
        >
          <InputBase 
            inputRef={inputRef} 
            fullWidth 
            placeholder="Rechercher des articles, des livres, des films..." 
            required 
            aria-description="Rechercher dans Sofia" 
          />
          <IconButton type="submit" aria-label="Chercher" color="bleuPrincipal">
            <MagnifyingGlassIcon size={isSmall ? 24 : 32} color="currentColor" />
          </IconButton>
        </Paper>
        {!isSmall && (
          <div
            style={{
              color: '#fff',
              width: '35%',
              fontWeight: 600,
              fontSize: '1.3333rem',
              lineHeight: '1.5',
            }}
          >
            L'outil de recherche Sofia&nbsp;:
            <br />
            un monde de savoirs à explorer
          </div>
        )}
      </Container>
    </div>
  )
}