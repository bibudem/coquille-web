import { forwardRef } from 'react'
import { styled } from '@mui/material'
import LocalFooter from '@/components/_layout/Footer/LocalFooter'
import FooterTail from '@/components/_layout/Footer/FooterTail'

const FooterRoot = styled('footer', {
  name: 'BibFooter',
  slot: 'root',
})({
  paddingTop: 100,
  fontSize: '1rem',
  '*': {
    fontSize: 'inherit',
  },
})

const Footer = forwardRef(function Footer(props, ref) {
  return (
    <FooterRoot ref={ref} role="contentinfo">
      <LocalFooter />
      <FooterTail />
    </FooterRoot>
  )
})

export default Footer
