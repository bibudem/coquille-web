import { styled } from '@mui/material'

const LayoutTable = styled('table')({
  borderCollapse: 'collapse',
})

export default LayoutTable

export const Tr = styled('tr')({})
LayoutTable.Tr = Tr

export const Td = styled('td')({
  padding: 0,
})
LayoutTable.Td = Td

export const Th = styled('th')({
  padding: 0,
})
LayoutTable.Th = Th
