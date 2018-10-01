import React from 'react';
import Demo from '../../Demo';
import {Input} from 'uiex/Input';
import InputMapper from '../InputMapper';
import {getSetState} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED} from '../../consts';

export default class InputDemo extends Demo {
	static excluded = INPUT_COMPONENT_EXCLUDED;
	static handlers = ['onChange', 'onClear', 'onFocus', 'onBlur', 'onEnter', 'onChangeValidity', 'onDisabledClick'];
	static args = {
		onChange: ['value', 'name'],
		onClear: ['name'],
		onFocus: ['value', 'name'],
		onBlur: ['value', 'name'],
		onEnter: ['value', 'name'],
		onChangeValidity: ['valid', 'value', 'name'],
		onDisabledClick: ['name']
	};
	static stateProps = ['value', 'valid'];
	static funcs = {
		onChange: getSetState('value'),
		onChangeValidity: getSetState('valid')
	};
	static consts = ['pattern'];
	static data = {
		width: 300,
		placeholder: 'Input a value',
		uncontrolled: true,
		required: true
	};
	static previewProps = {
		unclosable: true
	};
	static componentName = 'Input';
	static component = Input;
	static changeState = {
		onChange: 'value',
		onChangeValidity: 'valid'
	};

	renderMapper() {
		return (
			<InputMapper 
				ref="mapper"
				isOpen={true}
				data={this.state.data}
				handlers={this.constructor.handlers}
				args={this.constructor.args}
				onChange={this.handleChangeData}
			/>
		)
	}
}