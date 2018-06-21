import React from 'react';
import {UIEXCONSTS} from 'uiex';
import Mapper from '../Mapper';
import ComponentMapper from './ComponentMapper';

const viewOptions = [];
var icons = ['dashboard', 'delete', 'room', 'verified_user'];
let i = 0;
for (let item of UIEXCONSTS.BUTTONS_VIEW) {
	viewOptions.push({
		title: item,
		value: item,
		icon: icons[i]
	});
	i++;
}

const MEASURES = [
	{id: 'px', name: 'px'},
	{id: '%', name: '%'}
]

const OPTIONS =[{value: 'Poor', title: 'Poor'}, 'Awesome', 'Fake', 'Goofie', 'Bad', 'Fucked', 'Fantastic', 'Bold', 'Lovely', 'Green', 'Good', 'Normal', 'Scary', 'Well', 'Safe', 'Lonely', 'Silent', 'Stormy', 'Wet', 'SuperPuperMegaCool', 'Shocked'];

const MAP = {
	checkboxes: {
		gradient: {
			description: 'Using gradient',
			defaultValue: false
		},
		iconAtRight: {
			description: 'Icon is located at right',
			defaultValue: false
		}
	},
	inputs: [
		{
			buttonWidth: {
				type: 'number',
				description: 'Width of tab buttons',
				example: '120',
				maxValue: 1000,
				measure: 'px',
				measures: MEASURES,
				positive: true
			},
			buttonHeight: {
				type: 'number',
				description: 'Height of tab buttons',
				example: '50',
				maxValue: 200,
				measure: 'px',
				positive: true
			},
			iconSize: {
				type: 'number',
				description: 'Height of tab buttons',
				example: '20',
				maxValue: 80,
				positive: true
			},
			gradient: {
				type: 'boolean',
				description: 'Gradient'
			}
		},
		{
			view: {
				description: 'Width of tab buttons',
				options: viewOptions,
				empty: 'Chose an option'
			},
			buttonColor: {
				description: 'Color of tab buttons',
				options: UIEXCONSTS.COLORS,
				empty: 'Chose an option'
			},
			iconType: {
				description: 'Icon type',
				options: UIEXCONSTS.ICON_TYPE,
				empty: 'Chose an option'
			},
			someJunk: {
				description: 'Some junk',
				options: OPTIONS,
				autoComplete: true
			}
		},
		{
			options: {
				description: 'options',
				checkboxes: OPTIONS,
				size: 'all'
			}
		}
	]
}

export default class ButtonGroupMapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			map: MAP,
			vvv: '',
			ddd: ''
		}
	}

	render() {
		const {isOpen = true, data, onChange} = this.props;
		return (
			<div>
				<ComponentMapper 
					isOpen={false}
					data={data} 
					onChange={onChange}
				/>
				<Mapper 
					isOpen={isOpen}
					name="ButtonGroup"
					map={this.state.map} 
					data={data} 
					onChange={onChange}
					onChangeMeasure={this.handleChangeMeasure}
				/>
			</div>
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

	handleChange = (v) => {
		this.setState({vvv: v})
	}

	handleChange2 = (v) => {
		this.setState({ddd: v})
	}
}