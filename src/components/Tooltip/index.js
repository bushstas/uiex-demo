import React from 'react';
import Demo from '../../Demo';
import {Tooltip} from 'uiex/Tooltip';
import {getSetState, previewRenderer} from '../../utils';
import {TOOLTIP_TYPES, TOOLTIP_POSITIONS, MODAL_ANIMATION, COLORS} from 'uiex/consts';
import {TOOLTIP_CONTENT} from '../../consts';

const POPUP_STYLE_OPTIONS = [
	{
		color: '#555',
		backgroundColor: '#fff',
		boxShadow: '3px 3px 10px #aaa'
	},
	{
		backgroundColor: '#333',
		fontSize: '14px',
		textShadow: '1px 1px 1px #000'
	},
	'border-radius: 20px; font-style: italic; padding: 20px; font-size: 15px;'
];

export default class TooltipDemo extends Demo {
	static map = {
		checkboxes: {
			popupShown: {
				description: 'Tooltip hint shown status'
			},
			popupFrozen: {
				description: 'Tooltip hint is always shown'
			},
			nowrap: {
				description: 'Tooltip hint nowrap'
			},
			withArrow: {
				description: 'Tooltip hint with arrow'
			}
		},
		inputs: [
			{
				type: {
					description: 'Tooltip appearance',
					options: TOOLTIP_TYPES
				},
				position: {
					description: 'Tooltip hint position',
					options: TOOLTIP_POSITIONS
				},
				size: {
					description: 'Tooltip size',
					type: 'number',
					positive: true,
					minValue: 18,
					maxValue: 60,
					example: '30'
				},
				text: {
					description: 'Tooltip text',
					maxLength: 3,
					example: '?'
				},
				transparency: {
					description: 'Tooltip hint  background transparency from 0 to 10',
					type: 'number',
					example: '5',
					maxValue: 10,
					positive: true,
					decimal: true,
					toFixed: 1
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
				textColor: {
					description: '',
					type: 'color',
					uncontrolled: true
				},
				popupColorTheme: {
					description: '',
					options: COLORS 
				},
				popupColor: {
					description: '',
					type: 'color',
					uncontrolled: true
				},
				popupBorder: {
					description: '',
					example: '1px solid #000'
				},
				popupShadow: {
					description: '',
					example: '5px 5px 20px #888'
				},
				animation: {
					description: '',
					options: MODAL_ANIMATION 
				},
				popupStyle: {
					description: 'Style of the popup (Object)',
					type: 'object',
					options: POPUP_STYLE_OPTIONS
				}
			}
		]
	};
	static data = {
		type: 'round',
		size: 40,
		popupShown: false,
		popupWidth: 400
	};
	static excluded = ['vertical', 'block', 'valign', 'height'];
	static handlers = ['onTogglePopup'];
	static stateProps = ['popupShown'];
	static consts = ['popupStyle'];
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