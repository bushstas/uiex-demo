import React from 'react';
import Mapper from '../Mapper';
import {UIEXCONSTS} from 'uiex';

const MEASURES = [
	{id: 'px', name: 'px'},
	{id: '%', name: '%'}
]

const MAP = {
	checkboxes: {
		captionInside: {
			description: 'Button is only shown on focus',
			defaultValue: false
		},
		noBorder: {
			description: 'Button is only shown on focus',
			defaultValue: false
		}
	},
	inputs: [
		{
			caption: {
				description: 'Caption of the form',
				example: 'Form caption'
			},
			buttonWidth: {
				type: 'number',
				description: 'Width of submit button',
				example: '120',
				maxValue: 1000,
				measure: 'px',
				measures: MEASURES,
				positive: true
			},
			buttonHeight: {
				type: 'number',
				description: 'Height of submit button',
				example: '50',
				maxValue: 200,
				measure: 'px',
				positive: true
			},
			buttonColor: {
				description: 'Color of submit button',
				options: UIEXCONSTS.COLORS,
				empty: 'Chose an option'
			},
			buttonDisplay: {
				description: 'Display of submit button',
				options: UIEXCONSTS.FORM_BUTTON_DISPLAY,
				empty: 'Chose an option'
			},
			value: {
				description: 'Value of input',
				example: 'word'
			}
		},
		{
			contentBefore: {
				description: 'Content displayed before controls',
				example: 'Some tiny note',
				size: 6
			},
		}
	]
}

export default class FormMapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			map: MAP
		}
	}

	render() {
		return (
			<Mapper 
				isOpen={this.props.isOpen}
				name="UIEXForm"
				excluded={this.props.excluded}
				map={this.state.map} 
				data={this.props.data} 
				onChange={this.props.onChange}
			/>
		)
	}
}