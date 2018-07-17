import React from 'react';
import {SidePanel, Button, UIEXCONSTS} from 'uiex';
import ComponentMapper from '../ComponentMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

import './style.scss';

const DATA = {
	width: '50%',
	height: '50%',
	side: 'right',
	isOpen: false,
	animation: 'fade'
}

const EXCLUDED = ['vertical', 'block', 'float', 'align', 'valign']

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
			side: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Side',
				options: UIEXCONSTS.SIDES,
				default: 'left'
			},
			animation: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Animation type',
				options: UIEXCONSTS.PANEL_ANIMATION
			},
			speed: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Animation speed',
				options: UIEXCONSTS.ANIM_SPEED,
				default: 'fast'
			}
		}
	]
}

const HANDLERS = ['onClose'];

export default class SidePanelDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			data: DATA
		};
	}

	render() {
		const {isOpen, unclosable} = this.state.data;
		return (
			<div>
				<ComponentMapper 
					isOpen={false}
					data={this.state.data} 
					excluded={EXCLUDED}
					onChange={this.handleChangeData}
					maxHeight={1000}
				/>
				<Mapper 
					ref="mapper"
					name="SidePanel"
					map={MAP} 
					data={this.state.data}
					onChange={this.handleChangeData}
					handlers={HANDLERS}
				/>
				<Preview
					name="SidePanel"
					data={this.state.data}
				>
					<Button onClick={this.handleShowSidePanel}>
						Show SidePanel
					</Button>
					<SidePanel 
						{...this.state.data}
						onClose={this.handleCloseSidePanel}
					/>
					
				</Preview>
			</div>
		)
	}

	handleChangeData = (data) => {
		this.setState({data});
	}

	handleShowSidePanel = () => {
		const {data} = this.state;
		data.isOpen = true;
		this.setState({data: {...data}});
	}

	handleCloseSidePanel = () => {
		const {data} = this.state;
		data.isOpen = false;
		this.setState({data: {...data}});
		this.fire('onClose');
	}

	fire(event) {
		this.refs.mapper.fire(event);
	}
}