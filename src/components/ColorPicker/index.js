import React from 'react';
import ComponentMapper from '../ComponentMapper';
import {ColorPicker} from 'uiex/ColorPicker';
import Mapper from '../../Mapper';
import Preview from '../../Preview';
import {COLORS} from '../../consts';

const DATA = {
	value: '#FD4DF5',
	presetColors: COLORS
}

const EXCLUDED = ['width', 'height', 'align', 'valign', 'block', 'vertical', 'children'];

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
			value: {
				description: 'Value',
				type: 'color',
				withoutPicker: true
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

export default class ColorPickerDemo extends React.Component {
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
				/>
				<Mapper 
					ref="mapper"
					name="ColorPicker"
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
					<ColorPicker 
						{...this.state.data}
						onChange={this.handleColorPickerChange}
						onChangeHue={this.handleColorPickerHueChange}
					/>
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