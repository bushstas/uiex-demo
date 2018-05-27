import React from 'react';
import MainMenu from './MainMenu';
import TabsDemo from './components/Tabs';
import ButtonsDemo from './components/Buttons';
import BoxDemo from './components/Box';
import {Checkbox} from 'uiex';

import './style.scss';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 'ButtonGroup'
		}
	}

	render() {
		return (
			<div>
				<MainMenu 
					onChange={this.handleChangeMenu}
					active={this.state.page}
				/>
				<div className="main-content">
					{this.renderContent()}
				</div>	
			</div>
		)
	}

	renderContent() {
		const {page} = this.state;
		switch (page) {
			case 'Tabs':
				return <TabsDemo/>

			case 'Box':
				return <BoxDemo/>

			default:
				return <ButtonsDemo/>
		}
	}

	handleChangeMenu = (page) => {
		this.setState({page});
	}
}