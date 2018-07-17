import React from 'react';
import MainMenu from './MainMenu';
import TabsDemo from './components/Tabs';
import ButtonsDemo from './components/Buttons';
import BoxDemo from './components/Box';
import SearchFormDemo from './components/SearchForm';
import RateFormDemo from './components/RateForm';
import ModalDemo from './components/Modal';
import SidePanelDemo from './components/SidePanel';
import {Section, SidePanel, RateForm, InputColor, Modal} from 'uiex';

import './style.scss';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 'Modal',
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

			case 'RateForm':
				return <RateFormDemo/>

			case 'SearchForm':
				return <SearchFormDemo/>

			case 'Tabs':
				return <TabsDemo/>

			case 'Modal':
				return <ModalDemo/>

			case 'SidePanel':
				return <SidePanelDemo/>
			
		}
	}

	handleChangeMenu = (page) => {
		this.setState({page});
	}
}