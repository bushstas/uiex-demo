import React from 'react';
import {Tabs, Tab} from 'uiex';
import Mapper from '../../Mapper';
import ButtonGroupMapper from '../ButtonGroupMapper';

const DATA = {
	dynamic: false,
	optional: false,
	multiple: false,
	simple: false,
	emptyTabName: 'New tab',
	buttonWidth: 120,
	view: null
}

const MEASURES = [
	{id: 'px', name: 'px'},
	{id: '%', name: '%'}
]

const MAP = {
	checkboxes: {
		simple: {
			description: 'Simple tabs without content',
			defaultValue: false
		},
		multiple: {
			description: 'Tabs support multiple select',
			defaultValue: false
		},
		dynamic: {
			description: 'Dynamic tabs',
			defaultValue: false
		},
		optional: {
			description: 'None of tabs can be selected if true (multiple is always optional)',
			defaultValue: false
		}
	},
	inputs: {
		emptyTabName: {
			description: 'Text of a new added tab',
			example: 'New tab',
			defaultValue: 'New tab',
			maxLength: 20
		}
	}
}

const TABS = [
	{
		caption: 'Details',
		icon: 'car',
		value: 1
	},
	{
		caption: 'Products',
		icon: 'user-circle',
		value: 2
	},
	{
		caption: 'Items',
		value: 3
	},
	{
		caption: 'Contacts',
		value: 4
	}
]

export default class TabsDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: null,
			map: MAP,
			tabs: TABS,
			data: DATA,
			buttonWidthMeasure: 'px',
			noRemoving: false
		}
	}

	render() {
		const {tab, data, map, buttonWidthMeasure, noRemoving} = this.state;
		let buttonWidth = data.buttonWidth;
		if (buttonWidth) {
			buttonWidth += buttonWidthMeasure;
		}
		return (
			<div>
				<ButtonGroupMapper
					data={data}
					onChange={this.handleChangeData}
					onChangeMeasure={this.handleChangeMeasure}
				/>
				<Mapper 
					name="Tabs"
					map={map} 
					data={data} 
					onChange={this.handleChangeData}
					onChangeMeasure={this.handleChangeMeasure}
				/>
				<Tabs 
					activeTab={tab}
					buttonColor={data.buttonColor}
					activeColor={data.activeColor}
					buttonWidth={buttonWidth}
					buttonHeight={data.buttonHeight}
					iconType="awesome"
					view={data.view}
					
					simple={data.simple}
					multiple={data.multiple}
					dynamic={data.dynamic}
					optional={data.optional}

					onSelect={this.handleSelectTab}
					onAddTab={this.handleAddTab}
					onRemoveTab={this.handleRemoveTab}
					emptyTabName={data.emptyTabName}
					noRemoving={noRemoving}
				>
					{this.renderTabs()}
				</Tabs>
			</div>
		)
	}

	renderTabs() {
		return this.state.tabs.map(item => {
			return (
				<Tab 
					key={item.value}
					caption={item.caption}
					icon={item.icon}
					style={item.style}
				>
					{item.value}
				</Tab>
			)
		});
	}

	handleChangeData = (data) => {
		this.setState({data});
	}

	handleSelectTab = (tab) => {
		this.setState({tab});
	}

	handleAddTab = (caption) => {
		const {tabs} = this.state;
		this.setState({tabs: [...tabs, this.getEmptyTab(caption)]});
	}

	getEmptyTab(caption) {
		const {tabs} = this.state;
		return {
			value: tabs.length + 1,
			caption
		}
	}

	handleRemoveTab = (index) => {
		const {tabs} = this.state;
		tabs.splice(index, 1);
		const noRemoving = tabs.length < 2;
		this.setState({tabs: [...tabs], noRemoving});
	}

	handleChangeMeasure = (id, idx, name) => {
		const {map} = this.state;
		const {inputs} = map;
		inputs[name].measure = id;
		if (id == 'px') {
			inputs[name].maxValue = 1000;
		} else {
			inputs[name].maxValue = 100;
		}
		this.setState({map, buttonWidthMeasure: id});
	}
}