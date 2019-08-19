import React from 'react';
import DemoMapper from '../DemoMapper';
import {ICON_TYPE} from 'uiex/consts';
import {SELECT_OPTIONS_ARRAY, SELECT_OPTIONS_OBJECTS_ARRAY, SELECT_OPTIONS_OBJECT, SELECT_OPTIONS_PROMISE, SELECT_OPTIONS_FUNCTION} from '../consts';

const MENU_STYLE_OPTIONS = [
	{
		boxShadow: '0 0 10px #888888'
	},
	{
		borderColor: '#222222',
		borderRadius: '20px'
	}
];

const OPTION_STYLE_OPTIONS = [
	{
		color: 'green'
	},
	{
		fontWeight: 'bold',
		fontStyle: 'italic'
	}
];

export default class SelectMapper extends DemoMapper {
	static map = {
		checkboxes: {
			optionAsValue: {
				description: 'Change handler gets the whole option as value'
			},
			optionsShown: {
				description: 'Options are constantly shown'
			},
			multiple: {
				description: 'You can select few options'
			},
			readOnly: {
				description: 'You can\'t change value'
			}
		},
		inputs: [
			{			
				name: {
					description: 'Select name (String)',
					example: 'email'
				},
				value: {
					description: 'Select value (String | Number | Array | Object)',
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
				},
				menuStyle: {
					description: 'Style of the select popup menu (Object)',
					type: 'object',
					options: MENU_STYLE_OPTIONS
				},
				optionStyle: {
					description: 'Style of the select popup menu options (Object)',
					type: 'object',
					options: OPTION_STYLE_OPTIONS
				}
			}
		]
	};
	static componentName = 'Select';
	static formName = 'selectMapper';
}