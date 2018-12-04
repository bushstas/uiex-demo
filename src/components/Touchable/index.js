import React from 'react';
import Demo from '../../Demo';
import {Touchable} from 'uiex/Touchable';
import {AXIS} from 'uiex/consts';
import {previewRenderer} from '../../utils';

export default class TouchableDemo extends Demo {
	static map = {
		inputs: [
			{
				direction: {
					description: 'Color of tab buttons',
					options: AXIS
				}
			}
		]
	};
	static data = {
		width: 500,
		height: 300,
		style: 'border: 1px solid #aaa; border-radius: 3px;'
	};
	static excluded = ['vertical', 'block', 'valign', 'height'];
	static handlers = ['onPushLeft', 'onPushRight', 'onPushUp', 'onPushDown', 'onReleaseLeft', 'onReleaseRight', 'onReleaseUp', 'onReleaseDown'];
	static stateProps = [];
	static funcs = {
		
	};
	static args = {
		
	};
	static componentName = 'Touchable';
	static component = Touchable;
}