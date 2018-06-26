import React from 'react';
import MainMenu from './MainMenu';
import TabsDemo from './components/Tabs';
import ButtonsDemo from './components/Buttons';
import BoxDemo from './components/Box';
import SearchFormDemo from './components/SearchForm';
import {Section} from 'uiex';

import './style.scss';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 'SearchForm'
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
			case 'Box':
				return <BoxDemo/>

			case 'ButtonGroup':
				return <ButtonsDemo/>

			case 'SearchForm':
				return <SearchFormDemo/>

			case 'Tabs':
				return <TabsDemo/>			

			
		}
	}

	handleChangeMenu = (page) => {
		this.setState({page});
	}
}