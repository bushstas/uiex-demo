import React from 'react';
import TabsDemo from './components/Tabs';
import ButtonsDemo from './components/Buttons';

import './style.scss';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<ButtonsDemo/>
				<TabsDemo/>
			</div>
		)
	}
}