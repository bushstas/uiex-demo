import React from 'react';
import Demo from '../../Demo';
import {InputColor} from 'uiex/InputColor';
import InputMapper from '../InputMapper';
import {COLOR_NAMES} from 'uiex/InputColor/colors';
import {getSetState, insertItems} from '../../utils';
import {INPUT_COMPONENT_EXCLUDED, COLORS, COLORS2} from '../../consts';
import {INPUT_HANDLERS, INPUT_ARGS, INPUT_FUNCS, INPUT_CHANGE_STATE, INPUT_STATE_PROPS} from '../Input';

const EXCLUDED = ['type', 'pattern', 'textarea', 'withIndicator', 'minLength', 'maxLength'];

const initialValues = Object.keys(COLOR_NAMES);

export default class InputColorDemo extends Demo {
	static map = {
		checkboxes: {
			pickerShown: {
				description: 'Color picker will be shown'
			},
			withoutHash: {
				description: 'The input returns value without hash on change'
			},
			withoutPicker: {
				description: 'Color picker will not be shown on input focus'
			},
			fullWidthPicker: {
				description: 'Color picker will have the same width as the input'
			},
			pickerOnTop: {
				description: 'Color picker will be on top'
			}
		},
		inputs: [
			{
				initialValue: {
					description: 'Initial value keyword (String)',
					options: initialValues
				},
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
		presetColors: COLORS
	};
	static excluded = INPUT_COMPONENT_EXCLUDED;
	static handlers = insertItems(INPUT_HANDLERS, ['onShowPicker', 'onChangePicker', 'onInput'], 2);
	static args = {
		...INPUT_ARGS,
		onChangePicker: ['value', 'colorData', 'name'],
		onShowPicker: ['pickerShown', 'name'],
		onInput: ['value', 'name']
	};
	static stateProps = [...INPUT_STATE_PROPS, 'pickerShown'];
	static funcs = {
		...INPUT_FUNCS,
		onShowPicker: getSetState('pickerShown')
	};
	static previewProps = {
		unclosable: true
	};
	static consts = ['measures', 'presetColors'];
	static componentName = 'InputColor';
	static component = InputColor;
	static changeState = {
		...INPUT_CHANGE_STATE,
		onShowPicker: 'pickerShown'
	};

	renderMapperBefore() {
		return (
			<InputMapper 
				isOpen={true}
				excluded={EXCLUDED}
				data={this.state.data} 
				onChange={this.handleChangeData}				
				defaultType="color"
				defaultWithoutPicker={true}
				nameExample="color"
				valueExample="A1A1A1"
				defaultValueExample="FFF"
				valueDescription="Input value for example FFFFFF (String)"
				valueReadOnly
			/>
		)
	}
}