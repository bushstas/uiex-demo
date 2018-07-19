import React from 'react';
import {Modal} from 'uiex/Modal';
import {Button} from 'uiex/Button';
import {MODAL_ANIMATION} from 'uiex/consts';
import ComponentMapper from '../ComponentMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

import './style.scss';

const DATA = {
	width: 700,
	height: 500,
	isOpen: false,
	header: 'Modal Header',
	footer: 'Modal Footer',
}

const EXCLUDED = ['vertical', 'block', 'float', 'align', 'valign', 'hidden', 'disabled']

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
			},
			animation: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Animation type',
				options: MODAL_ANIMATION,
				default: 'fade-fall'
			},
			maskOpacity: {
				description: 'Mask opacity from 0 to 10',
				type: 'number',
				example: '5',
				maxValue: 10,
				positive: true
			}
		}
	]
}

const HANDLERS = ['onExpand', 'onClose', 'onDragEnd'];
const STATE_PROPS = ['isOpen'];
const FUNCS = {
	onClose: 'this.setState({isOpen: false});',
	onDragEnd: 'const {x, y} = coords;'
}
const ARGS = {
	onExpand: ['isExpanded'],
	onDragEnd: ['coords']
}


export default class ModalDemo extends React.Component {
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
					name="Modal"
					map={MAP} 
					data={this.state.data} 
					onChange={this.handleChangeData}
					handlers={HANDLERS}
				/>
				<Preview
					data={this.state.data}
					name="Modal"
					handlers={HANDLERS}
					args={ARGS}
					funcs={FUNCS}
					stateProps={STATE_PROPS}
				>
					<Button onClick={this.handleShowModal}>
						Show Modal
					</Button>
					<Modal 
						{...this.state.data}
						onClose={this.handleCloseModal}
						onExpand={this.handleExpandModal}
						onDragEnd={this.handleDragEndModal}
					>
						{unclosable && 
							<div className="flex mb20">
								<Button className="mr20" onClick={this.handleCloseModal}>
									Forced closing
								</Button>
								Use your own buttons or other ways to close unclosable modals
							</div>
						}
						{this.state.data.children}
					</Modal>
				</Preview>
			</div>
		)
	}

	handleChangeData = (data) => {
		this.setState({data});
	}

	handleShowModal = () => {
		const {data} = this.state;
		data.isOpen = true;
		this.setState({data: {...data}});
	}

	handleCloseModal = () => {
		const {data} = this.state;
		data.isOpen = false;
		this.setState({data: {...data}});
		this.fire('onClose');
	}

	handleExpandModal = (expanded) => {
		const {data} = this.state;
		data.expanded = expanded;
		this.setState({data: {...data}});
		this.fire('onExpand');
	}

	handleDragEndModal = () => {
		this.fire('onDragEnd');
	}

	fire(event) {
		this.refs.mapper.fire(event);
	}
}