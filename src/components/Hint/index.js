import React from 'react';
import Demo from '../../Demo';
import {Hint} from 'uiex/Hint';
import {getSetState, previewRenderer} from '../../utils';
import {TOOLTIP_POSITIONS, MODAL_ANIMATION, COLORS} from 'uiex/consts';
import {TOOLTIP_CONTENT} from '../../consts';

const refs = {
	first: React.createRef(),
	second: React.createRef()
};

export default class HintDemo extends Demo {
	static map = {
		checkboxes: {
			isOpen: {
				description: 'Tooltip hint shown status'
			},
			isFrozen: {
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
				position: {
					description: 'Tooltip hint position',
					options: TOOLTIP_POSITIONS
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
				textColor: {
					description: '',
					type: 'color'
				},
				colorTheme: {
					description: '',
					options: COLORS 
				},
				color: {
					description: '',
					type: 'color'
				},
				border: {
					description: '',
					example: '1px solid #000'
				},
				boxShadow: {
					description: '',
					example: '5px 5px 20px #888'
				},
				animation: {
					description: '',
					options: MODAL_ANIMATION 
				}
			}
		]
	};
	static data = {
		isOpen: false,
		width: 400,
		target: refs.first
	};
	static excluded = ['vertical', 'block', 'valign', 'height'];
	static handlers = ['onToggleShown'];
	static stateProps = ['isOpen'];
	static funcs = {
		onToggleShown: getSetState('isOpen')
	};
	static args = {
		onToggleShown: ['isOpen']
	};
	static componentName = 'Hint';
	static component = Hint;
	static changeState = {
		onToggleShown: 'isOpen'
	}

	renderContent() {
		return TOOLTIP_CONTENT;
	}

	renderPreviewContent = () => {
		return previewRenderer.render(TOOLTIP_CONTENT);
	}

	renderPreviewContentBefore() {
		return (
			<div>
				<div className="hint-target" ref={refs.first}>
					First
				</div>
				<div className="hint-target" ref={refs.second}>
					Second
				</div>
			</div>
		)
	}
}