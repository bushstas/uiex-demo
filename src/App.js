import React from 'react';
import MainMenu from './MainMenu';
import TabsDemo from './components/Tabs';
import ButtonsDemo from './components/Buttons';
import BoxDemo from './components/Box';
import SearchFormDemo from './components/SearchForm';
import {Section, SidePanel, RateForm} from 'uiex';

import './style.scss';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 'SearchForm',
			sidePanelOpen: false
		}
	}

	render() {
		return (
			<div>
				<MainMenu 
					onChange={this.handleChangeMenu}
					active={this.state.page}
				/>
				<SidePanel 
					isOpen={this.state.sidePanelOpen} 
					animation="fade-roll"
					side="bottom"
				/>
				<RateForm scale="1"/>
				<div className="main-content">
					{this.renderContent()}
				</div>	
				<button onClick={this.handle} style={{marginLeft: '400px'}}>
					Click me
				</button>
			</div>
		)
	}

	handle = () => {
		this.setState({sidePanelOpen: !this.state.sidePanelOpen})
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