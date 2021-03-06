import React from 'react';
import Demo from '../../Demo';
import {SidePanel} from 'uiex/SidePanel';
import {Button} from 'uiex/Button';
import {getSetState} from '../../utils';
import {SIDES, PANEL_ANIMATION, ANIM_SPEED, ANIM_EFFECTS} from 'uiex/consts';

export default class SidePanelDemo extends Demo {
	static map = {
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
					description: 'Side',
					options: SIDES,
					default: 'left'
				},
				animation: {
					type: 'select',
					description: 'Animation type',
					options: PANEL_ANIMATION
				},
				speed: {
					type: 'select',
					description: 'Animation speed',
					options: ANIM_SPEED,
					default: 'fast'
				},
				effect: {
					type: 'select',
					description: 'Animation effect',
					options: ANIM_EFFECTS,
					default: 'ease-in-out'
				}
			}
		]
	};
	static data = {
		width: '50%',
		height: '50%',
		side: 'right',
		isOpen: true
	};
	static excluded = ['vertical', 'block', 'float', 'align', 'valign', 'disabled', 'hidden'];
	static handlers = ['onCollapse'];
	static stateProps = ['isOpen'];
	static funcs = {
		onCollapse: getSetState('isOpen', false)
	};
	static componentName = 'SidePanel';
	static component = SidePanel;
	static componentMapperProps = {
		maxHeight: 1000
	};
	static changeState = {
		onCollapse: ['isOpen', false],
		onShow: ['isOpen', true]
	};

	renderPreviewContentBefore() {
		return (
			<Button onClick={this.getHandler('onShow')}>
				Show SidePanel
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
					Use your own buttons or other ways to close unclosable side panels
				</div>
			: null
		)
	}
}