import React from 'react';
import Demo from '../../Demo';
import {Button} from 'uiex/Button';
import {BUTTONS_VIEW, COLORS, ICON_TYPE} from 'uiex/consts';

export default class ButtonDemo extends Demo {
	static map = {
		checkboxes: {
			gradient: {
				description: 'Button with gradient'
			}
		},
		inputs: [
			{
				value: {
					description: 'A value for onClick handler (String)',
					example: 'up'
				},
				href: {
					description: 'Button will be a link (String)',
					example: 'https://google.come'
				},
				target: {
					description: 'Target property for a link button (String)'
				},
				colorPreset: {
					description: 'Color preset of tab buttons (String)',
					options: COLORS
				},
				color: {
					description: 'Color of tab buttons (prevails over colorPreset) (String)',
					type: 'color'
				}
			}
		]
	};
	static data = {
		children: 'Click me'
	};
	static args = {
		onClick: ['value'],
		onDisabledClick: ['value']
	};
	static excluded = ['valign', 'vertical'];
	static handlers = ['onClick', 'onDisabledClick'];
	static componentName = 'Button';
	static component = Button;
}