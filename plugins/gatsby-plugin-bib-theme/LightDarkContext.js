
import React from 'react';

const LightDarkContext = React.createContext({
	theme: 'light',
	changeTheme: () => null
});

export default LightDarkContext;
