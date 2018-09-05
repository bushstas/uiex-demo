import React from 'react';
import Demo from '../../Demo';
import {SliderScale} from 'uiex/SliderScale';
import {getSetState} from '../../utils';

export default class SliderScaleDemo extends Demo {
	static map = {
		checkboxes: {
			exactValue: {
				description: 'You can choose only one of given values'
			},
			withoutScale: {
				description: 'Numbers of the scalу will not be displayed'
			}
		},
		inputs: [
			{
				value: {
					description: 'Value of the control (Number | Numeric String)',
					example: 100,
					type: 'number'
				}
			}
		]
	};
	static data = {
		width: 500
	};
	static excluded = ['vertical', 'valign', 'height'];
	static handlers = ['onChange', 'onDisabledClick'];
	static stateProps = ['isOpen'];
	static funcs = {
		onChange: getSetState('value')
	};
	static args = {
		onChange: ['value']
	};
	static componentName = 'SliderScale';
	static component = SliderScale;
	static changeState = {
		onChange: 'value'
	}
}