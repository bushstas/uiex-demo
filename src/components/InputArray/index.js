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
			withControls: {
				description: 'With controls'
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
			},
			addToBeginning: {
				description: 'Added items will be placed before existing items'
			}
		},
		inputs: [
			{
				_COLUMNS: 18,
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
				},
				delimiter: {
					description: 'Delimiter'
				},
				inputTextEventTimeout: {
					description: 'Input text event will be fired after given timeout',
					type: 'number',
					maxValue: 2000,
					positive: true
				},
				placeholder: {
					description: 'Input placeholder',
					stretched: true
				}
			}
		]
	};
	static data = {
		value: [Symbol('name'), NaN, Infinity, 'string', 10000, false, null, undefined, ()=>{}, {a: 2}, [1,2,3], /[a-z]{1,3}/g],
		width: 500,
		height: 250,
		autoDefine: true,
		colorTypes: true,
		delimiter: ',',
		inputTextEventTimeout: 400,
		autoCompleteOptions: ['green', 'red', 'blue']
	};	
	static excluded = ['align', 'valign', 'vertical', 'children'];
	static handlers = ['onChange', 'onAddItem', 'onRemoveItem', 'onInputText'];
	static args = {
		onChange: ['value'],
		onAddItem: ['addedItemsArr', 'value'],
		onRemoveItem: ['removedItemValue', 'removedItemIndex', 'value'],
		onInputText: ['inputText']
	};
	static stateProps = ['value', 'inputText'];
	static funcs = {
		onChange: 'this.setState({value});',
		onInputText: 'this.setState({inputText});'
	};
	static consts = ['value', 'allowedTypes', 'exceptTypes'];
	static componentName = 'InputArray';
	static component = InputArray;
	static previewProps = {
		unclosable: true
	};
	static changeState = {
		onChange: 'value'
	};
	static callbacks = {
		onInputText: 'handleInputText'
	};

	handleInputText(inputText) {
		
	}
}