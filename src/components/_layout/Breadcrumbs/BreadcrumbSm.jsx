import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Breadcrumbs as MuiBreadcrumbs, IconButton, Link, Menu, MenuItem } from '@mui/material'
import { DotsThreeCircleIcon, HouseLineIcon } from '@phosphor-icons/react'
import secondaryNavData from '../../../../public/site-navigation.json'
import { SecondaryNav } from '../SecondaryNav/SecondaryNavSm'
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'underline',
  ':hover': {
    textDecoration: 'none',
  },
}))

export default function BreadcrumbsSm({ crumbs, location }) {
  console.log('[x] crumbs:', crumbs)
  console.log('[x] location:', location)
  const [data, setData] = useState(null)

  useEffect(() => {
    function getMenuForCrumb(crumbsData, currentNode, currentIndex) {
      console.group('[x] ' + currentIndex)
      function stripLastSlash(url) {
        return url.replace(/\/$/, '')
      }

      const { crumbsMenu, navData } = crumbsData

      // Renommage de crumbLabel -> label
      const { crumbLabel: label, ...rest } = currentNode
      currentNode = { label, ...rest }

      console.log('[x] currentIndex:', currentIndex)
      console.log('[x] in current data:', crumbsData)

      const currentCrumbPath = stripLastSlash(crumbsData.crumbs[currentIndex].pathname)
      console.log('[x] currentCrumbPath:', currentCrumbPath)

      // Don't create a menu on the root (first) crumb
      if (currentIndex === 0) {
        crumbsMenu.push(currentNode)
        return crumbsData
      }

      console.log('[x] navData:', navData)

      const nextNavData = navData.find((node) => {
        const path = stripLastSlash(node.path)

        return path === currentCrumbPath
      })

      console.log('[x] nextNavData:', nextNavData)

      if (nextNavData) {
        const siblings = navData.map(({ title, order, path }) => ({ title, order, pathname: path }))

        crumbsData.crumbsMenu.push({ ...currentNode, siblings })
        crumbsData.navData = nextNavData.children
        console.log('[x] out next crumbsData:', crumbsData)
      }

      console.groupEnd()

      return crumbsData
    }

    if (secondaryNavData && crumbs) {
      // const rootPath = `/${currentLocation.pathname
      //   .split('/')
      //   .filter((_) => _) // Quick way to get rid of falsy items in the array
      //   .shift()}/`

      // const rootNode = secondaryNavData.find(({ path }) => path === rootPath)
      console.log('[x] crumbs:', crumbs)
      const crumbMenuData = crumbs.reduce(getMenuForCrumb, { crumbsMenu: [], navData: secondaryNavData, crumbs })

      console.log('[x] Result crumb menu:', crumbMenuData)

      setData(crumbMenuData.crumbsMenu)
    }
  }, [secondaryNavData, crumbs])

  return (
    data && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '24px',
        }}
      >
        <MuiBreadcrumbs
          className="bib-comp-breadcrumbs"
          aria-label="Fil d'ariane"
          sx={{
            '.MuiBreadcrumbs-li': {
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '.5ch',
            },
          }}
        >
          {data.map((node, index) => {
            const { pathname } = node
            const isLeaf = index === crumbs.length - 1
            const isRoot = index === 0

            return <Breadcrumb key={pathname} data={node} isLeaf={isLeaf} isRoot={isRoot} sx={{ display: 'flex' }} />
          })}
        </MuiBreadcrumbs>
        <BreadcrumbMenu location={location} />
      </Box>
    )
  )
}

function Breadcrumb({ data, isRoot, isLeaf }) {
  console.log('[x] arguments:', arguments)

  const { pathname, label, siblings } = data

  if (isLeaf) {
    return <span>{label}</span>
  }

  return (
    <>
      <StyledLink href={isLeaf ? null : pathname}>{isRoot ? <HouseLineIcon size="1.125rem" /> : label}</StyledLink>
    </>
  )
}

function BreadcrumbMenu({ data = [], location }) {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size="small" aria-label="Menu de cette section" {...bindTrigger(popupState)}>
        <DotsThreeCircleIcon size="1em" />
      </IconButton>
      <Menu
        id="basic-menu"
        keepMounted
        elevation={4}
        // anchorEl={anchorEl}
        // open={open}
        // onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...bindMenu(popupState)}
      >
        {/* {data.map(({ title, pathname }) => (
          <MenuItem onClick={handleClose} href={pathname}>
            {title}
          </MenuItem>
        ))} */}
        <SecondaryNav currentLocation={location} />
      </Menu>
    </>
  )
}
