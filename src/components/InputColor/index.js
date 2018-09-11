import React from 'react';
import Demo from '../../Demo';
import {InputColor} from 'uiex/InputColor';
import InputMapper from '../InputMapper';
import {getSetState} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED, COLORS, COLORS2} from '../../consts';

const EXCLUDED = ['type', 'pattern', 'textarea', 'withIndicator', 'minLength', 'maxLength'];

export default class InputColorDemo extends Demo {
	static map = {
		checkboxes: {
			withoutHash: {
				description: 'The input returns value without hash on change'
			},
			withoutPicker: {
				description: 'Color picker will not be shown on input focus'
			},
			fullWidthPicker: {
				description: 'Color picker will have the same width as the input'
			},
			pickerShown: {
				description: 'Color picker will be always shown'
			}
		},
		inputs: [
			{
				presetColors: {
					description: 'Color picker preset colors list (Array)',
					type: 'object',
					options: [COLORS, COLORS2]
				}
			}
		]
	};
	static data = {
		width: 250,
		placeholder: 'Input a value',
		colors: COLORS
	};
	static excluded = INPUT_COMPONENT_EXCLUDED;
	static handlers = ['onChange', 'onClear', 'onChangePicker', 'onInput', 'onFocus', 'onBlur', 'onEnter', 'onChangeValidity', 'onDisabledClick'];
	static args = {
		onChange: ['value', 'name'],
		onChangePicker: ['value', 'colorData', 'name'],
		onInput: ['value', 'name'],
		onFocus: ['value', 'name'],
		onBlur: ['value', 'name'],
		onEnter: ['value', 'name'],
		onChangeValidity: ['isValid', 'value', 'name'],
		onDisabledClick: ['name']
	};
	static stateProps = ['value', 'measure'];
	static funcs = {
		onChange: getSetState('value')
	};
	static previewProps = {
		unclosable: true
	};
	static consts = ['measures'];
	static componentName = 'InputColor';
	static component = InputColor;
	static changeState = {
		onChange: 'value'
	};

	renderMapperBefore() {
		return (
			<InputMapper 
				isOpen={true}
				excluded={EXCLUDED}
				data={this.state.data} 
				onChange={this.handleChangeData}
				type="color"
				withoutPicker={true}
				defaultType="color"
				defaultWithoutPicker={true}
				nameExample="color"
				valueExample="A1A1A1"
				defaultValueExample="FFF"
			/>
		)
	}
}