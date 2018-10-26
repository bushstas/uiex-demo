import React from 'react';
import Demo from '../../Demo';
import {Tooltip} from 'uiex/Tooltip';
import {getSetState, previewRenderer} from '../../utils';
import {TOOLTIP_TYPES, TOOLTIP_POSITIONS, MODAL_ANIMATION} from 'uiex/consts';
import {TOOLTIP_CONTENT} from '../../consts';

export default class TooltipDemo extends Demo {
	static map = {
		checkboxes: {
			popupShown: {
				description: 'Color of tab buttons'
			},
			popupFrozen: {
				description: 'Color of tab buttons'
			},
			nowrap: {
				description: 'Color of tab buttons'
			},
			withArrow: {
				description: 'Color of tab buttons'
			}
		},
		inputs: [
			{
				type: {
					description: 'Color of tab buttons',
					options: TOOLTIP_TYPES
				},
				position: {
					description: 'Color of tab buttons',
					options: TOOLTIP_POSITIONS
				},
				size: {
					description: 'Color of tab buttons',
					type: 'number',
					positive: true,
					minValue: 18,
					maxValue: 60,
					example: '30'
				},
				text: {
					description: 'Color of tab buttons',
					maxLength: 3,
					example: '?'
				},
				delay: {
					description: 'Color of tab buttons',
					type: 'number',
					positive: true,
					maxValue: 2000,
					example: '1000'
				},
				popupWidth: {
					description: 'Color of tab buttons',
					type: 'number',
					positive: true,
					maxValue: 1500,
					example: '400'
				},
				animation: {
					description: '',
					options: MODAL_ANIMATION 
				}
			}
		]
	};
	static data = {
		popupWidth: 400
	};
	static excluded = ['vertical', 'block', 'valign', 'height'];
	static handlers = ['onTogglePopup'];
	static stateProps = ['popupShown'];
	static funcs = {
		onTogglePopup: getSetState('popupShown')
	};
	static args = {
		onTogglePopup: ['popupShown']
	};
	static componentName = 'Tooltip';
	static component = Tooltip;
	static changeState = {
		onTogglePopup: 'popupShown'
	}

	renderContent() {
		return TOOLTIP_CONTENT;
	}

	renderPreviewContent = () => {
		return previewRenderer.render(TOOLTIP_CONTENT);
	}
}