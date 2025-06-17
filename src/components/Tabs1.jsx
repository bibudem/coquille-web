import { useState, Children } from 'react'
import { Box, Grid2 as Grid } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@/components/Button'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

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
export default function Tabs1({ tabs = [], defaultTab = 1, ariaLabel = '', bg, ...rest }) {
  const { sx, children, ...props } = rest
  const [value, setValue] = useState(defaultTab.toString())
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'))

  function handleChange(_, newValue) {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Grid
          container
          gap={2}
          sx={{
            flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
            flexDirection: isSmallScreen ? 'column' : 'row',
          }}
        >
          <Grid xs={12} lg={4} xl={4}>
            <TabList
              orientation={isSmallScreen ? 'horizontal' : 'vertical'}
              onChange={handleChange}
              aria-label={ariaLabel}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab}
                  value={(index + 1).toString()}
                  component={Button}
                  primary
                  sx={{
                    fontSize: {
                      xs: '0.875rem',
                      sm: '1rem',
                      md: '1.125rem',
                      lg: '1.125rem',
                    },
                  }}
                />
              ))}
            </TabList>
          </Grid>
          <Grid xs={12} lg={8} xl={8} sx={{ minHeight: '400px' }}>
            {Children.toArray(children).map((child, index) => (
              <TabPanel
                key={index}
                value={(index + 1).toString()}
                sx={{
                  height: '100%',
                  flexGrow: 1,
                  ...(bg
                    ? {
                        backgroundColor: bg,
                        borderRadius: theme.shape.corner?.small || 8,
                        padding: '1.1875rem 3.125rem 3.125rem 3.125rem',
                      }
                    : {
                        padding: 0,
                      }),
                  [theme.breakpoints.up('lg')]: {
                    paddingLeft: '2rem',
                  },
                }}
              >
                {/* Passe la prop active au panel enfant */}
                {child && typeof child === 'object'
                  ? React.cloneElement(child, {
                      active: value === (index + 1).toString(),
                    })
                  : child}
              </TabPanel>
            ))}
          </Grid>
        </Grid>
      </TabContext>
    </Box>
  )
}
