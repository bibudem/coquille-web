import { useContext, useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import LayoutContainer from '@/components/utils/LayoutContainer'
import { appBarHeight } from '@/components/_layout/AppBar/TopAppBar'
import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'
import { HoraireBibContext } from './HoraireBibContext'
//import SearchBox from './SearchBox'
import { useSticky } from './useSticky'

export default function Banner({ ...rest }) {
  const { isSticky, sentinel } = useSticky()
  const isSmall = useSmall('md')
  const { currentWeekTitle, prevBtnProps, nextBtnProps, isCurrentWeek,resetToToday  } = useContext(HoraireBibContext)
  
  const [top, setTop] = useState(0)

  useEffect(() => {
    setTop(isSmall ? 0 : appBarHeight)
  }, [isSmall])

   return (
    <>
      {sentinel}
      <LayoutContainer sx={(theme) => ({ backgroundColor: 'primary.main', color: 'primary.contrastText', position: 'sticky', top: 0, zIndex: 2 })}>
        <Div
          className="bib-comp-horaires--header"
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            fontSize: '1.2rem',
            padding: '30px 0',
            marginTop: '-5rem',
            transition: `padding ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.emphasized}`,
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
              gap: '.5rem',
              maxWidth: '100%', 
              overflow: 'hidden', 
              padding: '0 16px', 
              width: '100%',
              justifyContent: 'center', 
              flexWrap: 'wrap', 
            })}
          >
            {/* Bouton "Aujourd'hui" - toujours présent dans le flux mais invisible quand non nécessaire */}
            <Div sx={(theme) => ({ 
              visibility: isCurrentWeek() ? 'hidden' : 'visible',
              order: -1, 
              flexBasis: '100%', 
              textAlign: 'center', 
              marginBottom: '8px', 
              height: isCurrentWeek() ? 0 : 'auto',
              [theme.breakpoints.up('sm')]: {
                order: 0, 
                flexBasis: 'auto',
                marginBottom: 0,
                marginRight: '12px',
                height: 'auto',
                width: isCurrentWeek() ? '120px' : 'auto' // Réserve l'espace même quand invisible
              }
            })}>
              <IconButton 
                aria-label="Revenir à aujourd'hui" 
                sx={{ 
                  color: 'inherit',
                  fontSize: '1rem', 
                  fontWeight: 600, 
                  letterSpacing: '0.025em', 
                  padding: '7px 14px',
                  borderRadius: '16px', 
                  border: '1px solid rgb(255, 255, 255)', 
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  }
                }} 
                onClick={resetToToday}
              >
                Aujourd'hui
              </IconButton>
            </Div>
            
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
                [theme.breakpoints.up('sm')]: {
                  minWidth: '320px',
                },
                [theme.breakpoints.up('md')]: {
                  minWidth: '428px',
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
    </>
  )
}