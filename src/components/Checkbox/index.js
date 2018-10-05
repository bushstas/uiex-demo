import React from 'react';
import Demo from '../../Demo';
import {Checkbox} from 'uiex/Checkbox';
import {CheckboxGroup} from 'uiex/CheckboxGroup';
import {getSetState} from '../../utils';
import {ICON_TYPE} from 'uiex/consts';

const OPTIONS = [true, false];

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
		checked: true,
		children: 'checkbox children (works as additional content)',
		label: 'checkbox label'
	};
	static excluded = ['vertical', 'align', 'valign', 'height'];
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

	renderPreviewNote = () => {
		return (
			<Checkbox checked={this.state.withCheckboxGroup} onChange={this.handleCheckboxChange}>
				With a child checkbox group
			</Checkbox>
		) 
	}

	handleCheckboxChange = (withCheckboxGroup) => {
		this.setState({withCheckboxGroup});
	}

	renderContent() {
		if (this.state.withCheckboxGroup) {
			return (
				<CheckboxGroup>
					<Checkbox label="First">
						Some additional content
					</Checkbox>
					<Checkbox label="Second" />
					<Checkbox label="Third" />
					<Checkbox label="Fourth" />
					<Checkbox label="Fifth" />
					<Checkbox label="Sixth" />
					<Checkbox label="Seventh" />
					<Checkbox label="Eighth" />
					<Checkbox label="Nineth" />
					<Checkbox label="Tenth" />
				</CheckboxGroup>
			)
		}
	}
}