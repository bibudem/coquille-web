import { useContext, useEffect, useRef } from 'react'
import { Container, Paper, IconButton, InputBase } from '@mui/material'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { inlineOffset, SuperHeroContext } from '@/components/SuperHero'
import { useSmall } from '@/hooks/use-small'

export default function RechercheSofiaAccueil() {
  const defaultActionUrl = 'https://umontreal.on.worldcat.org/search?clusterResults=true&baseScope=wz:11098&lang=fr&stickyFacetsChecked=on&changedFacet=database&database=Xwc&overrideStickyFacetDefault=true&queryString=kw:'
  const superHeroSettings = useContext(SuperHeroContext)
  const inputRef = useRef(null)
  const isSmall = useSmall()

  function onFormSubmit(event) {
    event.preventDefault()
    const value = inputRef.current.value
    const url = `${defaultActionUrl}${encodeURIComponent(value)}`
    window.location.href = url
  }

  useEffect(() => {
    console.log('superHeroSettings', superHeroSettings)
  }, [superHeroSettings])

  return (
    !isSmall && (
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(34, 41, 48, 0.00) 30%, rgba(34, 41, 48, 0.46) 44%, rgba(106, 128, 150, 0.46) 100%)',
        }}
      >
        <Container
          disableGutters
          sx={{
            padding: `2.875rem 4.125rem 2.875rem ${inlineOffset}`,
            height: '9.5625rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Paper
            component="form"
            action={defaultActionUrl}
            onSubmit={onFormSubmit}
            sx={(theme) => ({
              width: '65%',
              borderRadius: theme.shape.corner.full,
              display: 'flex',
              gap: '.8889rem',
              alignItems: 'center',
              padding: '0 1rem 0 2rem',
              height: 80,
            })}
          >
            <InputBase inputRef={inputRef} fullWidth placeholder="Rechercher des articles, des livres, des films..." required aria-description="Rechercher dans Sofia" />
            <IconButton type="submit" aria-label="Chercher" color="bleuPrincipal">
              <MagnifyingGlass size={32} color="currentColor" />
            </IconButton>
          </Paper>
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
        </Container>
      </div>
    )
  )
}
