import React from 'react';
import DemoMapper from '../DemoMapper';
import {COLORS, FORM_BUTTON_DISPLAY} from 'uiex/consts';
import {MEASURES} from '../consts';

export default class FormMapper extends DemoMapper {
	static map = {
		checkboxes: {
			captionInside: {
				description: 'Button is only shown on focus',
				defaultValue: false
			},
			noBorder: {
				description: 'Button is only shown on focus',
				defaultValue: false
			}
		},
		inputs: [
			{
				caption: {
					description: 'Caption of the form',
					example: 'Form caption'
				},
				buttonWidth: {
					type: 'number',
					description: 'Width of submit button',
					example: '120',
					maxValue: 1000,
					measure: 'px',
					measures: MEASURES,
					positive: true
				},
				buttonHeight: {
					type: 'number',
					description: 'Height of submit button',
					example: '50',
					maxValue: 200,
					measure: 'px',
					positive: true
				},
				buttonColor: {
					description: 'Color of submit button',
					options: COLORS,
					empty: 'Chose an option'
				},
				buttonDisplay: {
					description: 'Display of submit button',
					options: FORM_BUTTON_DISPLAY,
					empty: 'Chose an option'
				},
				value: {
					description: 'Value of input',
					example: 'word'
				}
			},
			{
				contentBefore: {
					description: 'Content displayed before controls',
					example: 'Some tiny note',
					size: 6
				},
			}
		]
	};
	static componentName = 'UIEXForm';
	static formName = 'formMapper';
}