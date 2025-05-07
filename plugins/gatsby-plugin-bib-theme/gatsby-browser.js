import React from 'react'
import ThemeTopLevelProvider from './ThemeTopLevelProvider'

const theme = localStorage.getItem('theme')
const initTheme = theme === 'light' || theme === 'dark' ? theme : 'light'

function getCurrentPageLevel(location) {
	console.log(location)
	return location.pathname.split('/').filter((item) => item).length
}

export function wrapRootElement({ element }) {
	return (
		<ThemeTopLevelProvider initTheme={initTheme}>
			{element}
		</ThemeTopLevelProvider>
	)
}
