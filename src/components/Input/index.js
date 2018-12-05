import React from 'react';
import Demo from '../../Demo';
import {Input} from 'uiex/Input';
import InputMapper from '../InputMapper';
import {getSetState} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED} from '../../consts';

export const INPUT_HANDLERS = ['onChange', 'onChangeValidity', 'onClear', 'onFocus', 'onBlur', 'onEnter', 'onDisabledClick'];
export const INPUT_ARGS = {
	onChange: ['value', 'name'],
	onClear: ['name'],
	onFocus: ['value', 'name'],
	onBlur: ['value', 'name'],
	onEnter: ['value', 'name'],
	onChangeValidity: ['valid', 'value', 'name'],
	onDisabledClick: ['name']
};
export const INPUT_FUNCS = {
	onChange: getSetState('value'),
	onChangeValidity: getSetState('valid')
};

export const INPUT_CHANGE_STATE = {
	onChange: 'value',
	onChangeValidity: 'valid'
};

export const INPUT_STATE_PROPS = ['value', 'valid'];

export default class InputDemo extends Demo {
	static excluded = INPUT_COMPONENT_EXCLUDED;
	static handlers = INPUT_HANDLERS;
	static args = INPUT_ARGS;
	static stateProps = INPUT_STATE_PROPS;
	static funcs = INPUT_FUNCS;
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
	static changeState = INPUT_CHANGE_STATE;

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