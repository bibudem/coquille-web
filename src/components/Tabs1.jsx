import { useState, Children,useEffect } from 'react'
import { Box } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Button from '@/components/Button'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

function CustomTabPanel(props) {
  const { children, value, index, bg, ...other } = props
  const theme = useTheme()
  const isActive = value === (index + 1).toString()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      setIsMounted(true)
    }
  }, [isActive])

  return (
    <div
      role="tabpanel"
      style={{ 
        display: isActive ? 'block' : 'none',
        height: '100%',
        overflow: 'hidden'
      }}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {isMounted && (
        <Box sx={{ p: 3, height: '100%' }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  )
}



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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        width: '100%',
        typography: 'body1',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          height: '100%',
        }}
      >
        <Tabs
          orientation={isSmallScreen ? 'horizontal' : 'vertical'}
          variant={isSmallScreen ? 'scrollable' : 'standard'}
          value={value}
          onChange={handleChange}
          aria-label={ariaLabel}
          scrollButtons={isSmallScreen ? 'auto' : false}
          allowScrollButtonsMobile
          sx={{
            borderRight: isSmallScreen ? 'none' : 1,
            borderBottom: isSmallScreen ? 1 : 'none',
            borderColor: 'divider',
            minWidth: isSmallScreen ? 'auto' : 200,
          }}
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
                },
                minWidth: 120,
                '&.Mui-selected': {
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  borderBottom: isSmallScreen ? '2px solid' : 'none',
                },
                alignItems: 'flex-start',
                textAlign: 'left',
              }}
            />
          ))}
        </Tabs>
        <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
          {Children.toArray(children).map((child, index) => (
            <CustomTabPanel
              key={index}
              value={value}
              index={index}
              bg={bg}
            >
              {/* Passe la prop active au panel enfant */}
              {child && typeof child === 'object'
                ? React.cloneElement(child, {
                    active: value === (index + 1).toString(),
                  })
                : child}
            </CustomTabPanel>
          ))}
        </Box>
      </Box>
    </Box>
  )
}