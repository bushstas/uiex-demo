import React from 'react';
import Demo from '../../Demo';
import {Checkbox} from 'uiex/Checkbox';
import {CheckboxGroup} from 'uiex/CheckboxGroup';
import {getSetState, previewRenderer} from '../../utils';
import {ICON_TYPE} from 'uiex/consts';
import {CHECKBOX_OPTIONS, CHECKBOX_GROUP_OPTIONS} from '../../consts';

const CONTROL_STYLE_OPTIONS = [
	{
		borderColor: 'red'
	},
	{
		width: '32px',
		height: '32px',
	},
	'background-color: blue'
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
	},
	'background-color: orange'
];

const LABEL_STYLE_OPTIONS = [
	{
		color: 'red'
	},
	{
		fontWeight: 'bold',
		fontSize: '32px',
		lineHeight: '32px',
	},
	'font-style: italic'
];

const CONTENT_STYLE_OPTIONS = [
	{
		color: '#AAAAAA'
	},
	{
		fontStyle: 'italic'
	},
	'padding: 30px'
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
					description: 'A value of the control. Null is for undetermined state of the checkbox (Boolean | null | Array | String | Number)',
					type: 'object',
					options: function() {
						return !this.state.withCheckboxGroup ? CHECKBOX_OPTIONS : CHECKBOX_GROUP_OPTIONS;
					}
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
					description: 'Style of the checkbox control (Object | String)',
					type: 'object',
					options: CONTROL_STYLE_OPTIONS
				},
				markerStyle: {
					description: 'Style of the checkbox marker (Object | String)',
					type: 'object',
					options: MARKER_STYLE_OPTIONS
				},
				labelStyle: {
					description: 'Style of the checkbox label (Object | String)',
					type: 'object',
					options: LABEL_STYLE_OPTIONS
				},
				contentStyle: {
					description: 'Style of the checkbox additional content (children) (Object | String)',
					type: 'object',
					options: CONTENT_STYLE_OPTIONS
				}
			}
		]
	};
	static data = {
		name: 'aaa',
		value: ["10.1", "10.5"],
		children: 'checkbox children (works as additional content)',
		label: 'checkbox label'
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
	static componentName = 'Checkbox';
	static component = Checkbox;
	static changeState = {
		onChange: 'value'
	};

	renderPreviewNote = () => {
		return (
			<Checkbox value={this.state.withCheckboxGroup} onChange={this.handleCheckboxChange}>
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
					<Checkbox label="First" name="1">
						Some additional content
					</Checkbox>
					<Checkbox label="Second" name="2" />
					<Checkbox label="Third" name="3" />
					<Checkbox label="Fourth" name="4" />
					<Checkbox label="Fifth" name="5" />
					<Checkbox label="Sixth" name="6" />
					<Checkbox label="Seventh" name="7" />
					<Checkbox label="Eighth" name="8" />
					<Checkbox label="Nineth" name="9" />
					<Checkbox label="Tenth" name="10">
						<CheckboxGroup>
							<Checkbox label="10.1" name="10.1"/>
							<Checkbox label="10.2" name="10.2"/>
							<Checkbox label="10.3" name="10.3"/>
							<Checkbox label="10.4" name="10.4"/>
							<Checkbox label="10.5" name="10.5"/>
							<Checkbox label="10.6" name="10.6">
								<CheckboxGroup>
									<Checkbox label="10.6.1" name="10.6.1"/>
									<Checkbox label="10.6.2" name="10.6.2"/>
									<Checkbox label="10.6.3" name="10.6.3"/>
									<Checkbox label="10.6.4" name="10.6.4"/>
									<Checkbox label="10.6.5" name="10.6.5"/>
								</CheckboxGroup>
							</Checkbox>
						</CheckboxGroup>
					</Checkbox>
					<Checkbox label="Eleventh" name="11" />
				</CheckboxGroup>
			)
		}
	}

	renderPreviewContent() {
		if (this.state.withCheckboxGroup) {
			return previewRenderer.render(this.renderContent());
		}
	}
}