import React from 'react';
import {SearchForm, UIEXCONSTS} from 'uiex';
import ComponentMapper from '../ComponentMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

import './style.scss';

const DATA = {
	width: 400,
	caption: 'Search form',
	buttonTitle: '',
	placeholder: 'Search word',
	icon: 'search'
}

const MEASURES = [
	{id: 'px', name: 'px'},
	{id: '%', name: '%'}
]

const EXCLUDED = ['vertical']

const MAP = {
	checkboxes: {
		hiddenButton: {
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
			},
			buttonTitle: {
				description: 'Caption of submit button',
				example: 'Find',
				default: ''
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
		},
		{
			focusedWidth: {
				type: 'number',
				description: 'Width of form on focus',
				example: '120',
				maxValue: 1000,
				measure: 'px',
				measures: MEASURES,
				positive: true
			},
			placeholder: {
				description: 'Placeholder of input',
				example: 'Search word',
				default: ''
			},
			value: {
				description: 'Value of input',
				example: 'word',
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

const HANDLERS = ['onChange', 'onSubmit', 'onFocus', 'onBlur', 'onDisabledClick']

export default class SearchFormDemo extends React.Component {
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
					name="SearchForm"
					map={MAP} 
					data={this.state.data} 
					onChange={this.handleChangeData}
					handlers={HANDLERS}
				/>
				<Preview>
					<SearchForm 
						{...this.state.data} 
						onSubmit={this.handleSubmit}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
						onChange={this.handleChange}
						onDisabledClick={this.handleDisabledClick}
					>
							
					</SearchForm>
				</Preview>
			</div>
		)
	}

	handleSubmit = (value) => {
		this.fire('onSubmit');
	}
	handleFocus = (value) => {
		this.fire('onFocus');
	}
	handleBlur = (value) => {
		this.fire('onBlur');
	}
	handleChange = (value) => {
		this.fire('onChange');
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