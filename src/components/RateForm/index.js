import React from 'react';
import {RateForm, UIEXCONSTS} from 'uiex';
import ComponentMapper from '../ComponentMapper';
import FormMapper from '../FormMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

import './style.scss';

const DATA = {
	width: 400,
	caption: 'Rate form',
	captionInside: false,
	value: 2
}

const EXCLUDED = ['vertical'];
const EXCLUDED_FORM = ['value'];

const MAP = {
	checkboxes: {
		resettable: {
			description: 'Button is only shown on focus',
			defaultValue: false
		}
	},
	inputs: [
		{
			value: {
				description: 'Current rate',
				type: 'number',
				example: '5',
				maxValue: 10,
				positive: true
			},
			normalColor:{
				type: 'color',
				description: 'Normal color of icons'
			},
			activeColor:{
				type: 'color',
				description: 'Color of active icons'
			},
			hoverColor:{
				type: 'color',
				description: 'Color of hover icons'
			},
			submit:{
				description: 'Color of hover icons',
				example: 'Rate'
			},
			reset:{
				description: 'Color of hover icons',
				example: 'Reset'
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
				
			},
			icon: {
				description: 'Icon name',
				example: 'search',
				
			},
			activeIcon: {
				description: 'Active icon name',
				example: 'search',
				
			},
			iconType: {
				description: 'Icon type',
				options: UIEXCONSTS.ICON_TYPE,
				empty: 'Chose an option'
			}
		}
	]
}

const HANDLERS = ['onChange', 'onSubmit', 'onReset', 'onDisabledClick']

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
				<FormMapper 
					isOpen={true}
					data={this.state.data} 
					excluded={EXCLUDED_FORM}
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