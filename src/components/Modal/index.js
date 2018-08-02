import React from 'react';
import Demo from '../../Demo';
import {Modal} from 'uiex/Modal';
import {Button} from 'uiex/Button';
import {MODAL_ANIMATION} from 'uiex/consts';

import './style.scss';

export default class ModalDemo extends Demo {
	static map = {
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
	};
	static data = {
		width: 700,
		height: 500,
		isOpen: false,
		header: 'Modal Header',
		footer: 'Modal Footer',
	};	
	static excluded = ['vertical', 'block', 'float', 'align', 'valign', 'hidden', 'disabled'];
	static handlers = ['onExpand', 'onClose', 'onDragEnd'];
	static stateProps = ['isOpen'];
	static funcs = {
		onClose: 'this.setState({isOpen: false});',
		onDragEnd: 'const {x, y} = coords;'
	};
	static args = {
		onExpand: ['isExpanded'],
		onDragEnd: ['coords']
	};
	static componentName = 'Modal';
	static component = Modal;
	static componentMapperProps = {
		maxHeight: 1000
	};
	static changeState = {
		onExpand: 'expanded',
		onClose: ['isOpen', false],
		onShow: ['isOpen', true]
	};

	renderPreviewContentBefore() {
		return (
			<Button onClick={this.getHandler('onShow')}>
				Show Modal
			</Button>
		)
	}

	renderContent() {
		const {unclosable} = this.state.data;
		return (
			unclosable ? 
				<div className="flex mb20">
					<Button className="mr20" onClick={this.getHandler('onClose')}>
						Forced closing
					</Button>
					Use your own buttons or other ways to close unclosable modals
				</div>
			: null
		)
	}
}