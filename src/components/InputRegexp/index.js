import React from 'react';
import {InputRegexp} from 'uiex/InputRegexp';
import InputMapper from '../InputMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

import './style.scss';

const DATA = {
	width: 300,
	placeholder: 'Input a value'
}

const MAP = {
	checkboxes: {
		stringified: {
			description: 'On change returns a string instead of a RegExp object'
		}
	}
}

const EXCLUDED = ['type'];

const HANDLERS = ['onChange', 'onFocus', 'onBlur', 'onEnter', 'onChangeValidity', 'onDisabledClick'];
const ARGS = {
	onChange: ['value', 'name'],
	onFocus: ['value', 'name'],
	onBlur: ['value', 'name'],
	onEnter: ['value', 'name'],
	onChangeValidity: ['isValid', 'value', 'name'],
	onDisabledClick: ['name']
}

const STATE_PROPS = ['value'];
const FUNCS = {
	onChange: 'this.setState({value});'
}

export default class InputRegexpDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			data: DATA
		};
	}

	render() {
		return (
			<div>
				<InputMapper 
					isOpen={false}
					excluded={EXCLUDED}
					data={this.state.data} 
					onChange={this.handleChangeData}
				/>
				<Mapper 
					ref="mapper"
					name="InputRegexp"
					map={MAP} 
					data={this.state.data} 
					onChange={this.handleChangeData}
					handlers={HANDLERS}
				/>
				<Preview
					name="InputRegexp"
					data={this.state.data}
					handlers={HANDLERS}
					args={ARGS}
					funcs={FUNCS}
					stateProps={STATE_PROPS}
					unclosable
				>
					<InputRegexp 
						{...this.state.data} 
						onChange={this.handleChange}
						onEnter={this.handleEnter}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
						onChangeValidity={this.handleChangeValidity}
						onDisabledClick={this.handleDisabledClick}
					/>
				</Preview>
			</div>
		)
	}
	
	handleChange = (value) => {
		const {data} = this.state;
		data.value = value;
		this.setState({data: {...data}});
		this.fire('onChange');
	}

	handleFocus = (value) => {
		this.fire('onFocus');
	}

	handleBlur = (value) => {
		this.fire('onBlur');
	}

	handleEnter = (value) => {
		this.fire('onEnter');
	}

	handleChangeValidity = (value) => {
		this.fire('onChangeValidity');
	}

	handleDisabledClick = (value) => {
		this.fire('onDisabledClick');
	}

	handleChangeData = (data) => {
		this.setState({data});
	}

	fire(event) {
		if (this.refs.mapper) {
			this.refs.mapper.fire(event);
		}
	}
}