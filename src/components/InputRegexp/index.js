import React from 'react';
import Demo from '../../Demo';
import {InputRegexp} from 'uiex/InputRegexp';
import InputMapper from '../InputMapper';
import {getSetState} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED} from '../../consts';

const EXCLUDED = ['type', 'pattern', 'textarea'];

export default class InputRegexpDemo extends Demo {
	static map = {
		checkboxes: {
			stringified: {
				description: 'On change returns a string instead of a RegExp object'
			}
		}
	};
	static data = {
		width: 300,
		placeholder: 'Input a value'
	};
	static excluded = INPUT_COMPONENT_EXCLUDED;
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
		onChange: getSetState('value')
	};
	static previewProps = {
		unclosable: true
	};
	static componentName = 'InputRegexp';
	static component = InputRegexp;
	static changeState = {
		onChange: 'value'
	};	

	renderMapperBefore() {
		return (
			<InputMapper 
				isOpen={true}
				excluded={EXCLUDED}
				data={this.state.data} 
				onChange={this.handleChangeData}
				type="regexp"
			/>
		)
	}
}