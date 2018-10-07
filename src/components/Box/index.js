import React from 'react';
import Demo from '../../Demo';
import {Box} from 'uiex/Box';
import AnimatedMapper from '../AnimatedMapper'; 
import {getSetState, previewRenderer} from '../../utils';
import {BOX_CONTENT} from '../../consts';

import './style.scss';

export default class BoxDemo extends Demo {
	static map = {
		checkboxes: {
			isOpen: {
				description: 'Open/Close status flag'
			},
			buttonUnder: {
				description: 'Open/Close button is under the box'
			},
			noHideAnimation: {
				description: 'Animation is not used for hiding box'
			}
		},
		inputs: [
			{
				button: {
					description: 'Text of the expand button. Use "/" to separate text for open and closed states (String)',
					example: 'Open/Close',
					default: ''
				}
			}
		]
	};
	static data = {
		isOpen: true,
		buttonUnder: false,
		speed: 'fast',
		animation: 'fade-fall',
		effect: 'ease-in-out',
		button: 'Open the box/Close the box'
	};
	static excluded = ['vertical', 'block', 'valign', 'height'];
	static handlers = ['onToggle', 'onDisabledClick'];
	static stateProps = ['isOpen'];
	static funcs = {
		onToggle: getSetState('isOpen')
	};
	static args = {
		onToggle: ['isOpen']
	};
	static componentName = 'Box';
	static component = Box;
	static changeState = {
		onToggle: 'isOpen'
	}

	renderMapperBefore() {
		return (
			<AnimatedMapper 
				isOpen={true}
				data={this.state.data} 
				onChange={this.handleChangeData}
			/>
		)
	}

	renderContent() {
		return BOX_CONTENT;
	}

	renderPreviewContent = () => {
		return previewRenderer.render(BOX_CONTENT);
	}
}