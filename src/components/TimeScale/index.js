import React from 'react';
import Demo from '../../Demo';
import {TimeScale} from 'uiex/TimeScale';
import {getSetState} from '../../utils';

export default class TimeScaleDemo extends Demo {
	static map = {
		checkboxes: {
			
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
	static componentName = 'TimeScale';
	static component = TimeScale;
	static changeState = {
		onChange: 'value'
	}
}