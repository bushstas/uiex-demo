import React from 'react';
import Demo from '../../Demo';
import {Form, change, reset, clear} from 'uiex/Form';
import {FormControl} from 'uiex/FormControl';
import {FormControlGroup} from 'uiex/FormControlGroup';
import {Input} from 'uiex/Input';
import {Button} from 'uiex/Button';
import {InputNumber} from 'uiex/InputNumber';
import {getSetState, previewRenderer, wrap, tabulation, wrapString, stringify} from '../../utils';

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

const changeButtonPreviewData = {
	onClick: 'handleChangeClick'
};

const resetButtonPreviewData = {
	onClick: 'handleResetClick'
};

const clearButtonPreviewData = {
	onClick: 'handleClearClick'
};

const changeData = {
	address: 'some new address',
	age: 55
};

const resetData = {
	address: 'initial',
	age: 10
};

export default class FormDemo extends Demo {
	static map = {
		inputs: [
			{
				name: {
					description: 'A name of the form. Changes won\'t have any effect (String)',
					readOnly: true
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
		initialData: resetData,
		caption: 'My test form',
		captionStyle: 'font-weight:bold;color:#aaa;'
	};
	static excluded = ['vertical', 'block', 'valign'];
	static handlers = ['onChange', 'onReset', 'onClear'];
	static additionalHandlers = ['onChangeClick', 'onResetClick', 'onClearClick'];
	static stateProps = ['data'];
	static funcs = {
		onChange: getSetState('data'),
		onChangeClick: (data) => {
			tabulation.set(2);
			const str = tabulation.render(wrap('change', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(', ' + stringify(changeData)) + wrap(');'));
			tabulation.reset();
			return str;
		},
		onResetClick: (data) => {
			return tabulation.renderWith(wrap('reset', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(');'), 2);
		},
		onClearClick: (data) => {
			return tabulation.renderWith(wrap('clear', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(');'), 2);
		}
	};
	static args = {
		onChange: ['data', 'fieldName', 'value'],
		onReset: ['data']
	};
	static changeState = {
		onChange: 'data'
	};
	static consts = ['initialData'];
	static componentName = 'Form';
	static component = Form;
	static imports = ['FormControlGroup', 'FormControl', 'Input', 'InputNumber', 'Button'];
	static additionalImport = ['change', 'reset', 'clear'];

	handleChangeClick = () => {
		change(this.state.data.name, changeData);
	}

	handleResetClick = () => {
		reset(this.state.data.name);
	}

	handleClearClick = () => {
		clear(this.state.data.name);
	}

	renderContent() {	
		return [
			<Button
				key="0"
				previewData={changeButtonPreviewData}
				onClick={this.handleChangeClick}
			>
				Change
			</Button>,
			<Button
				key="1"
				previewData={resetButtonPreviewData}
				onClick={this.handleResetClick}
			>
				Reset
			</Button>,
			<Button
				key="2"
				previewData={clearButtonPreviewData}
				onClick={this.handleClearClick}
			>
				Clear
			</Button>,
			<FormControlGroup key="3">
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