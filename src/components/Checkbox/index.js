import React from 'react';
import Demo from '../../Demo';
import {Checkbox} from 'uiex/Checkbox';
import {getSetState} from '../../utils';
import {ICON_TYPE} from 'uiex/consts';

const OPTIONS = [true, false];

export default class CheckboxDemo extends Demo {
	static map = {
		checkboxes: {
			multiline: {
				description: 'Multilined label'
			},
			readOnly: {
				description: 'Checkbox becomes readonly'
			}
		},
		inputs: [
			{
				name: {
					description: 'Checkbox name (String)',
					example: 'option'
				},
				value: {
					description: 'Checkbox value. Mostly for multileveled checkbox groups (String | Number)',
					example: 25
				},
				checked: {
					description: 'Checked flag. Null is for undetermined state of the checkbox (Boolean | null)',
					type: 'object',
					options: OPTIONS
				},
				label: {
					description: 'Label of the checkbox. When the label is empty, children will be rendered as a label (String)',
					example: 'Check me',
				},
				icon: {
					description: 'Checkbox icon for "checked" state',
					example: 'check'
				},
				iconType: {
					description: 'Checkbox icon type for "checked" state',
					options: ICON_TYPE
				}
			}
		]
	};
	static data = {
		checked: true,
		children: 'checkbox children (works as additional content)',
		label: 'checkbox label'
	};
	static excluded = ['vertical', 'valign', 'height'];
	static handlers = ['onChange', 'onDisabledClick'];
	static stateProps = ['checked'];
	static funcs = {
		onChange: getSetState('checked')
	};
	static args = {
		onChange: ['checked', 'name', 'value'],
		onDisabledClick: ['checked', 'name', 'value']
	};
	static componentName = 'Checkbox';
	static component = Checkbox;
	static changeState = {
		onChange: 'checked'
	}
}