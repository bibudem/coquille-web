import { Paper, IconButton, InputBase, TextField } from '@mui/material'
import Section from '@/components/Section'
import SearchIcon from '@mui/icons-material/Search'
import { MagnifyingGlass } from '@phosphor-icons/react'

export default function RechercheSofiaAccueil() {
  return (
    <div
      style={{
        background: '#00000022',
      }}
    >
      <Section
        sx={{
          padding: 0,
          padding: '2.875rem 4.125rem 2.875rem 4rem',
          height: '9.5625rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Paper
          component="form"
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
          <InputBase fullWidth placeholder="Rechercher des articles, des livres, des films..." />
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
      </Section>
    </div>
  )
}
