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
				description: 'Returns only digits on change'
			},
			withCode: {
				description: 'Returns value with given code. Returns "numericCode" instead "code" if "numeric" is true'
			}
		},
		inputs: [
			{
				code: {
					description: 'The code of a phone number',
					example: '+7'
				},
				mask: {
					description: 'The mask of a number. Key symbols can be any latin letters or digits e.g. (0D4) 5Gd-4S-xX',
					example: '(XXX) XXX-XX-XX'
				},
				numericCode: {
					description: 'The code of a phone number which will be added if "numeric" is true',
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
		code: '+7 ',
		mask: '(XXX) XXX-XX-XX',
		numericCode: 8,
		withCode: true,
		numeric: true
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
		onChange: getSetState('value'),
		onChangeValidity: getSetState('valid')
	};
	static previewProps = {
		unclosable: true
	};
	static componentName = 'InputPhone';
	static component = InputPhone;
	static changeState = {
		onChange: 'value',
		onChangeValidity: 'valid'
	};	

	renderMapperBefore() {
		return (
			<InputMapper 
				isOpen={true}
				excluded={EXCLUDED}
				data={this.state.data} 
				onChange={this.handleChangeData}
				nameExample="phone"
				valueExample="9005002020"
				defaultValueExample="9005002020"
				valueDescription="Input value (String)"
				valueReadOnly
			/>
		)
	}
}