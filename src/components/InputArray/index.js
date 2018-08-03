import React from 'react';
import Demo from '../../Demo';
import {InputArray} from 'uiex/InputArray';
import {ARRAY_INPUT_TYPES} from 'uiex/consts';

export default class InputArrayDemo extends Demo {
	static map = {
		checkboxes: {
			uniqueItems: {
				description: 'Only unique items'
			},
			autoDefine: {
				description: 'Type of inputed value will be auto defined, you also can input JSON'
			},
			colorTypes: {
				description: 'Use different color for each type'
			},
			withoutInput: {
				description: 'Without input'
			},
			inputUnder: {
				description: 'Input is under content'
			},
			rightClickRemove: {
				description: 'Remove items on right mouse button click on it'
			},
			doubleClickEdit: {
				description: 'Edit item on double click on it'
			}
		},
		inputs: [
			{
				value: {
					description: 'Value',
					type: 'array'
				},
				maxItems: {
					description: 'Max count of array items',
					type: 'number',
					maxValue: 200,
					positive: true
				},
				onlyType: {
					type: 'select',
					options: ARRAY_INPUT_TYPES
				},
				allowedTypes: {
					description: 'Array of types available for adding',
					type: 'select',
					options: ARRAY_INPUT_TYPES,
					multiple: true
				},
				exceptTypes: {
					description: 'Array of types not available for adding',
					type: 'select',
					options: ARRAY_INPUT_TYPES,
					multiple: true
				}
			}
		]
	};
	static data = {
		value: ['string', 10000, false, null, undefined, ()=>{}, {a: 2}, [1,2,3], /[a-z]{1,3}/g],
		width: 500,
		height: 250,
		autoDefine: true,
		colorTypes: true
	};	
	static excluded = ['align', 'valign', 'vertical', 'children'];
	static handlers = ['onChange', 'onChangeHue', 'onSelectPreset'];
	static args = {
		onChange: ['value', 'colorData'],
		onChangeHue: ['hue'],
		onSelectPreset: ['value']
	};
	static stateProps = ['value'];
	static funcs = {
		onChange: 'this.setState({value});'
	};
	static consts = ['presetColors'];
	static componentName = 'InputArray';
	static component = InputArray;
	static changeState = {
		onChange: 'value'
	};
}