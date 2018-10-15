import React from 'react';
import Demo from '../../Demo';
import {Checkbox} from 'uiex/Checkbox';
import {CheckboxGroup} from 'uiex/CheckboxGroup';
import {getSetState, previewRenderer} from '../../utils';
import {ICON_TYPE} from 'uiex/consts';
import {CHECKBOX_GROUP_OPTIONS} from '../../consts';

const CHECK_ALL_OPTIONS = [true, 'Check all these pretty checkboxes'];

const CONTROL_STYLE_OPTIONS = [
	{
		borderColor: 'red'
	},
	{
		width: '32px',
		height: '32px',
	}
];

const MARKER_STYLE_OPTIONS = [
	{
		backgroundColor: 'red'
	},
	{
		backgroundColor: 'blue',
		borderRadius: '50%'
	},
	{
		left: '5px',
		top: '5px',
		right: '5px',
		bottom: '5px'
	}
];

const LABEL_STYLE_OPTIONS = [
	{
		color: 'red'
	},
	{
		fontWeight: 'bold',
		fontSize: '32px',
		lineHeight: '32px',
	}
];

const CONTENT_STYLE_OPTIONS = [
	{
		color: '#AAAAAA'
	},
	{
		fontStyle: 'italic'
	}
];

export default class CheckboxGroupDemo extends Demo {
	static map = {
		checkboxes: {
			linked: {
				description: 'With a connecting line'
			},
			noBorder: {
				description: 'Without borders'
			},
			radioMode: {
				description: 'Works like RadioGroup'
			},
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
					example: 'options'
				},
				value: {
					description: 'A value of the control. Null is for undetermined state of the checkbox (Boolean | null | Array | String | Number)',
					type: 'object',
					options: CHECKBOX_GROUP_OPTIONS
				},
				checkAll: {
					description: 'Check all checkbox label text or true for default text (Boolean | String)',
					type: 'object',
					options: CHECK_ALL_OPTIONS,
				},
				maxHeight: {
					type: 'number',
					description: 'Max height style attribute (Number | Numeric String)',
					example: '400',
					minValue: 200,
					maxValue: 1000,
					positive: true,
					correctionOnBlur: true
				},
				icon: {
					description: 'Checkbox icon for "checked" state',
					example: 'check'
				},
				iconType: {
					description: 'Checkbox icon type for "checked" state',
					options: ICON_TYPE
				},
				controlStyle: {
					description: 'Style of the checkbox control (Object)',
					type: 'object',
					options: CONTROL_STYLE_OPTIONS
				},
				markerStyle: {
					description: 'Style of the checkbox marker (Object)',
					type: 'object',
					options: MARKER_STYLE_OPTIONS
				},
				labelStyle: {
					description: 'Style of the checkbox label (Object)',
					type: 'object',
					options: LABEL_STYLE_OPTIONS
				},
				contentStyle: {
					description: 'Style of the checkbox additional content (children) (Object)',
					type: 'object',
					options: CONTENT_STYLE_OPTIONS
				}
			}
		]
	};
	static data = {
		width: 300,
		maxHeight: 400
	};
	static excluded = ['vertical', 'align', 'valign', 'height'];
	static handlers = ['onChange', 'onDisabledClick'];
	static stateProps = ['value'];
	static funcs = {
		onChange: getSetState('value')
	};
	static args = {
		onChange: ['value', 'name'],
		onDisabledClick: ['name']
	};
	static componentName = 'CheckboxGroup';
	static component = CheckboxGroup;
	static changeState = {
		onChange: 'value'
	};

	renderContent() {	
		return [
			<Checkbox key="1" label="First" name="1">
				Some additional content
			</Checkbox>,
			<Checkbox key="2" label="Second" name="2" />,
			<Checkbox key="3" label="Third" name="3" />,
			<Checkbox key="4" label="Fourth" name="4" />,
			<Checkbox key="5" label="Fifth" name="5" />,
			<Checkbox key="6" label="Sixth" name="6" />,
			<Checkbox key="7" label="Seventh" name="7" />,
			<Checkbox key="8" label="Eighth" name="8" />,
			<Checkbox key="9" label="Nineth" name="9" />,
			<Checkbox key="10" label="Tenth" name="10">
				<CheckboxGroup>
					<Checkbox label="10.1" name="10.1"/>
					<Checkbox label="10.2" name="10.2"/>
					<Checkbox label="10.3" name="10.3"/>
					<Checkbox label="10.4" name="10.4"/>
					<Checkbox label="10.5" name="10.5"/>
					<Checkbox label="10.6" name="10.6">
						<CheckboxGroup radioMode>
							<Checkbox label="10.6.1" name="10.6.1"/>
							<Checkbox label="10.6.2" name="10.6.2"/>
							<Checkbox label="10.6.3" name="10.6.3"/>
							<Checkbox label="10.6.4" name="10.6.4"/>
							<Checkbox label="10.6.5" name="10.6.5"/>
						</CheckboxGroup>
					</Checkbox>
				</CheckboxGroup>
			</Checkbox>,
			<Checkbox key="11" label="Eleventh" name="11" />
		];
	}

	renderPreviewContent() {
		return previewRenderer.render(this.renderContent());
	}
}