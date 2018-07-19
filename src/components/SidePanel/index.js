import React from 'react';
import {SidePanel} from 'uiex/SidePanel';
import {Button} from 'uiex/Button';
import {SIDES, PANEL_ANIMATION, ANIM_SPEED, ANIM_EFFECTS} from 'uiex/consts';
import ComponentMapper from '../ComponentMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

import './style.scss';

const DATA = {
	width: '50%',
	height: '50%',
	side: 'right',
	isOpen: false
}


const EXCLUDED = ['vertical', 'block', 'float', 'align', 'valign', 'disabled', 'hidden'];
const HANDLERS = ['onClose'];
const STATE_PROPS = ['isOpen'];
const FUNCS = {
	onClose: 'this.setState({isOpen: false});'
}

const MAP = {
	checkboxes: {
		isOpen: {
			type: 'boolean',
			description: 'Open/Close status flag',
			default: true
		},
		unclosable: {
			type: 'boolean',
			description: 'unclosable',
			default: true
		}
	},
	inputs: [
		{
			side: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Side',
				options: SIDES,
				default: 'left'
			},
			animation: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Animation type',
				options: PANEL_ANIMATION
			},
			speed: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Animation speed',
				options: ANIM_SPEED,
				default: 'fast'
			},
			effect: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Animation effect',
				options: ANIM_EFFECTS,
				default: 'ease-in-out'
			}
		}
	]
}

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
					handlers={HANDLERS}
					funcs={FUNCS}
					stateProps={STATE_PROPS}
				>
					<Button onClick={this.handleShowSidePanel}>
						Show SidePanel
					</Button>
					<SidePanel 
						{...this.state.data}
						onClose={this.handleCloseSidePanel}
					> 
						{unclosable && 
							<div className="flex mb20">
								<Button className="mr20" onClick={this.handleCloseSidePanel}>
									Forced closing
								</Button>
								Use your own buttons or other ways to close unclosable side panels
							</div>
						}
					</SidePanel>					
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