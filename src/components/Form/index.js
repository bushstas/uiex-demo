import React from 'react';
import Demo from '../../Demo';
import {Form} from 'uiex/Form';
import {FormControl} from 'uiex/FormControl';
import {FormControlGroup} from 'uiex/FormControlGroup';
import {Input} from 'uiex/Input';
import {InputNumber} from 'uiex/InputNumber';
import {getSetState, previewRenderer} from '../../utils';

const CAPTION_STYLE_OPTIONS = [
	{
		fontWeight: 'bold'
	},
	{
		color: 'red',
		fontStyle: 'italic'
	},
	'font-weight: 500; font-size: 32px; color: #555;'
];

export default class FormDemo extends Demo {
	static map = {
		inputs: [
			{
				name: {
					description: 'A name of the form. Changes won\'t have any effect (String)'
				},
				columns: {
					description: 'Quantity of cells in a row (Number)',
					type: 'number',
					maxValue: 10,
					positive: true
				},
				cellSize: {
					description: 'Cell default size (Number)',
					maxValue: 10,
					type: 'number',
					positive: true
				},
				data: {
					description: 'Form data (Object)',					
					type: 'object',
					options: [{address: 'Kazan', age: 16}]
				},
				caption: {
					description: 'Form caption (String | React.Node)',
					stretched: true
				},
				captionStyle: {
					description: 'Style of the form caption (Object | String)',
					type: 'object',
					options: CAPTION_STYLE_OPTIONS
				}
			}
		]
	};
	static data = {
		name: "testform",
		width: 600,
		columns: 1,
		cellSize: 1,
		data: {age: 22},
		caption: 'My test form',
		captionStyle: 'font-weight:bold;color:#aaa;'
	};
	static excluded = ['vertical', 'block', 'valign'];
	static handlers = ['onChange'];
	static stateProps = ['data'];
	static funcs = {
		onChange: getSetState('data')
	};
	static args = {
		onChange: ['data', 'fieldName', 'value']
	};
	static changeState = {
		onChange: 'data'
	};
	static componentName = 'Form';
	static component = Form;

	renderContent() {	
		return [
			<FormControlGroup key="1">
				<FormControl caption="Address">
					<Input name="address" />
				</FormControl>
				<FormControl caption="Age">
					<InputNumber
						name="age"
						maxValue="120"
						positive
					/>
				</FormControl>
			</FormControlGroup>
		];
	}

	renderPreviewContent() {
		return previewRenderer.render(this.renderContent());
	}
}