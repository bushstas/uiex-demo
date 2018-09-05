import React from 'react';
import Demo from '../../Demo';
import {Modal} from 'uiex/Modal';
import {Button} from 'uiex/Button';
import {MODAL_ANIMATION} from 'uiex/consts';
import {getSetState} from '../../utils';

export default class ModalDemo extends Demo {
	static map = {
		checkboxes: {
			isOpen: {
				type: 'boolean',
				description: 'Open/Close status flag'
			},
			draggable: {
				type: 'boolean',
				description: 'Draggable flag'
			},
			dragWithinWindow: {
				type: 'boolean',
				description: 'Will have drag limits within the window'
			},
			withoutMask: {
				type: 'boolean',
				description: 'The mask will no be rendered if it\'s true'
			},
			noMaskClose: {
				type: 'boolean',
				description: 'Clicks on the mask will not cause the modal closing'
			},
			unclosable: {
				type: 'boolean',
				description: 'Usual ways to close the modal will not work'
			},
			expandable: {
				type: 'boolean',
				description: 'The modal will have expand control to get full window'
			},
			expanded: {
				type: 'boolean',
				description: 'Full window flag'
			},
			withoutPortal: {
				type: 'boolean',
				description: 'The modal will be rendered in the real parent without using a portal'
			}
		},
		inputs: [
			{
				header: {
					description: 'Content of header. Can be a React element',
					default: ''
				},
				footer: {
					description: 'Content of footer. Can be a React element',
					default: ''
				},
				outerContent: {
					description: 'Outer content rendered above the mask. Can be a React element',
					default: ''
				},
				animation: {
					type: 'select',
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
		expanded: false
	};	
	static excluded = ['vertical', 'block', 'float', 'align', 'valign', 'hidden', 'disabled'];
	static handlers = ['onExpand', 'onClose', 'onDragEnd'];
	static stateProps = ['isOpen', 'expanded'];
	static funcs = {
		onClose: getSetState('isOpen', false),
		onExpand: getSetState('expanded', false)
	};
	static args = {
		onExpand: ['expanded'],
		onDragEnd: ['x', 'y']
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