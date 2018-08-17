import React from 'react';
import Demo from '../../Demo';
import {InputDate} from 'uiex/InputDate';
import InputMapper from '../InputMapper';
import {getSetState} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED} from '../../consts';

const EXCLUDED = ['type', 'pattern', 'textarea', 'minLength', 'maxLength'];

export default class InputDateDemo extends Demo {
	static map = {
		checkboxes: {
			yearFirst: {
				description: 'Format 0000-00-00 instead of 00-00-0000'
			},
			withTime: {
				description: 'Time is available'
			},
			past: {
				description: 'Only past date is allowed'
			},
			future: {
				description: 'Only future date is allowed'
			}
		},
		inputs: [
			{
				delimiter: {
					description: 'Delimiter between numbers',
					maxLength: 1,
					example: '-'
				},
				minYear: {
					description: 'Minimal allowed year',
					type: 'number',
					maxValue: 2050,
					example: 2000
				},
				maxYear: {
					description: 'Maximal allowed year',
					type: 'number',
					maxValue: 2050,
					example: 2015
				},
				periodFrom: {
					description: 'Valid period start date',
					type: 'date',
					example: '01.01.2010'
				},
				periodTo: {
					description: 'Valid period end date',
					type: 'date',
					example: '31.08.2010'
				}
			}
		]
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
	static componentName = 'InputDate';
	static component = InputDate;
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
				type="date"
				nameExample="date"
				valueExample="01.06.2015"
				defaultValueExample="01.01.2015"
			/>
		)
	}
}