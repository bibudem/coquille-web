import { IconButton, InputBase, Paper } from '@mui/material'
import { MagnifyingGlass } from '@phosphor-icons/react'

export default function SearchBox() {
  return (
    <Paper
      component="form"
      sx={(theme) => ({
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderRadius: theme.shape.corner.full,
      })}
    >
      <InputBase
        sx={(theme) => ({
          // backgroundColor: '#fff',
          ml: 1,
          flex: 1,
        })}
        placeholder="Chercher une bibliothèque ou un service"
        inputProps={{ 'aria-label': 'Chercher une bibliothèque ou un service' }}
        fullWidth
      />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <MagnifyingGlass size={32} color="currentColor" />
      </IconButton>
    </Paper>
  )
}
