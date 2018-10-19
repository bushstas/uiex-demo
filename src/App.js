import React from 'react';
import MainMenu from './MainMenu';

import './style.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};		
	}

	render() {
		return (
			<div>
				<MainMenu onChange={this.handleChangeMenu} />				
				<div className="main-content">
					{this.renderContent()}
				</div>
			</div>
		)
	}

	renderContent() {
		const {component: Component} = this.state;
		if (Component) {
			return (
				<Component />
			);
		}
		return null;
	}

	handleChangeMenu = (component) => {
		this.setState({component});
	}
}