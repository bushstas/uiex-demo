import React from 'react';
import Mapper from '../Mapper';

const MEASURES = [
	{id: 'px', name: 'px'},
	{id: '%', name: '%'}
]

const MAP = {
	checkboxes: {
		block: {
			description: 'Display block',
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
	}

	render() {
		return (
			<Mapper 
				name="UIEXComponent"
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