import React from 'react';
import {Button, ButtonGroup} from 'uiex';

import './style.scss';

const DATA = {
	classes: 'demo'
}

const BUTTONS_DATA = {
	save: {
		value: 'save',
		icon: 'save',
		children: 'Save'
	},
	remove: {
		value: 'remove',
		icon: 'delete_forever',
		children: 'Remove'
	},
	cancel: {
		value: 'cancel',
		icon: 'cancel',
		children: 'Cancel'
	}
}

export default class ButtonsDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			open: true
		}
	}

	render() {
		return (
			<div onClick={this.toggleBox} style={{height: '1000px'}}>
				<ButtonGroup
					{...DATA}
					onClick={this.handleButtonClick}
					onDisabledClick={this.handleDisabledButtonClick}
				>
					{this.renderButtons()}
				</ButtonGroup>
			</div>
		)
	}

	renderButtons() {
		return Object.keys(BUTTONS_DATA).map(key => {
			return (
				<Button
					key={key}
					onClick={this.handleButtonClick}
					onDisabledClick={this.handleDisabledButtonClick}
					{...BUTTONS_DATA[key]}
				/>
			)
		})
	}

	toggleBox = () => {
		this.setState({open: !this.state.open});
	}

	handleButtonClick = (selectedItem) => {
		this.setState({selectedItem});
	}

	handleDisabledButtonClick = (value) => {
		alert(value + ' is disabled')
	}
}