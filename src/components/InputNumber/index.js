import React from 'react';
import Demo from '../../Demo';
import {InputNumber} from 'uiex/InputNumber';
import InputMapper from '../InputMapper';
import {getSetState, insertItems} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED} from '../../consts';
import {INPUT_HANDLERS, INPUT_ARGS, INPUT_FUNCS, INPUT_CHANGE_STATE, INPUT_STATE_PROPS} from '../Input';

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
			},
			withoutControls: {
				description: 'The Up and Down arrow controls will not be displayed'
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
					description: 'Number to add per one mouse wheel or keyboard up/down key events (To change value use mouse wheel within the input or up/down arrows on a keyboard when the input is focused)',
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
	static handlers = insertItems(INPUT_HANDLERS, 'onChangeMeasure', 2);
	static args = {
		...INPUT_ARGS,
		onChangeMeasure: ['measure', 'measureIndex', 'name']
	};
	static stateProps = [...INPUT_STATE_PROPS, 'measure'];
	static funcs = {
		...INPUT_FUNCS,
		onChangeMeasure: getSetState('measure')
	};
	static previewProps = {
		unclosable: true
	};
	static consts = ['measures'];
	static componentName = 'InputNumber';
	static component = InputNumber;
	static changeState = {
		...INPUT_CHANGE_STATE,
		onChangeMeasure: 'measure'
	};
	static customEvents = {
		Wheel: 'You can change value with mouse wheel on the Input',
		KeyPress: 'You can change value with ArrowUp and ArrowDown keys when the Input is focused'
	};

	renderMapperBefore() {
		return (
			<InputMapper 
				isOpen={true}
				excluded={EXCLUDED}
				data={this.state.data} 
				onChange={this.handleChangeData}
				defaultType="number"
				nameExample="age"
				valueExample="20"
				defaultValueExample="100"
				valueDescription="Input value (Number | Numeric String)"
				valueReadOnly
			/>
		)
	}
}