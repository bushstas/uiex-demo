import React from 'react';
import Demo from '../../Demo';
import {Loader} from 'uiex/Loader';

export default class LoaderDemo extends Demo {
	static map = {
		checkboxes: {
			loading: {
				description: ''
			},
			overlayed: {
				description: ''
			}
		},
		inputs: [
			{
				maskColor: {
					description: '',
					type: 'color'
				},
				maskOpacity: {
					description: 'Mask opacity from 0 to 10. Can be decimal',
					type: 'number',
					example: '5',
					maxValue: 10,
					decimal: true,
					toFixed: 1,
					positive: true
				},
				spinnerColor: {
					description: '',
					type: 'color'
				},
				spinnerSize: {
					description: '',
					type: 'number',
					positive: true,
					maxValue: 100,
					minValue: 10
				},
				spinnerThickness: {
					description: '',
					type: 'number',
					positive: true,
					maxValue: 40,
					minValue: 1
				}
			}
		]
	};
	static data = {
		height: 400
	};
	static excluded = ['vertical', 'block', 'valign', 'height'];
	static handlers = [];
	static stateProps = [];
	static funcs = {
		
	};
	static args = {
		
	};
	static componentName = 'Loader';
	static component = Loader;

}