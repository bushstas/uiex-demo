import React from 'react';
import MainMenu from './MainMenu';
import TabsDemo from './components/Tabs';
import ButtonsDemo from './components/Buttons';
import BoxDemo from './components/Box';
import SearchFormDemo from './components/SearchForm';
import RateFormDemo from './components/RateForm';
import ModalDemo from './components/Modal';
import {Section, SidePanel, RateForm, InputColor, Modal} from 'uiex';

import './style.scss';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 'RateForm',
			sidePanelOpen: false,
			windowIsOpen: false
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
				<div className="main-content">
					{this.renderContent()}
					<button onClick={this.handle}>
						Show SidePanel
					</button>
				</div>				
			</div>
		)
	}

	handleColorChange = (color) => {
		this.setState({color});
	}

	handleSubmit = (value) => {
		alert(value)
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

			case 'RateForm':
				return <RateFormDemo/>

			case 'SearchForm':
				return <SearchFormDemo/>

			case 'Tabs':
				return <TabsDemo/>

			case 'Modal':
				return <ModalDemo/>

			
		}
	}

	handleChangeMenu = (page) => {
		this.setState({page});
	}
}