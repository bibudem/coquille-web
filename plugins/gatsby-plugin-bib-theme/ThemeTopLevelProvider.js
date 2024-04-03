import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BibTheme from './BibTheme'
import LightDarkContext from './LightDarkContext'

function ThemeTopLevelProvider({ children, initTheme }) {
	const [mode, setMode] = useState(initTheme)
	const setTheme = isDark => {
		const val = isDark ? 'dark' : 'light'
		localStorage.setItem('theme', val)
		setMode(val)
	}

	return (
		<BibTheme darkMode={mode === 'dark'}>
			<LightDarkContext.Provider value={{
				theme: mode,
				changeTheme: setTheme
			}}>
				{children}
			</LightDarkContext.Provider>
		</BibTheme>
	)
}

ThemeTopLevelProvider.propTypes = {
	children: PropTypes.node,
	initTheme: PropTypes.string.isRequired
}

export default ThemeTopLevelProvider
