import React from 'react';
import Mapper from '../Mapper';
import {UIEXCONSTS} from 'uiex';

const MEASURES = [
	{id: 'px', name: 'px'},
	{id: '%', name: '%'}
]

const MAP = {
	checkboxes: {
		block: {
			description: 'Display block',
			defaultValue: false
		},
		disabled: {
			description: 'Disabled',
			defaultValue: false
		},
		hidden: {
			description: 'hidden',
			defaultValue: false
		},
		vertical: {
			description: 'vertical',
			defaultValue: false
		}
	},
	inputs: [
		{
			width: {
				type: 'number',
				description: 'Width',
				example: '120',
				maxValue: 1000,
				measure: 'px',
				measures: MEASURES,
				positive: true
			},
			height: {
				type: 'number',
				description: 'Height',
				example: '50',
				maxValue: 200,
				measure: 'px',
				positive: true
			},
			float: {
				description: 'float',
				options: UIEXCONSTS.FLOAT,
				empty: 'Chose an option'
			},
			align: {
				description: 'align',
				options: UIEXCONSTS.ALIGN,
				empty: 'Chose an option'
			},
			valign: {
				description: 'valign',
				options: UIEXCONSTS.VALIGN,
				empty: 'Chose an option'
			},
			className: {
				description: 'className'
			}
		},
		{
			children: {
				description: 'Content',
				size: 'all'
			}
		}
	]
}

export default class ComponentMapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			map: MAP
		}

		if (props.maxHeight) {
			MAP.inputs[0].height.maxValue = props.maxHeight;
		}
	}

	render() {
		return (
			<Mapper 
				isOpen={this.props.isOpen}
				name="UIEXComponent"
				excluded={this.props.excluded}
				map={this.state.map} 
				data={this.props.data} 
				onChange={this.props.onChange}
				onChangeMeasure={this.handleChangeMeasure}
			/>
		)
	}

	handleChangeMeasure = (id, idx, name) => {
		const {map} = this.state;
		const {inputs} = map;
		let inp;
		for (let item of inputs) {
			if (item[name]) {
				inp = item[name];
				break;
			}
		}
		if (inp) {
			inp.measure = id;
			if (id == 'px') {
				inp.maxValue = 1000;
			} else {
				inp.maxValue = 100;
			}
			this.setState({map, buttonWidthMeasure: id});
		}
	}
}