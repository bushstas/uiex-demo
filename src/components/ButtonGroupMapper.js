import React from 'react';
import {UIEXCONSTS} from 'uiex';
import Mapper from '../Mapper';

const MEASURES = [
	{id: 'px', name: 'px'},
	{id: '%', name: '%'}
]

const MAP = {
	checkboxes: {

	},
	inputs: {
		buttonWidth: {
			type: 'number',
			description: 'Width of tab buttons',
			example: '120',
			maxValue: 1000,
			measure: 'px',
			measures: MEASURES
		},
		buttonHeight: {
			type: 'number',
			description: 'Height of tab buttons',
			example: '50',
			maxValue: 200,
			measure: 'px'
		},
		view: {
			description: 'Width of tab buttons',
			options: UIEXCONSTS.BUTTONS_VIEW,
			empty: 'Chose an option'
		},
		buttonColor: {
			description: 'Color of tab buttons',
			options: UIEXCONSTS.COLORS,
			empty: 'Chose an option'
		},
		activeColor: {
			description: 'Color of an active tab buttons',
			options: UIEXCONSTS.COLORS,
			empty: 'Chose an option'
		}
	}
}

export default class ButtonGroupMapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			map: MAP
		}
	}

	render() {
		return (
			<Mapper 
				name="ButtonGroup"
				map={this.state.map} 
				data={this.props.data} 
				onChange={this.props.onChange}
				onChangeMeasure={this.props.onChangeMeasure}
			/>
		)
	}
}