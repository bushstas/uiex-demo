import React from 'react';
import Demo from '../../Demo';
import {Loader} from 'uiex/Loader';
import {SPINNER_TYPES} from 'uiex/consts';
import {previewRenderer} from '../../utils';
import {LOADER_CONTENT} from '../../consts';

const MASK_STYLE_OPTIONS = [
	{
		left: 20,
		top: 20,
		right: 20,
		bottom: 20
	},
	'opacity: 0.3; background-color: green'
];

export default class LoaderDemo extends Demo {
	static map = {
		checkboxes: {
			loading: {
				description: ''
			},
			overlayed: {
				description: ''
			},
			withoutMask: {
				description: ''
			}
		},
		inputs: [
			{
				loadingText: {
					description: '',
				},
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
				spinnerType: {
					description: '',
					options: SPINNER_TYPES
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
				},
				spinnerSpeed: {
					description: '',
					type: 'number',
					positive: true,
					maxValue: 40,
					minValue: 5
				},
				maskStyle: {
					description: 'The mask style (Object | String)',
					type: 'object',
					options: MASK_STYLE_OPTIONS
				}
			}
		]
	};
	static data = {
		spinnerSize: 64,
		spinnerThickness: 8,
		loading: true,
		overlayed: true,
		spinnerType: 'roller',
		className: 'loader-preview'
	};
	static excluded = ['vertical', 'valign', 'align', 'block', 'disabled', 'uncontrolled'];
	static handlers = [];
	static stateProps = [];
	static funcs = {
		
	};
	static args = {
		
	};
	static componentName = 'Loader';
	static component = Loader;

	renderContent() {
		return LOADER_CONTENT;
	}

	renderPreviewContent = () => {
		return previewRenderer.render(LOADER_CONTENT);
	}
}