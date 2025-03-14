import { TextField } from '@mui/material'
import Section from '@/components/Section'

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
        <TextField fullWidth sx={{ color: '#fff' }} />
        <div style={{ color: '#fff', flexGrow: 0 }}>
          L'outil de recherche Sofia&nbsp;:
          <br />
          un monde de savoirs à explorer
        </div>
      </Section>
    </div>
  )
}
