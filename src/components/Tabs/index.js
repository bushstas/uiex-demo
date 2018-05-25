import React from 'react';
import {Tabs, Tab} from 'uiex';

export default class TabsDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: null
		}
	}

	render() {
		const {tab} = this.state;
		return (
			<div>
				<Tabs 
					activeTab={tab}
					activeColor="yellow"
					onSelect={this.handleSelectTab}
					buttonColor="black"
					buttonWidth={100}
					buttonHeight="50"
					iconSize="22"
					multiple
				>
					<Tab caption="Details" icon="zoom_in">
						1111
					</Tab>
					<Tab caption="Products">
						222
					</Tab>
					<Tab caption="Items">
						333
					</Tab>
					<Tab caption="Contacts" float="right" single>
						444
					</Tab>
				</Tabs>
			</div>
		)
	}

	handleSelectTab = (tab) => {
		this.setState({tab});
	}
}