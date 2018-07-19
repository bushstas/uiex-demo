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
				description: 'Input type',
				example: 'password'
			},
			name: {
				description: 'Input name',
				example: 'email'
			},
			value: {
				description: 'Input value',
				example: 'Some value'
			},
			placeholder: {
				description: 'Input placeholder',
				example: 'Some placeholder'
			},
			minLength: {
				description: 'Minimal value length for being valid',
				type: 'number',
				example: '5',
				maxValue: 100,
				positive: true
			},
			maxLength: {
				description: 'Maximal value length for being valid',
				type: 'number',
				example: '15',
				maxValue: 100,
				positive: true
			},
			maxLength: {
				description: 'Maximal value length for being valid',
				type: 'number',
				example: '15',
				maxValue: 100,
				positive: true
			},
			maxLength2: {
				description: 'Maximal value length for being valid',
				type: 'number',
				example: '15',
				maxValue: 100,
				positive: true
			},
			maxLength3: {
				description: 'Maximal value length for being valid',
				type: 'number',
				example: '15',
				maxValue: 100,
				positive: true
			},
			maxLength4: {
				description: 'Maximal value length for being valid',
				type: 'number',
				example: '15',
				maxValue: 100,
				positive: true
			}			
		},
		{
			defaultValue: {
				description: 'Input initial value',
				example: 'Initial value'
			}
		}
	]
}

export default class InputMapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			map: MAP
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
}