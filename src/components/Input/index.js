import React from 'react';
import {Input} from 'uiex/Input';
import InputMapper from '../InputMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

import './style.scss';

const DATA = {
	width: 300,
	placeholder: 'Input a value'
}

const EXCLUDED = ['vertical', 'align', 'valign', 'children'];

	// focusStyle: PropTypes.object,
	// clearButtonStyle: PropTypes.object,
	// customFilter: PropTypes.func,
	// pattern: PropTypes.oneOfType([
	// 	PropTypes.object, PropTypes.func
	// ]),

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
const CONSTS = ['pattern'];

export default class InputDemo extends React.Component {
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
					ref="mapper"
					isOpen={true}
					data={this.state.data}
					handlers={HANDLERS}
					onChange={this.handleChangeData}
				/>
				<Preview
					name="Input"
					data={this.state.data}
					handlers={HANDLERS}
					args={ARGS}
					funcs={FUNCS}
					stateProps={STATE_PROPS}
					consts={CONSTS}
					unclosable
				>
					<Input 
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