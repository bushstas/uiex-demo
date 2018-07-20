import React from 'react';
import ComponentMapper from '../ComponentMapper';
import {ColorPicker} from 'uiex/ColorPicker';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

const DATA = {
	
}

const EXCLUDED = [];

const MAP = {
	checkboxes: {
		isOpen: {
			type: 'boolean',
			description: 'Open/Close status flag',
			default: true
		},
		draggable: {
			type: 'boolean',
			description: 'draggable',
			default: false
		},
		dragWithinScreen: {
			type: 'boolean',
			description: 'dragWithinScreen',
			default: false
		},
		withoutMask: {
			type: 'boolean',
			description: 'withoutMask',
			default: false
		},
		noMaskClose: {
			type: 'boolean',
			description: 'noMaskClose',
			default: false
		},
		unclosable: {
			type: 'boolean',
			description: 'unclosable',
			default: true
		},
		expandable: {
			type: 'boolean',
			description: 'expandable',
			default: false
		},
		expanded: {
			type: 'boolean',
			description: 'expanded',
			default: false
		},
	},
	inputs: [
		{
			header: {
				description: 'Content of header',
				default: ''
			},
			footer: {
				description: 'Content of footer',
				default: ''
			},
			outerContent: {
				description: 'Outer content',
				default: ''
			}
		}
	]
}

const HANDLERS = []

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
				>
					<ColorPicker {...this.state.data}/>
				</Preview>
			</div>
		)
	}

	handleButtonClick = (selectedItem) => {
		this.setState({selectedItem});
	}

	handleDisabledButtonClick = (value) => {
		alert(value + ' is disabled')
	}

	handleChangeData = (data) => {
		this.setState({...data});
	}
}