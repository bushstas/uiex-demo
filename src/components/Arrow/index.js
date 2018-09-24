import React from 'react';
import Demo from '../../Demo';
import {Arrow} from 'uiex/Arrow';
import {DIRECTIONS} from 'uiex/consts';

export default class ArrowDemo extends Demo {
	static map = {
		checkboxes: {
			clipped: {
				description: 'V-shaped arrow'
			},
			figured: {
				description: 'Figured arrow'
			}
		},
		inputs: [
			{
				value: {
					description: 'A value for onClick handler (String)',
					example: 'up'
				},
				direction: {
					description: 'An arrow\'s direction (String)',
					type: 'select',
					options: DIRECTIONS,
					
				},
				size: {
					description: 'An arrow\'s size in pixels from 5 to 200 (Number | Numeric String)',
					type: 'number',
					example: 20,
					positive: true,
					maxValue: 200,
					minValue: 5
				},
				lengthRatio: {
					description: 'An arrow\'s length ratio in percents from 20 to 200 (Number | Numeric String)',
					type: 'number',
					example: 75,
					positive: true,
					maxValue: 200,
					minValue: 20
				},
				thickness: {
					description: 'A clipped arrow\'s thickness from 1 to 6 (Number | Numeric String)',
					type: 'number',
					example: 4,
					positive: true,
					maxValue: 8,
					minValue: 1
				},
				figuredDepth: {
					description: 'A figured arrow\'s depth in percents from 5 to 80 (Number | Numeric String)',
					type: 'number',
					example: 20,
					positive: true,
					maxValue: 80,
					minValue: 5
				},
				color: {
					description: 'An arrow\'s color (String)',
					type: 'color'
				}
			}
		]
	};
	static data = {
		size: 50
	};
	static args = {
		onClick: ['value'],
		onDisabledClick: ['value']
	};
	static excluded = ['width', 'height', 'align', 'valign', 'children', 'vertical'];
	static handlers = ['onClick', 'onDisabledClick'];
	static componentName = 'Arrow';
	static component = Arrow;
}