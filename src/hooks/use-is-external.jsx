import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import isExternalLink from '@/utils/internLink'
import { ArrowRightCircleIcon, ArrowUpRightCircleIcon } from '@/components/CustomIcons'

export function useIsExternal(href, { icons } = {}) {
  const theme = useTheme()
  const [isExternal, setIsExternal] = useState(null)
  const [linkProps, setLinkProps] = useState({})
  const [linkIcon, setLinkIcon] = useState(null)
  const [_icons, setIcons] = useState({
    internal: <ArrowUpRightCircleIcon color={theme.palette.bleuPrincipal.main} fontSize={50} />,
    external: <ArrowRightCircleIcon color={theme.palette.bleuPrincipal.main} fontSize={50} />,
  })

  useEffect(() => {
    setIsExternal(isExternalLink(href))
  }, [href])

  useEffect(() => {
    if (isExternal) {
      setLinkProps({
        rel: 'noopener',
      })
    } else {
      setLinkProps({})
    }
  }, [isExternal])

  useEffect(() => {
    if (icons) {
      setIcons(icons)
    }
  }, [icons])

  useEffect(() => {
    if (isExternal) {
      setLinkIcon(_icons.external)
    } else {
      setLinkIcon(_icons.internal)
    }
  }, [isExternal])

  return { isExternal, linkProps, linkIcon }
}
