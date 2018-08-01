import React from 'react';
import {Colors} from 'uiex/Colors';
import ComponentMapper from '../ComponentMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';
import {COLORS} from '../../consts';

const DATA = {
	width: 220,
	colorHeight: 24,
	colors: COLORS
}

const EXCLUDED = ['block', 'vertical', 'align', 'valign', 'children', 'height'];

const MAP = {
	checkboxes: {
		isOpen: {
			type: 'boolean',
			description: 'Open/Close status flag',
			default: true
		}
	},
	inputs: [
		{
			columns: {
				description: 'Columns quantity',
				type: 'number',
				maxValue: 40,
				positive: true
			},
			colorHeight: {
				description: 'Color height',
				type: 'number',
				maxValue: 100,
				positive: true
			}
		}
	]
}
const HANDLERS = ['onSelect', 'onDisabledClick'];
const ARGS = {
	onSelect: ['value'],
	onDisabledClick: ['value']
}

const STATE_PROPS = ['value'];
const FUNCS = {
	onSelect: 'this.setState({value});'
}
const CONSTS = ['colors'];

export default class ColorsDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			data: DATA
		};
	}

	render() {
		return (
			<div>
				<ComponentMapper 
					isOpen={false}
					data={this.state.data} 
					excluded={EXCLUDED}
					onChange={this.handleChangeData}
				/>
				<Mapper 
					ref="mapper"
					name="Colors"
					map={MAP} 
					data={this.state.data} 
					onChange={this.handleChangeData}
					handlers={HANDLERS}
				/>
				<Preview
					name="Colors"
					data={this.state.data}
					handlers={HANDLERS}
					args={ARGS}
					funcs={FUNCS}
					stateProps={STATE_PROPS}
					consts={CONSTS}
					unclosable
				>
					<Colors 
						{...this.state.data} 
						onSelect={this.handleSelect}
						onDisabledClick={this.handleDisabledClick}
					/>
				</Preview>
			</div>
		)
	}
	
	handleSelect = (value) => {
		this.fire('onSelect');
	}

	handleDisabledClick = (value) => {
		this.fire('onDisabledClick');
	}

	handleChangeData = (data) => {
		this.setState({data});
	}

	fire(event) {
		if (this.refs.mapper) {
			this.refs.mapper.fire(event);
		}
	}
}