import React from 'react';
import {RateForm, UIEXCONSTS} from 'uiex';
import ComponentMapper from '../ComponentMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

import './style.scss';

const DATA = {
	width: 400,
	caption: 'Rate form',
	captionInside: false,
	value: 2
}

const EXCLUDED = ['vertical']

const MAP = {
	checkboxes: {
		captionInside: {
			description: 'Button is only shown on focus',
			defaultValue: false
		},
		resettable: {
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
				description: 'Caption of form',
				example: 'Search form',
				default: ''
			}
		},
		{
			scale: {
				description: 'Value of input',
				type: 'number',
				positive: true,
				example: 'word',
				minValue: 3,
				maxValue: 10,
				default: ''
			},
			value: {
				description: 'Value of input',
				type: 'number',
				example: 'word',
				maxValue: 10,
				default: ''
			},
			icon: {
				description: 'Icon name of submit button',
				example: 'search',
				default: ''
			},
			iconType: {
				description: 'Icon type',
				options: UIEXCONSTS.ICON_TYPE,
				empty: 'Chose an option'
			},
			contentBefore: {
				description: 'Content displayed before controls',
				example: 'Some tiny note',
				default: ''
			},
		}
	]
}

const HANDLERS = ['onChange', 'onSubmit', 'onReset']

export default class RateFormDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			data: DATA
		};
	}

	render() {
		return (
			<div>
				<ComponentMapper 
					isOpen={false}
					data={this.state.data} 
					excluded={EXCLUDED}
					onChange={this.handleChangeData}
				/>
				<Mapper 
					ref="mapper"
					name="RateForm"
					map={MAP} 
					data={this.state.data} 
					onChange={this.handleChangeData}
					handlers={HANDLERS}
				/>
				<Preview>
					<RateForm 
						{...this.state.data} 
						onSubmit={this.handleSubmit}
						onReset={this.handleReset}
						onChange={this.handleChange}
						onDisabledClick={this.handleDisabledClick}
					>
							
					</RateForm>
				</Preview>
			</div>
		)
	}

	handleSubmit = (value) => {
		this.fire('onSubmit');
	}
	handleChange = (value) => {
		this.fire('onChange');
	}
	handleReset = (value) => {
		this.fire('onReset');
	}
	handleDisabledClick = (value) => {
		this.fire('onDisabledClick');
	}

	handleChangeData = (data) => {
		this.setState({data});
	}

	fire(event) {
		this.refs.mapper.fire(event);
	}
}