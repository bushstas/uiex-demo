import React from 'react';
import Demo from '../../Demo';
import {ColorPicker} from 'uiex/ColorPicker';
import {COLORS, COLORS2} from '../../consts';
import {getSetState} from '../../utils';

export default class ColorPickerDemo extends Demo {
	static map = {
		checkboxes: {
			withoutInput: {
				description: 'Without input'			
			},
			withoutRGB: {
				description: 'Without RGB inputs'
			}
		},
		inputs: [
			{
				value: {
					description: 'Value',
					type: 'color',
					withoutPicker: true
				},
				presetColors: {
					description: 'Array of preset colors hex strings',
					type: 'object',
					options: [COLORS, COLORS2]
				}
			}
		]
	};
	static data = {
		value: '#FD4DF5',
		presetColors: COLORS
	};	
	static excluded = ['width', 'height', 'align', 'valign', 'block', 'vertical', 'children'];
	static handlers = ['onChange', 'onChangeHue', 'onSelectPreset'];
	static args = {
		onChange: ['value', 'colorData'],
		onChangeHue: ['hue'],
		onSelectPreset: ['value']
	};
	static stateProps = ['value'];
	static funcs = {
		onChange: getSetState('value')
	};
	static consts = ['presetColors'];
	static componentName = 'ColorPicker';
	static component = ColorPicker;
	static changeState = {
		onChange: 'value'
	};
}