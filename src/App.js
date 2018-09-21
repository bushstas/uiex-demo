import React from 'react';
import MainMenu from './MainMenu';
import TabsDemo from './components/Tabs';
import ButtonGroupDemo from './components/ButtonGroup';
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
import InputArrayDemo from './components/InputArray';
import InputDateDemo from './components/InputDate';
import InputPhoneDemo from './components/InputPhone';
import InputNumberDemo from './components/InputNumber';
import InputColorDemo from './components/InputColor';
import AutoCompleteDemo from './components/AutoComplete';
import SelectDemo from './components/Select';
import SliderScaleDemo from './components/SliderScale';
import DraggableDemo from './components/Draggable';
import ArrowDemo from './components/Arrow';
import ButtonDemo from './components/Button';
import ScrollContainerDemo from './components/ScrollContainer';

import './style.scss';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 'ScrollContainer',
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
			case 'Arrow':
				return <ArrowDemo/>

			case 'Box':
				return <BoxDemo/>

			case 'ButtonGroup':
				return <ButtonGroupDemo/>

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

			case 'InputPhone':
				return <InputPhoneDemo/>

			case 'InputRegexp':
				return <InputRegexpDemo/>

			case 'InputDate':
				return <InputDateDemo/>

			case 'ColorPicker':
				return <ColorPickerDemo/>

			case 'CellGroup':
				return <CellGroupDemo/>

			case 'Colors':
				return <ColorsDemo/>	

			case 'InputArray':
				return <InputArrayDemo/>

			case 'AutoComplete':
				return <AutoCompleteDemo/>

			case 'Select':
				return <SelectDemo/>

			case 'InputNumber':
				return <InputNumberDemo/>

			case 'InputColor':
				return <InputColorDemo/>

			case 'SliderScale':
				return <SliderScaleDemo/>
			
			case 'Draggable':
				return <DraggableDemo/>

			case 'Button':
				return <ButtonDemo/>

			case 'ScrollContainer':
				return <ScrollContainerDemo/>
		}
	}

	handleChangeMenu = (page) => {
		this.setState({page});
	}
}