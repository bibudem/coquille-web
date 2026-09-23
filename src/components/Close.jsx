import { useEffect, useRef } from 'react'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

export default function Close(props) {
  function onIconButtonClick(event) {
    event.preventDefault()
    event.stopPropagation()

    event.target.dispatchEvent(new Event('close', { bubbles: true }))
  }

  return (
    <IconButton onClick={onIconButtonClick} {...props}>
      <CloseRoundedIcon sx={{ pointerEvents: 'none' }} />
    </IconButton>
  )
}
