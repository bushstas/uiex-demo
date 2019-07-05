import React from 'react';
import Demo from '../../Demo';
import {Form, change, reset, clear, fixate, alter, set, replace} from 'uiex/Form';
import {FormControl} from 'uiex/FormControl';
import {FormControlGroup} from 'uiex/FormControlGroup';
import {FormSection} from 'uiex/FormSection';
import {Input} from 'uiex/Input';
import {Button} from 'uiex/Button';
import {ButtonGroup} from 'uiex/ButtonGroup';
import {InputNumber} from 'uiex/InputNumber';
import {Checkbox} from 'uiex/Checkbox';
import {FormButtons} from 'uiex/FormButtons';
import {JsonPreview} from 'uiex/JsonPreview';
import {DataProvider, createStore, resetChangeStore, setStore, saveStore, loadStore} from 'uiex/DataProvider';
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

const ITEM_STYLE_OPTIONS = [
	{
		padding: '10px',
		backgroundColor: '#f1f1f1'
	},
	'background-color: #ddd; padding: 20px'
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

const fixateButtonPreviewData  = {
	onClick: 'handleFixateClick'
};

const alterButtonPreviewData  = {
	onClick: 'handleAlterClick'
};

const setButtonPreviewData = {
	onClick: 'handleSetClick'
};

const replaceButtonPreviewData = {
	onClick: 'handleReplaceClick'
};

const changeData = {
	name: 'John',
	age: 55,
	address: {
		city: 'Berlin',
		education: {
			city: 'New York'
		}
	}
};

const alterData = {
	address: {
		country: 'Russia'
	}
};

const resetData = {
	name: 'Ann',
	age: 10,
};

const setData = {
	name: 'Andrew',
	age: 34,
	address: {
		country: 'Great Britain',
		city: 'Manchester',
		index: '010203'
	}
};

const replaceData = {
	address: {
		education: [{
			city: 'Amsterdam',
			place: 'School'
		}]
	}
};

class FormDataPreview extends React.PureComponent {
	render() {
		const {forms} = this.props;
		return (
			<JsonPreview data={forms.testform} />
		);
	}
}


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
					options: [{name: 'Victor', age: 16, address: {country: 'USA', city: 'Denver'}}]
				},
				caption: {
					description: 'Form caption (String | React.Node)',
					stretched: true
				},
				captionStyle: {
					description: 'Style of the form caption (Object | String)',
					type: 'object',
					options: CAPTION_STYLE_OPTIONS
				},
				sectionCaptionStyle: {
					description: 'Style of the form section caption (Object | String)',
					type: 'object',
					options: CAPTION_STYLE_OPTIONS
				},
				sectionItemStyle: {
					description: 'Style of the section array field item (Object | String)',
					type: 'object',
					options: ITEM_STYLE_OPTIONS
				}
			}
		]
	};
	static data = {
		name: "testform",
		width: 600,
		columns: 1,
		cellSize: 1,
		data: resetData,
		initialData: resetData,
		caption: 'My test form',
		captionStyle: 'font-weight:bold;color:#aaa;'
	};
	static excluded = ['vertical', 'block', 'valign'];
	static handlers = ['onChange', 'onReset', 'onClear', 'onDataChange'];
	static additionalHandlers = ['onChangeClick', 'onAlterClick', 'onResetClick', 'onClearClick', 'onFixateClick', 'onSetClick', 'onReplaceClick'];
	static stateProps = ['data', 'isDataChanged'];
	static funcs = {
		onChange: getSetState('data'),
		onReset: () => {
			return tabulation.renderWith(wrap('// optional, no need to setState here', 'comment'), 2);
		},
		onClear: () => {
			return tabulation.renderWith(wrap('// optional, no need to setState here', 'comment'), 2);
		},
		onChangeClick: (data) => {
			tabulation.set(2);
			const str = tabulation.render(wrap('change', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(', ' + stringify(changeData)) + wrap(');'));
			tabulation.reset();
			return str;
		},
		onAlterClick: (data) => {
			tabulation.set(2);
			const str = tabulation.render(wrap('alter', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(', ' + stringify(alterData)) + wrap(');'));
			tabulation.reset();
			return str;
		},
		onResetClick: (data) => {
			return tabulation.renderWith(wrap('reset', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(');'), 2);
		},
		onClearClick: (data) => {
			return tabulation.renderWith(wrap('clear', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(');'), 2);
		},
		onFixateClick: (data) => {
			return tabulation.renderWith(wrap('fixate', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(');'), 2);
		},
		onSetClick: (data) => {
			tabulation.set(2);
			const str = tabulation.render(wrap('set', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(', ' + stringify(setData)) + wrap(');'));
			tabulation.reset();
			return str;
		},
		onReplaceClick: (data) => {
			tabulation.set(2);
			const str = tabulation.render(wrap('replace', 'function') + wrap('(') + wrapString(data.name, 1) + wrap(', ' + stringify(replaceData)) + wrap(');'));
			tabulation.reset();
			return str;
		},
		onDataChange: () => {
			const code = tabulation.renderWith(getSetState('isDataChanged'), 2);
			return tabulation.renderWith(wrap('// indicates that data was altered compared with initial data\n', 'comment'), 2) + code;
		}
	};
	static args = {
		onChange: ['data', 'fieldName', 'value'],
		onReset: ['data'],
		onDataChange: ['isDataChanged', 'changedFields']
	};
	static changeState = {
		onChange: 'data',
		onChangeData: 'isDataChanged'
	};
	static consts = ['data', 'initialData', 'captionStyle', 'sectionCaptionStyle'];
	static componentName = 'Form';
	static component = Form;
	static imports = ['FormControlGroup', 'FormControl', 'Input', 'InputNumber', 'Button', 'ButtonGroup'];
	static additionalImport = ['change', 'alter', 'reset', 'clear', 'fixate', 'set', 'replace'];
	static withFragment = true

	constructor(props) {
		super(props);
		createStore('lalala', {'new': 222, 'thing': true});

		setTimeout(() => {
			setStore('lalala', {aaa: 3, bbb: 34, fff: 4});
			saveStore('lalala', 'fuck');

			setTimeout(() => {
				resetChangeStore('lalala', {new: '1', appeared: '!!!!'});
				setTimeout(() => {
					loadStore('lalala', 'fuck');
				}, 5000);

			}, 5000);
		}, 12000);
	}

	handleChangeClick = () => {
		change(this.state.data.name, changeData);
	}

	handleAlterClick = () => {
		alter(this.state.data.name, alterData);
	}

	handleResetClick = () => {
		reset(this.state.data.name);
	}

	handleClearClick = () => {
		clear(this.state.data.name);
	}

	handleFixateClick = () => {
		fixate(this.state.data.name);
	}

	handleSetClick = () => {
		set(this.state.data.name, setData);	
	}

	handleReplaceClick = () => {
		replace(this.state.data.name, replaceData);		
	}

	renderContentBefore() {
		return (
			<ButtonGroup buttonWidth="80">
				<Button
					title="Changes form data with a given object. This action will cause dataChange event"
					previewData={changeButtonPreviewData}
					onClick={this.handleChangeClick}
				>
					Change
				</Button>
				<Button
					title="Changes form data with a given object. This action will not cause dataChange event. The initial data will be changed also"
					previewData={alterButtonPreviewData}
					onClick={this.handleAlterClick}
				>
					Alter
				</Button>
				<Button
					title="Resets form data to initial data"
					previewData={resetButtonPreviewData}
					onClick={this.handleResetClick}
				>
					Reset
				</Button>
				<Button
					title="Clears all fields"
					previewData={clearButtonPreviewData}
					onClick={this.handleClearClick}
				>
					Clear
				</Button>
				<Button
					title="Fixate current form data as initial data. isDataChanged flag will get false"
					previewData={fixateButtonPreviewData}
					onClick={this.handleFixateClick}
				>
					Fixate
				</Button>
				<Button
					title="Set new form data. This action will cause dataChange event"
					previewData={setButtonPreviewData}
					onClick={this.handleSetClick}
				>
					Set
				</Button>
				<Button
					title="Set new form data. The initial data will be reset also. isDataChanged flag will get false"
					previewData={replaceButtonPreviewData}
					onClick={this.handleReplaceClick}
				>
					Replace
				</Button>
			</ButtonGroup>
		);
	}

	renderContentAfter() {
		return (
			<DataProvider
				formName={['testform', 'mapper']}
				storeName="lalala"
				component={FormDataPreview}
			>
				FormDataPreview
			</DataProvider>
		);
	}

	renderContent() {	
		return [
			<FormControlGroup key="1">
				<FormControl caption="Name">
					<Input name="name" />
				</FormControl>
				<FormControl caption="Age">
					<InputNumber
						name="age"
						maxValue="120"
						positive
					/>
				</FormControl>
				<FormControl caption="Gender">
					<Input name="gender" />
				</FormControl>
			</FormControlGroup>,
			
			<FormSection
				key="2"
				name="address"
				caption="Address"
			>
				<FormControlGroup columns="2">
					<FormControl caption="Country">
						<Input name="country" />
					</FormControl>
					<FormControl caption="City">
						<Input name="city" />
					</FormControl>
					<FormControl caption="Index" stretched>
						<Input name="index" />
					</FormControl>
				</FormControlGroup>
				
				<FormSection
					name="education"
					caption="Education"
					minCount="3"
					fieldArray
				>
					<FormControlGroup columns="3">
						<FormControl caption="City">
							<Input name="city" />
						</FormControl>
						<FormControl caption="Place">
							<Input name="place" />
						</FormControl>
					</FormControlGroup>
				</FormSection>
			</FormSection>,
			<FormButtons
				key="fb"
			>
				<Button role="submit">
					Submit
				</Button>
				<Button role="reset">
					Reset
				</Button>
				<Button role="clear">
					Clear
				</Button>
				<Button role="view">
					View
				</Button>
				<Button onClick="...">
					Custom action
				</Button>
			</FormButtons>
		];
	}

	getPreviewWrap = () => {
        return 'Fragment';
    }

	renderPreviewCodeBefore = () => {
		return previewRenderer.render(this.renderContentBefore(), ['title']);
	}

	renderPreviewContent = () => {
		return previewRenderer.render(this.renderContent());
	}
}