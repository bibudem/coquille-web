import { IconButton, InputBase, Paper, useMediaQuery, useTheme } from '@mui/material'
import { MagnifyingGlass } from '@phosphor-icons/react'
import Div from '@/components/utils/Div'
import { styled } from '@mui/material/styles'

const SearchPaper = styled(Paper)(({ theme }) => ({
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'stretch',
  width: '100%',
  maxWidth: '33%',
  borderRadius: theme.shape.corner.full,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '66%', 
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '75%', 
  }
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '22px 0 22px 32px',
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1
    },
  },
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    '& .MuiInputBase-input': {
      padding: '18px 0 18px 24px', // Padding réduit sur mobile
    }
  }
}))

export default function SearchBox({ value, onChange }) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <SearchPaper 
      component="form"
      sx={{
        marginLeft: 'auto',
        marginTop: '20px',
        marginRight: '5%',
        [theme.breakpoints.down('sm')]: {
          marginTop: '16px',
          marginLeft: '16px !important',
          marginRight: '16px !important'
        }
      }}
    >
      <StyledInputBase
        value={value}
        onChange={onChange}
        placeholder="Chercher une bibliothèque ou un service"
        inputProps={{ 'aria-label': 'Chercher une bibliothèque ou un service' }}
        fullWidth
      />
      <Div
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: '12px',
          [theme.breakpoints.down('sm')]: {
            paddingRight: '8px'
          }
        }}
      >
        <IconButton 
          color="primary" 
          sx={{ 
            p: '10px',
            [theme.breakpoints.down('sm')]: {
              p: '8px'
            } 
          }} 
          aria-label="Chercher"
          type="submit"
        >
          <MagnifyingGlass size={isSmallScreen ? 28 : 32} color="currentColor" />
        </IconButton>
      </Div>
    </SearchPaper>
  )
}