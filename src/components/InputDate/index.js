import React from 'react';
import Demo from '../../Demo';
import {InputDate} from 'uiex/InputDate';
import InputMapper from '../InputMapper';
import {getSetState} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED} from '../../consts';

const EXCLUDED = ['type', 'pattern', 'textarea', 'minLength', 'maxLength', 'withIndicator'];

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
			},
			withoutIcon: {
				description: 'The date icon will not be displayed'
			},
			isTimestamp: {
				description: 'The value will be numeric timestamp'
			},
			inSeconds: {
				description: 'The value timestamp will be measured in seconds'
			}
		},
		inputs: [
			{
				initialValue: {
					description: 'Initial value keyword (String)',
					example: 'today'
				},
				delimiter: {
					description: 'Delimiter between numbers (String)',
					maxLength: 1,
					example: '-'
				},
				minYear: {
					description: 'Minimal allowed year (Number)',
					type: 'number',
					maxValue: 2050,
					positive: true,
					example: 2000
				},
				maxYear: {
					description: 'Maximal allowed year (Number)',
					type: 'number',
					maxValue: 2050,
					positive: true,
					example: 2015,
					lastInRow: true
				},
				periodFrom: {
					description: 'Valid period start date (String)',
					type: 'date',
					example: '01.01.2010'
				},
				periodTo: {
					description: 'Valid period end date (String)',
					type: 'date',
					example: '31.08.2010'
				}
			}
		]
	};
	static data = {
		width: 300,
		placeholder: 'Input a value',
		yearFirst: true,
		initialValue: '-4day',
		validating: true
	};
	static excluded = INPUT_COMPONENT_EXCLUDED;
	static handlers = ['onChange', 'onChangeValidity', 'onClear', 'onFocus', 'onBlur', 'onEnter', 'onDisabledClick'];
	static args = {
		onChange: ['value', 'name'],
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
	static previewProps = {
		unclosable: true
	};
	static componentName = 'InputDate';
	static component = InputDate;
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
				nameExample="date"
				valueExample="01.06.2015"
				defaultValueExample="01.01.2015"
				valueDescription="Input value as a date format string or a numeric timestamp (String | Number)"
				valueReadOnly
			/>
		)
	}
}