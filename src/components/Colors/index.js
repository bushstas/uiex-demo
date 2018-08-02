import React from 'react';
import {Colors} from 'uiex/Colors';
import Demo from '../../Demo';
import {COLORS} from '../../consts';

export default class ColorsDemo extends Demo {
	static map = {
		checkboxes: {
			isOpen: {
				type: 'boolean',
				description: 'Open/Close status flag',
				default: true
			}
		},
		inputs: [
			{
				columns: {
					description: 'Columns quantity',
					type: 'number',
					maxValue: 40,
					positive: true
				},
				colorHeight: {
					description: 'Color height',
					type: 'number',
					maxValue: 100,
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
		onSelect: 'this.setState({value});'
	};
	static stateProps = ['value'];
	static args = {
		onSelect: ['value'],
		onDisabledClick: ['value']
	};
	static component = Colors;
	static data = {
		columns: 8,
		width: 220,
		colorHeight: 24,
		colors: COLORS
	}
	static previewProps = {
		unclosable: true
	}
}