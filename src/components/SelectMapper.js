import React from 'react';
import DemoMapper from '../DemoMapper';
import {ICON_TYPE} from 'uiex/consts';
import {SELECT_OPTIONS_ARRAY, SELECT_OPTIONS_OBJECTS_ARRAY, SELECT_OPTIONS_OBJECT, SELECT_OPTIONS_PROMISE, SELECT_OPTIONS_FUNCTION} from '../consts';

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
					description: 'Select name (String)',
					example: 'email'
				},
				value: {
					description: 'Select value (String | Number)',
					example: 'Some value'
				},
				placeholder: {
					description: 'Select placeholder (String)',
					example: 'Some placeholder'
				},
				empty: {
					description: 'Empty option title. If true, the default title is used (String | Boolean)',
					example: 'none'
				},
				options: {
					description: 'Select options (Array, Object, Promise, Function)',
					type: 'object',
					options: [SELECT_OPTIONS_ARRAY, SELECT_OPTIONS_OBJECTS_ARRAY, SELECT_OPTIONS_OBJECT, SELECT_OPTIONS_PROMISE, SELECT_OPTIONS_FUNCTION]
				},
				pendingPlaceholder: {
					description: 'Input placeholder when options is a pending promise (String)',
					example: 'Some placeholder'
				},
				iconType: {
					description: 'Select options icon type (String)',
					options: ICON_TYPE
				}
			}
		]
	};
	static componentName = 'Select';
}