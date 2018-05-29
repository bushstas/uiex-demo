import React from 'react';
import {Tabs, Tab} from 'uiex';

const TABS = [
	{
		caption: 'Details',
		icon: 'car',
		value: 1,
		style: {fontWeight: 'bold'}
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
			tabs: TABS
		}
	}

	render() {
		const {tab} = this.state;
		return (
			<div>
				<Tabs 
					activeTab={tab}
					activeStyle={{color: 'black'}}
					buttonColor="black"
					activeColor="green"
					buttonWidth={120}
					iconType="awesome"
					united
					onSelect={this.handleSelectTab}
					onAddTab={this.handleAddTab}
					onRemoveTab={this.handleRemoveTab}
					emptyTabName="New fucking tab"
					buttonStyle={{fontStyle: 'italic', height: '44px'}}
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