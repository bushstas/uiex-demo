import React from 'react';
import ComponentMapper from '../ComponentMapper';
import {CellGroup, Cell} from 'uiex/CellGroup';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

const DATA = {
	columns: 3,
	cellMargin: 5,
	rowMargin: 5,
	cellHeight: ''
}

const EXCLUDED = ['align', 'valign', 'block', 'vertical', 'children'];

const MAP = {
	checkboxes: {
		withoutInput: {
			description: 'Without input'			
		},
		withoutRGB: {
			description: 'Without RGB inputs'
		}
	},
	inputs: [
		{
			columns: {
				description: 'Columns count',
				type: 'number',
				maxValue: 10,
				positive: true
			},
			cellMargin: {
				description: 'Space between columns in px',
				type: 'number',
				maxValue: 30,
				positive: true
			},
			rowMargin: {
				description: 'Space between rows in px',
				type: 'number',
				maxValue: 30,
				positive: true
			},
			cellHeight: {
				description: 'Height of cells',
				type: 'number',
				maxValue: 500,
				positive: true
			}
		}
	]
}

const HANDLERS = ['onChange', 'onChangeHue'];
const ARGS = {
	onChange: ['value', 'colorData'],
	onChangeHue: ['hue']
};
const STATE_PROPS = ['value'];
const FUNCS = {
	onChange: 'this.setState({value});'
}
const CONSTS = ['presetColors'];


const STYLE = {
	backgroundColor: '#eee',
	borderRadius: '3px',
	padding: '15px'
}

export default class CellGroupDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			data: DATA
		}
	}

	render() {

		const {data} = this.state;
		return (
			<div>
				<ComponentMapper 
					isOpen={false}
					data={this.state.data} 
					excluded={EXCLUDED}
					onChange={this.handleChangeData}
					maxHeight={2000}
				/>
				<Mapper 
					ref="mapper"
					name="CellGroup"
					map={MAP} 
					data={this.state.data} 
					onChange={this.handleChangeData}
					handlers={HANDLERS}
				/>
				<Preview
					data={this.state.data}
					name="ColorPicker"
					handlers={HANDLERS}
					args={ARGS}
					stateProps={STATE_PROPS}
					funcs={FUNCS}
					consts={CONSTS}
				>
					
							<CellGroup {...this.state.data}>
								<Cell style={STYLE}>
									First cell
								</Cell>
								<Cell style={STYLE}>
									Second cell
								</Cell>
								<Cell style={STYLE}>
									Third cell
								</Cell>
								<Cell style={STYLE}>
									Fourth cell
								</Cell>
								<Cell style={STYLE}>
									Fifth cell
								</Cell>
								<Cell style={STYLE}>
									Sixth cell
								</Cell>
								<Cell style={STYLE}>
									Seventh cell
								</Cell>
								<Cell style={STYLE}>
									Eighth cell
								</Cell>
								<Cell style={STYLE}>
									Nineth cell
								</Cell>
								<Cell style={STYLE}>
									Tenth cell
								</Cell>
							</CellGroup>
						
				</Preview>
			</div>
		)
	}

	handleColorPickerChange = (color, colorData) => {
		const {data} = this.state;
		data.value = color;
		this.setState({data: {...data}});
		this.fire('onChange');
	}

	handleColorPickerHueChange = (hue) => {
		this.fire('onChangeHue');
	}

	handleDisabledButtonClick = (value) => {
		alert(value + ' is disabled')
	}

	handleChangeData = (data) => {
		this.setState({...data});
	}

	fire(event) {
		this.refs.mapper.fire(event);
	}
}