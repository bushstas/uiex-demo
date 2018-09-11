import React from 'react';
import Demo from '../../Demo';
import {InputPhone} from 'uiex/InputPhone';
import InputMapper from '../InputMapper';
import {getSetState} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED} from '../../consts';

const EXCLUDED = ['type', 'pattern', 'textarea', 'minLength', 'maxLength', 'withIndicator'];

export default class InputPhoneDemo extends Demo {
	static map = {
		checkboxes: {
			numeric: {
				description: 'Format 0000-00-00 instead of 00-00-0000'
			},
			withCode: {
				description: 'Time is available'
			}
		},
		inputs: [
			{
				code: {
					description: 'Delimiter between numbers',
					example: '+7'
				},
				mask: {
					description: 'Minimal allowed year',
					example: '(XXX) XXX-XX-XX'
				},
				numericCode: {
					description: 'Maximal allowed year',
					type: 'number',
					maxValue: 9999,
					example: 8
				}
			}
		]
	};
	static data = {
		width: 300,
		placeholder: 'Input a value',
		code: '+7',
		mask: '(XXX) XXX-XX-XX'
	};
	static excluded = INPUT_COMPONENT_EXCLUDED;
	static handlers = ['onChange', 'onClear', 'onFocus', 'onBlur', 'onEnter', 'onChangeValidity', 'onDisabledClick'];
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
	static componentName = 'InputPhone';
	static component = InputPhone;
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
				type="phone"
				defaultType="phone"
				nameExample="phone"
				valueExample=""
				defaultValueExample=""
				valueReadOnly
			/>
		)
	}
}