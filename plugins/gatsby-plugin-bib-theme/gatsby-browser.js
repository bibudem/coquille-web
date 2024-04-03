import React from 'react';
import PropTypes from 'prop-types';
import ThemeTopLevelProvider from './ThemeTopLevelProvider';

const theme = localStorage.getItem('theme');
const initTheme = theme === 'light' || theme === 'dark' ? theme : 'light';

export const wrapRootElement = ({ element }) =>
	<ThemeTopLevelProvider initTheme={initTheme}>
		{element}
	</ThemeTopLevelProvider>;

wrapRootElement.propTypes = {
	element: PropTypes.node
};
