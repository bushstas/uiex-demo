import React from 'react';
import Demo from '../../Demo';
import {InputDate} from 'uiex/InputDate';
import InputMapper from '../InputMapper';
import {getSetState, insertItems} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED} from '../../consts';
import {INPUT_HANDLERS, INPUT_ARGS, INPUT_FUNCS, INPUT_CHANGE_STATE, INPUT_STATE_PROPS} from '../Input';

const EXCLUDED = ['type', 'pattern', 'textarea', 'minLength', 'maxLength', 'withIndicator'];

export default class InputDateDemo extends Demo {
	static map = {
		checkboxes: {
			withPicker: {
				description: 'With a date picker'
			},
			pickerShown: {
				description: 'Date picker will be shown'
			},
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
			},
			pickerFromSunday: {
				description: 'Date picker days will start from sunday'
			},
			pickerYearFirst: {
				description: 'Date picker year will be displayed at left'
			}
		},
		inputs: [
			{
				initialValue: {
					description: 'Initial value keyword (String)',
					options: ['now', 'today', 'yesterday', 'tomorrow', '-10d', '+2day', '-20days', '+2w', '-3week', '+5weeks', '-2m', '+5month', '-8months', '+2y', '-5year', '+20years', '-1h', '+3hour', '-20hours', '+10min', '-30minute', '+50minutes']
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
		placeholder: 'Input a value'
	};
	static excluded = INPUT_COMPONENT_EXCLUDED;
	static handlers = insertItems(INPUT_HANDLERS, ['onShowPicker', 'onPick', 'onInput'], 2);
	static args = {
		...INPUT_ARGS,
		onPick: ['value', 'dateData', 'name'],
		onShowPicker: ['pickerShown', 'name'],
		onInput: ['value', 'name']
	};
	static stateProps = [...INPUT_STATE_PROPS, 'pickerShown'];
	static funcs = {
		...INPUT_FUNCS,
		onShowPicker: getSetState('pickerShown')
	};
	static previewProps = {
		unclosable: true
	};
	static componentName = 'InputDate';
	static component = InputDate;
	static changeState = {
		...INPUT_CHANGE_STATE,
		onShowPicker: 'pickerShown'
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