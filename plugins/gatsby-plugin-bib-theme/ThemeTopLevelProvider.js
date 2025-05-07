import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useLocation } from "@reach/router"
import { BibThemeLvl1 } from './BibTheme'
import LightDarkContext from './LightDarkContext'

function ThemeTopLevelProvider({ children, initTheme }) {
	// const location = useLocation()
	// const currentLevel = getCurrentPageLevel(location)
	// console.log('### ICI ###:', currentLevel)
	const [mode, setMode] = useState(initTheme)
	const setTheme = isDark => {
		const val = isDark ? 'dark' : 'light'
		localStorage.setItem('theme', val)
		setMode(val)
	}

	return (
		<BibThemeLvl1 darkMode={mode === 'dark'}>
			<LightDarkContext.Provider value={{
				theme: mode,
				changeTheme: setTheme
			}}>
				{children}
			</LightDarkContext.Provider>
		</BibThemeLvl1>
	)
}

export default ThemeTopLevelProvider
