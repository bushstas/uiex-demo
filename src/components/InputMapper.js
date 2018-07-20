import React from 'react';
import ComponentMapper from './ComponentMapper';
import Mapper from '../Mapper';

const EXCLUDED = ['vertical', 'align', 'valign', 'children'];

const MAP = {
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
}

export default class InputMapper extends React.Component {
	constructor(props) {
		super(props);
		const map = MAP;
		map.inputs[0].value.type = props.type;
		this.state = {
			map
		}
	}

	render() {
		const {isOpen, excluded, data, onChange, handlers} = this.props;
		return (
			<div>
				<ComponentMapper 
					isOpen={false}
					data={data} 
					excluded={EXCLUDED}
					onChange={onChange}
				/>
				<Mapper 
					ref="mapper"
					isOpen={isOpen}
					name="Input"
					excluded={excluded}
					map={this.state.map} 
					data={data} 
					onChange={onChange}
					handlers={handlers}
				/>
			</div>
		)
	}

	fire(event) {
		if (this.refs.mapper) {
			this.refs.mapper.fire(event);
		}
	}
}