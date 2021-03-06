import React from 'react';
import DemoMapper from '../DemoMapper';

const NAME_EXAMPLE = 'email';
const VALUE_EXAMPLE = 'Some value';
const DEFAULT_VALUE_EXAMPLE = 'Initial value';
const DEFAULT_VALUE_DESCRIPTION = 'Input value (String | Number)';

const OPTIONS = [
	{
		title: 'true',
		value: true
	},
	{
		title: 'false',
		value: false
	}
];

export default class InputMapper extends DemoMapper {
	static map = {
		checkboxes: {
			validating: {
				description: 'Input should be validated'
			},
			readOnly: {
				description: 'Input becomes readonly'
			},
			textarea: {
				description: 'Input becomes a Textarea'
			},
			clearable: {
				description: 'Input will have a clear button (when not empty)'
			},
			required: {
				description: 'Input will be required, so you should fill it to pass through validation'
			},
			withIndicator: {
				description: 'Input will have an indicator of inputed symbols count (it requires maxLength prop)'
			}
		},
		inputs: [
			{
				type:{
					description: 'Input type (String)',
					example: 'password'
				},
				name: {
					description: 'Input name (String)',
					example: NAME_EXAMPLE
				},
				value: {
					description: DEFAULT_VALUE_DESCRIPTION,
					example: VALUE_EXAMPLE
				},
				placeholder: {
					description: 'Input placeholder (String)',
					example: 'Some placeholder'
				},
				valid: {
					description: 'Input valid/invalid flag (Boolean)',
					options: OPTIONS
				},
				minLength: {
					description: 'Minimal value length for being valid (Number | Numeric String)',
					type: 'number',
					example: '5',
					maxValue: 100,
					positive: true
				},
				maxLength: {
					description: 'Maximal value length for being valid (Number | Numeric String)',
					type: 'number',
					example: '15',
					maxValue: 100,
					positive: true
				},
				defaultValue: {
					description: 'Input value when the input is empty (String | Number)',
					example: DEFAULT_VALUE_EXAMPLE
				},
				pattern: {
					type: 'regexp',
					description: 'Regexp pattern to validate control (RegExp | Function | String)',
					example: '^[a-z]'
				},
				customFilter: {
					type: 'object',
					description: 'Custom filter function (Function)',
					options: [1, 2]
				}
			}
		]
	};
	static componentName = 'Input';
	static formName = 'inputMapper';

	initMap() {
		const map = super.initMap();
		const {
			type,
			defaultType,
			nameExample,
			valueExample,
			defaultValueExample,
			valueReadOnly,
			valueDescription
		} = this.props;
		map.inputs[0].value.readOnly = valueReadOnly || false;
		map.inputs[0].value.type = type || '';
		map.inputs[0].defaultValue.type = defaultType || '';
		map.inputs[0].name.example = nameExample || NAME_EXAMPLE;
		map.inputs[0].value.example = valueExample || VALUE_EXAMPLE;
		map.inputs[0].defaultValue.example = defaultValueExample || DEFAULT_VALUE_EXAMPLE;
		map.inputs[0].value.description = valueDescription || DEFAULT_VALUE_DESCRIPTION;
        return map;
    }
}