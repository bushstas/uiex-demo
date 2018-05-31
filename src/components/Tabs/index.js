import React from 'react';
import {Tabs, Tab} from 'uiex';
import Mapper from '../../Mapper';

const DATA = {
	dynamic: false,
	optional: false,
	multiple: false,
	simple: false,
	emptyTabName: 'New tab',
	buttonWidth: 120,
	view: 'united'
}

const MAP = {
	checkboxes: {
		simple: {
			type: 'boolean',
			description: 'Simple tabs without content',
			default: false
		},
		multiple: {
			type: 'boolean',
			description: 'Tabs support multiple select',
			default: false
		},
		dynamic: {
			type: 'boolean',
			description: 'Dynamic tabs',
			default: false
		},
		optional: {
			type: 'boolean',
			description: 'None of tabs can be selected if true (multiple is always optional)',
			default: false
		}
	},
	inputs: {
		emptyTabName: {
			description: 'Text of a new added tab',
			example: 'New tab',
			default: 'New tab'
		},
		buttonWidth: {
			description: 'Width of tab buttons',
			example: '120',
			default: '',
			measure: 'px'
		},
		view: {
			description: 'Width of tab buttons',
			options: ['united', 'underlined', 'bordered'],
			empty: 'Chose an option'
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
			tabs: TABS,
			data: DATA
		}
	}

	render() {
		const {tab, data} = this.state;
		return (
			<div>
				<Mapper 
					name="Tabs"
					map={MAP} 
					data={data} 
					onChange={this.handleChangeData}
				/>
				<Tabs 
					activeTab={tab}
					activeStyle={{color: 'black'}}
					buttonColor="black"
					activeColor="green"
					buttonWidth={data.buttonWidth}
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
		this.setState({tabs: [...tabs]});
	}
}