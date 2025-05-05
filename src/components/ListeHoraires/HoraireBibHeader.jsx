import { useContext, useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import LayoutContainer from '@/components/utils/LayoutContainer'
import { appBarHeight } from '@/components/_layout/AppBar/TopAppBar'
import Div from '@/components/utils/Div'
import { HoraireBibContext } from './HoraireBibContext'
// import SearchBox from './SearchBox'
import { useSmall } from '@/hooks/use-small'

export default function Banner({ ...rest }) {
  const isSmall = useSmall('md')
  const { currentWeekTitle, prevBtnProps, nextBtnProps } = useContext(HoraireBibContext)
  const [top, setTop] = useState(0)

  useEffect(() => {
    setTop(isSmall ? 0 : appBarHeight)
  }, [isSmall])

  return (
    <LayoutContainer sx={(theme) => ({ backgroundColor: 'primary.main', color: 'primary.contrastText', position: 'sticky', top: 0, zIndex: theme.zIndex.appBar })}>
      <Div
        className="bib-comp-horaires--header"
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          fontSize: '1.2rem',
          padding: '30px 0',
          [theme.breakpoints.up('sm')]: {
            fontSize: '1.3333rem',
            padding: '46px 0',
          },
        })}
      >
        <Div
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto',
            gap: '1.25rem',
            [theme.breakpoints.up('sm')]: {
              gap: '.5rem',
            },
          })}
        >
          <Div>
            <IconButton aria-label="semaine précédente" sx={{ color: 'inherit' }} {...prevBtnProps()}>
              <CaretLeft color="currentColor" />
            </IconButton>
          </Div>
          <Div
            className="bib-comp-horaires--header-label"
            sx={(theme) => ({
              textAlign: 'center',
              minWidth: '22ch',
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
            <IconButton aria-label="semaine suivante" sx={{ color: 'inherit' }} {...nextBtnProps()}>
              <CaretRight color="currentColor" />
            </IconButton>
          </Div>
        </Div>
      </Div>
    </LayoutContainer>
  )
}
