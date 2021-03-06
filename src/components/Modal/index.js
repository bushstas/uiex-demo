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
				description: 'Open/Close status flag'
			},
			draggable: {
				description: 'Draggable flag'
			},
			dragWithinWindow: {
				description: 'Will have drag limits within the window'
			},
			withoutMask: {
				description: 'The mask will no be rendered if it\'s true'
			},
			noMaskClose: {
				description: 'Clicks on the mask will not cause the modal closing'
			},
			unclosable: {
				description: 'Usual ways to close the modal will not work'
			},
			expandable: {
				description: 'The modal will have expand control to get full window'
			},
			expanded: {
				description: 'Full window flag'
			},
			withoutPortal: {
				description: 'The modal will be rendered in the real parent without using a portal'
			},
			withoutPadding: {
				description: 'Main modal container without paddings'
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
					description: 'Mask opacity from 0 to 10. Can be decimal',
					type: 'number',
					example: '5',
					maxValue: 10,
					positive: true,
					decimal: true,
					toFixed: 1
				},
				maskColor: {
					description: 'Mask background color',
					type: 'color',
					uncontrolled: true
				},
				x: {
					type: 'number',
					description: 'Current X coordinate (Number | Numeric String)',
					example: 50
				},
				y: {
					type: 'number',
					description: 'Current Y coordinate (Number | Numeric String)',
					example: 50
				},
				blurSelector: {
					description: 'Css selector of an element that should be blurred, when the modal is shown. Works only for modals in portal (String)',
					example: '#root'
				},
				blurValue: {
					description: 'Strength of blurring from 1 to 10 (Number | Numeric String)',
					type: 'number',
					positive: true,
					maxValue: 10,
					example: 3
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
	static handlers = ['onExpand', 'onClose',  'onDragStart', 'onDrag', 'onDragEnd'];
	static stateProps = ['isOpen', 'expanded', 'x', 'y'];
	static funcs = {
		onClose: getSetState('isOpen', false),
		onExpand: getSetState('expanded'),
		onDrag: getSetState(['x', 'y']),
	};
	static args = {
		onExpand: ['expanded'],
		onDrag: ['x', 'y'],
		onDragStart: ['x', 'y'],
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
		onShow: ['isOpen', true],
		onDrag: function(x, y) {
			return {x, y};
		}
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