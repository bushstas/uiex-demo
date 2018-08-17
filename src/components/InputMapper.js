import React from 'react';
import DemoMapper from '../DemoMapper';

export default class InputMapper extends DemoMapper {
	static map = {
		checkboxes: {
			readOnly: {
				description: 'readOnly'
			},
			textarea: {
				description: 'textarea'
			},
			clearable: {
				description: 'clearable'
			},
			valid: {
				description: 'valid'
			},
			invalid: {
				description: 'invalid'
			},
			required: {
				description: 'required'
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
					example: 'email'
				},
				value: {
					description: 'Input value (String | Number)',
					example: 'Some value'
				},
				placeholder: {
					description: 'Input placeholder (String)',
					example: 'Some placeholder'
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
					description: 'Input initial value (String | Number)',
					example: 'Initial value'
				},
				pattern: {
					type: 'regexp',
					description: 'Regexp pattern to validate control (RegExp | Function | String)',
					example: '^[a-z]'
				}
			}
		]
	};
	static componentName = 'Input';

	initMap() {
		const map = super.initMap();
		const {type, nameExample, valueExample, defaultValueExample} = this.props;
		if (type) {
			map.inputs[0].value.type = type;
		}
		if (nameExample) {
			map.inputs[0].name.example = nameExample;
		}
		if (valueExample) {
			map.inputs[0].value.example = valueExample;
		}
		if (defaultValueExample) {
			map.inputs[0].defaultValue.example = defaultValueExample;
		}
        return map;
    }
}