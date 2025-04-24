import { useContext, useEffect, useMemo, useState } from 'react'
import { Container, IconButton } from '@mui/material'
import Div from '@/components/utils/Div'
import { appBarHeight } from '@/components/_layout/AppBar/TopAppBar'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { HoraireBibContext } from './HoraireBibContext'
import SearchBox from './SearchBox'
import { useSmall } from '@/hooks/use-small'

export default function Banner({ ...rest }) {
  const { children, sx, ...props } = rest
  const isSmall = useSmall('md')
  const { currentWeekTitle, nav } = useContext(HoraireBibContext)
  const [top, setTop] = useState(0)

  useEffect(() => {
    setTop(isSmall ? 0 : appBarHeight)
  }, [isSmall])

  return (
    <Div sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', position: 'sticky', top }} {...props}>
      <Container disableGutters sx={{ padding: '0 64px' }}>
        <Div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            fontSize: '1.3333rem',
          }}
        >
          <Div>
            <SearchBox />
          </Div>
          <Div
            sx={{
              display: 'flex',
              alignItems: 'center',
              margin: '0 auto',
              gap: '10px',
            }}
          >
            <Div>
              <IconButton aria-label="précédent" sx={{ color: 'inherit' }} onClick={() => nav(-1)}>
                <CaretLeft color="currentColor" />
              </IconButton>
            </Div>
            <Div
              sx={(theme) => ({
                textAlign: 'center',
                [theme.breakpoints.up('md')]: {
                  minWidth: '300px',
                },
                [theme.breakpoints.up('lg')]: {
                  minWidth: '445px',
                },
              })}
            >
              {currentWeekTitle}
            </Div>
            <Div>
              <IconButton aria-label="précédent" sx={{ color: 'inherit' }} onClick={() => nav(1)}>
                <CaretRight color="currentColor" />
              </IconButton>
            </Div>
          </Div>
        </Div>
      </Container>
    </Div>
  )
}
