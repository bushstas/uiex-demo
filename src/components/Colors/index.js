import React from 'react';
import {Colors} from 'uiex/Colors';
import Demo from '../../Demo';
import {COLORS, COLORS2} from '../../consts';
import {getSetState} from '../../utils';

export default class ColorsDemo extends Demo {
	static map = {
		checkboxes: {
			selectable: {
				description: 'Selected color will be highlighted'
			},
			round: {
				description: 'Colors will be round-shaped'
			},
			square: {
				description: 'Colors will not have border radius'
			},
			withoutBorder: {
				description: 'Colors don\'t have borders'
			}
		},
		inputs: [
			{
				columns: {
					description: 'Columns quantity (Number | Numeric String)',
					type: 'number',
					maxValue: 40,
					positive: true
				},
				colorHeight: {
					description: 'Color height (Number | Numeric String)',
					type: 'number',
					maxValue: 100,
					positive: true
				},
				colors: {
					description: 'Colors list (Array)',
					type: 'object',
					options: [COLORS, COLORS2]
				},
				margin: {
					description: 'Horizontal and vertical margin between colors',
					type: 'number',
					maxValue: 40,
					positive: true
				}
			}
		]
	};
	static componentName = 'Colors';
	static handlers = ['onSelect', 'onDisabledClick'];
	static excluded = ['block', 'vertical', 'align', 'valign', 'children', 'height'];
	static consts = ['colors'];
	static funcs = {
		onSelect: getSetState('value')
	};
	static stateProps = ['value'];
	static args = {
		onSelect: ['value'],
		onDisabledClick: ['value']
	};
	static component = Colors;
	static data = {
		columns: 8,
		width: 235,
		colorHeight: 24,
		colors: COLORS,
		margin: 5
	}
	static previewProps = {
		unclosable: true
	}
	static changeState = {
		onSelect: 'value'
	}
}