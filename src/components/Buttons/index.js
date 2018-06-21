import React from 'react';
import {Button, ButtonGroup} from 'uiex';
import ButtonGroupMapper from '../ButtonGroupMapper';

import './style.scss';

const DATA = {
	iconSize: 18,
	options: {'Others': {checked: null, value: {Vivid: true, Crazy: {checked: null, value: {Placed: true}}}}}
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
			data: DATA
		}
	}

	render() {
		const {data} = this.state;
		return (
			<div>
				<ButtonGroupMapper
					data={data}
					onChange={this.handleChangeData}
				/>
				<ButtonGroup
					{...data}
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

	handleButtonClick = (selectedItem) => {
		this.setState({selectedItem});
	}

	handleDisabledButtonClick = (value) => {
		alert(value + ' is disabled')
	}

	handleChangeData = (data) => {
		this.setState({...data});
	}
}