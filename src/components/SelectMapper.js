import React from 'react';
import DemoMapper from '../DemoMapper';
import {SELECT_OPTIONS_ARRAY, SELECT_OPTIONS_OBJECT} from 'uiex/consts';

export default class SelectMapper extends DemoMapper {
	static map = {
		checkboxes: {
			optionsShown: {
				description: 'Options are constantly shown'
			},
			multiple: {
				description: 'You can select few options'
			}
		},
		inputs: [
			{			
				name: {
					description: 'Input name (String)',
					example: 'email'
				},
				value: {
					description: 'Input value (String | Number)',
					example: 'Some value'
				},
				placeholder: {
					description: 'Input placeholder (String)',
					example: 'Some placeholder'
				},
				empty: {
					description: 'Empty option title (String | Boolean)',
					example: 'none'
				},
				options: {
					type: 'object',
					options: [SELECT_OPTIONS_ARRAY, SELECT_OPTIONS_OBJECT],
					stretched: true
				}
			}
		]
	};
	static componentName = 'Select';
}