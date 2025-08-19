import { useContext, useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import LayoutContainer from '@/components/utils/LayoutContainer'
import { appBarHeight } from '@/components/_layout/AppBar/TopAppBar'
import Div from '@/components/utils/Div'
import { useSmall } from '@/hooks/use-small'
import { HoraireBibContext } from './HoraireBibContext'
import { useSticky } from './useSticky'

export default function Banner({ ...rest }) {
  const { isSticky, sentinel } = useSticky()
  const isSmall = useSmall('md')
  const { currentWeekTitle, prevBtnProps, nextBtnProps, isCurrentWeek, resetToToday } = useContext(HoraireBibContext)
  
  const [top, setTop] = useState(0)

  useEffect(() => {
    setTop(isSmall ? 0 : appBarHeight)
  }, [isSmall])

   return (
    <>
      {sentinel}
      <LayoutContainer sx={(theme) => ({
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          position: 'sticky',
          top, // colle juste sous le header
          zIndex: 1100,
        })}>
        <Div
          className="bib-comp-horaires--header"
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            fontSize: '1rem',
            padding: '20px 0',
            marginTop: '-5rem',
            transition: `padding ${theme.transitions.duration.md3.short4}ms ${theme.transitions.easing.md3.emphasized}`,
            [theme.breakpoints.up('sm')]: {
              fontSize: '1.2rem',
              padding: '20px 0',
            },
          })}
        >
          {/* Bouton "Aujourd'hui" en haut sur petits écrans */}
          <Div sx={(theme) => ({ 
            display: isSmall ? 'flex' : 'none',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '10px',
            visibility: isCurrentWeek() ? 'hidden' : 'visible',
          })}>
            <IconButton 
              aria-label="Revenir à aujourd'hui" 
              sx={{ 
                color: 'inherit',
                fontSize: '0.9rem', 
                fontWeight: 600, 
                letterSpacing: '0.025em', 
                padding: '6px 12px',
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
            {/* Groupe principal: bouton Aujourd'hui + flèches + titre */}
            <Div
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5rem',
                width: '100%',
                flexWrap: 'wrap',
              })}
            >
              {/* Conteneur pour le bouton Aujourd'hui (grands écrans) et la flèche gauche */}
              <Div
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5rem',
                  order: -1,
                  [theme.breakpoints.up('sm')]: {
                    order: 0,
                  }
                })}
              >
                {/* Bouton "Aujourd'hui" - positionné à gauche sur grands écrans */}
                <Div sx={(theme) => ({ 
                  display: isSmall ? 'none' : 'block',
                  visibility: isCurrentWeek() ? 'hidden' : 'visible',
                  width: isCurrentWeek() ? '120px' : 'auto' // Réserve l'espace même quand invisible
                })}>
                  <IconButton 
                    aria-label="Revenir à aujourd'hui" 
                    sx={{ 
                      color: 'inherit',
                      fontSize: '1rem', 
                      padding: '7px 14px',
                      borderRadius: '16px', 
                      border: '1px solid rgba(175, 169, 169, 1)', 
                      '&:hover': {
                        border: '1px solid rgba(250, 242, 242, 1)',
                      }
                    }} 
                    onClick={resetToToday}
                  >
                    Aujourd'hui
                  </IconButton>
                </Div>
                
               <Div
                  sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.5rem',
                    width: '100%',
                    flexWrap: isSmall ? 'nowrap' : 'wrap', // 🔑 ne pas casser la ligne sur mobile
                  })}
                >
                  {/* Flèche gauche */}
                  <IconButton aria-label="semaine précédente" sx={{ color: 'inherit' }} {...prevBtnProps()}>
                    <CaretLeft color="currentColor" />
                  </IconButton>

                  {/* Titre de la semaine */}
                  <Div
                    className="bib-comp-horaires--header-label"
                    sx={(theme) => ({
                      textAlign: 'center',
                      flex: '1 1 auto',
                      fontSize: '15px', 
                      minWidth: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    })}
                  >
                    {currentWeekTitle}
                  </Div>

                  {/* Flèche droite */}
                  <IconButton aria-label="semaine suivante" sx={{ color: 'inherit' }} {...nextBtnProps()}>
                    <CaretRight color="currentColor" />
                  </IconButton>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </LayoutContainer>
    </>
  )
}