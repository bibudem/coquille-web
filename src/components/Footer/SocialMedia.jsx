import { Button, Container, Stack, IconButton, Link } from '@mui/material'
import { FacebookOutlined, Instagram, Twitter, YouTube, X } from '@mui/icons-material'

function SocialMediaLink({ children, Icon, ...props }) {
  return (
    <Button
      {...props}
      variant="text"
      rel="noopener"
      color="inherit"
      startIcon={<Icon sx={{ color: 'inherit' }} />}
      sx={{
        fontWeight: 500,
        textTransform: 'none',
      }}
    >
      {children}
    </Button>
  )
}

export default function SocialMedia() {
  return (
    <Container>
      <Stack direction="row" spacing={2} useFlexGap>
        <SocialMediaLink href="https://www.facebook.com/bibUdeM" Icon={FacebookOutlined}>
          Facebook
        </SocialMediaLink>
        <SocialMediaLink href="https://twitter.com/bibUdeM" Icon={X}>
          X (Twitter)
        </SocialMediaLink>
        <SocialMediaLink href="https://www.youtube.com/user/BibliothequesUdeM" Icon={YouTube}>
          YouTube
        </SocialMediaLink>
      </Stack>
    </Container>
  )
}
