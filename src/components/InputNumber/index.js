import React from 'react';
import Demo from '../../Demo';
import {InputNumber} from 'uiex/InputNumber';
import InputMapper from '../InputMapper';
import {getSetState} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED} from '../../consts';

const EXCLUDED = ['type', 'pattern', 'textarea'];

export default class InputNumberDemo extends Demo {
	static map = {
		checkboxes: {
			positive: {
				description: 'Only positive value'
			},
			negative: {
				description: 'Only negative value'
			},
			decimal: {
				description: 'Decimal value is allowed'
			},
			correctionOnBlur: {
				description: 'MinValue / MaxValue correction will be done only on input blur event'
			},
			valueWithMeasure: {
				description: 'Returns value with measure on change, so it will be a string instead of a number'
			}
		},
		inputs: [
			{
				minValue: {
					description: 'Minimal allowed value',
					type: 'number',
					example: 10
				},
				maxValue: {
					description: 'Maximal allowed value',
					type: 'number',
					example: 50000
				},
				toFixed: {
					description: 'Maximal count of digits after point of decimal value',
					type: 'number',
					correctionOnBlur: true,
					minValue: 1,
					maxValue: 20,
					example: 2,
					positive: true
				},
				addStep: {
					description: 'Тumber to add per one mouse wheel or keyboard up/down key events (To change value use mouse wheel within the input or up/down arrows on a keyboard when the input is focused)',
					type: 'number',
					correctionOnBlur: true,
					minValue: 1,
					maxValue: 1000000,
					example: 100,
					positive: true
				},
				measure: {
					description: 'Number measure to display at right (String)',
					maxLength: 5,
					example: 'px'
				},
				measures: {
					description: 'List of measures. This will give you possibility to change measure (Array)',
					type: 'object',
					options: [['px', '%'], ['g', 'kg', 'lb', 't']]
				}
			}
		]
	};
	static data = {
		width: 300,
		placeholder: 'Input a value'
	};
	static excluded = INPUT_COMPONENT_EXCLUDED;
	static handlers = ['onChange', 'onFocus', 'onBlur', 'onEnter', 'onChangeValidity', 'onChangeMeasure', 'onDisabledClick'];
	static args = {
		onChange: ['value', 'name'],
		onFocus: ['value', 'name'],
		onBlur: ['value', 'name'],
		onEnter: ['value', 'name'],
		onChangeValidity: ['isValid', 'value', 'name'],
		onDisabledClick: ['name'],
		onChangeMeasure: ['measure', 'index', 'name']
	};
	static stateProps = ['value', 'measure'];
	static funcs = {
		onChange: getSetState('value'),
		onChangeMeasure: getSetState('measure'),
	};
	static previewProps = {
		unclosable: true
	};
	static consts = ['measures'];
	static componentName = 'InputNumber';
	static component = InputNumber;
	static changeState = {
		onChange: 'value',
		onChangeMeasure: 'measure'
	};

	renderMapperBefore() {
		return (
			<InputMapper 
				isOpen={true}
				excluded={EXCLUDED}
				data={this.state.data} 
				onChange={this.handleChangeData}
				type="number"
				nameExample="age"
				valueExample="20"
				defaultValueExample="100"
			/>
		)
	}
}