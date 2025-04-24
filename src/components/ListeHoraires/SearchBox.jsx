import { IconButton, InputBase, Paper } from '@mui/material'
import { MagnifyingGlass } from '@phosphor-icons/react'
import Div from '@/components/utils/Div'

export default function SearchBox() {
  return (
    <Paper
      component="form"
      sx={(theme) => ({
        padding: '0',
        margin: 0,
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        maxWidth: '33%',
        borderRadius: theme.shape.corner.full,
      })}
    >
      <InputBase
        sx={(theme) => ({
          '& .MuiInputBase-input': {
            padding: '22px 0 22px 32px',
            '&::placeholder': {
              //
            },
          },
        })}
        placeholder="Chercher une bibliothèque ou un service"
        inputProps={{ 'aria-label': 'Chercher une bibliothèque ou un service' }}
        fullWidth
      />
      <Div
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '12px',
        }}
      >
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="Chercher">
          <MagnifyingGlass size={32} color="currentColor" />
        </IconButton>
      </Div>
    </Paper>
  )
}
