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
					classes="fuck"
					activeTab={tab}
					activeColor="yellow"
					onSelect={this.handleSelectTab}
					buttonColor="black"
					buttonWidth={120}
					iconType="awesome"
				>
					<Tab caption="Details" icon="car">
						1111
					</Tab>
					<Tab caption="Products" icon="user-circle">
						222
					</Tab>
					<Tab caption="Items">
						333
					</Tab>
					<Tab caption="Contacts">
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