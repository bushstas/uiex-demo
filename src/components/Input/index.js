import React from 'react';
import Demo from '../../Demo';
import {Input} from 'uiex/Input';
import InputMapper from '../InputMapper';

import './style.scss';

export default class InputDemo extends Demo {
	static excluded = ['height', 'vertical', 'align', 'valign', 'children'];
	static handlers = ['onChange', 'onFocus', 'onBlur', 'onEnter', 'onChangeValidity', 'onDisabledClick'];
	static args = {
		onChange: ['value', 'name'],
		onFocus: ['value', 'name'],
		onBlur: ['value', 'name'],
		onEnter: ['value', 'name'],
		onChangeValidity: ['isValid', 'value', 'name'],
		onDisabledClick: ['name']
	};
	static stateProps = ['value'];
	static funcs = {
		onChange: 'this.setState({value});'
	};
	static consts = ['pattern'];
	static data = {
		width: 300,
		placeholder: 'Input a value'
	};
	static previewProps = {
		unclosable: true
	};
	static componentName = 'Input';
	static component = Input;
	static changeState = {
		onChange: 'value'
	};

	renderMapper() {
		return (
			<InputMapper 
				ref="mapper"
				isOpen={true}
				data={this.state.data}
				handlers={this.constructor.handlers}
				onChange={this.handleChangeData}
			/>
		)
	}
}