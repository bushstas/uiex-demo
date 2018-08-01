import React from 'react';
import MainMenu from './MainMenu';
import TabsDemo from './components/Tabs';
import ButtonsDemo from './components/Buttons';
import BoxDemo from './components/Box';
import SearchFormDemo from './components/SearchForm';
import RateFormDemo from './components/RateForm';
import ModalDemo from './components/Modal';
import SidePanelDemo from './components/SidePanel';
import InputDemo from './components/Input';
import InputRegexpDemo from './components/InputRegexp';
import ColorPickerDemo from './components/ColorPicker';
import CellGroupDemo from './components/CellGroup';
import ColorsDemo from './components/Colors';

import './style.scss';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 'Colors',
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

			case 'Input':
				return <InputDemo/>

			case 'InputRegexp':
				return <InputRegexpDemo/>

			case 'ColorPicker':
				return <ColorPickerDemo/>

			case 'CellGroup':
				return <CellGroupDemo/>

			case 'Colors':
				return <ColorsDemo/>	
			
		}
	}

	handleChangeMenu = (page) => {
		this.setState({page});
	}
}