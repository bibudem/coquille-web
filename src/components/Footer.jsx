import { styled } from '@mui/material'
import LocalFooter from '@/components/Footer/LocalFooter'
import UdeMFooter from '@/components/Footer/UdeMFooter'
import { forwardRef } from 'react'

const FooterRoot = styled('footer', {
  name: 'BibFooter',
  slot: 'root',
})(({ theme }) => ({
  paddingTop: 100,
  fontSize: '1rem',
  '*': {
    fontSize: 'inherit',
  },
}))

const Footer = forwardRef(function Footer(props, ref) {
  return (
    <FooterRoot ref={ref} role="contentinfo">
      <LocalFooter />
      <UdeMFooter />
    </FooterRoot>
  )
})

export default Footer
