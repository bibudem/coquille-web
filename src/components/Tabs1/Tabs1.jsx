import { useState, Children } from 'react'
import { Box, Grid2 as Grid } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

/**
 * A reusable React component that renders a tabbed interface with vertical tabs
 * @param {Object} props - Component props
 * @param {string[]} props.tabs - Array of tab labels
 * @param {number} [props.defaultTab=1] - Default selected tab index
 * @param {string} [props.ariaLabel=''] - Aria label for accessibility
 * @param {Object} [props.sx] - MUI sx prop for custom styling
 * @param {React.ReactNode} props.children - Tab panel content
 * @returns {React.ReactElement} Tabbed interface component
 */
export default function Tabs1({ tabs = [], defaultTab = 1, ariaLabel = '', ...rest }) {
  const { sx, children, ...props } = rest
  const [value, setValue] = useState(defaultTab)

  function handleChange(_, newValue) {
    setValue(newValue)
  }

  return (
    <Box
      sx={{ 
        width: '100%',
        typography: 'body1'
      }}
    >
      <TabContext value={value}>
        <Grid container>
          <Grid size={4}>
            <TabList 
              orientation="vertical" 
              onChange={handleChange} 
              aria-label={ariaLabel}
              slotProps={{ indicator: { style: { display: 'none' } } }}
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab} value={index + 1} compon />
              ))}
            </TabList>
          </Grid>
            <Grid size={8}>
            {Children.toArray(children).map((child, index) => (
              <TabPanel key={index} value={index + 1} sx={{ flexGrow: 1, padding: 0 }}>
                {child}
              </TabPanel>
            ))}
            </Grid>
        </Grid>
      </TabContext>
    </Box>
  )
}
