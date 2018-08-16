import React from 'react';
import Demo from '../../Demo';
import {Select} from 'uiex/Select';
import SelectOptionMapper from '../SelectOptionMapper';
import SelectMapper from '../SelectMapper';
import {Checkbox} from 'uiex/Checkbox';
import {stringify, getSetState, wrap} from '../../utils';
import {SELECT_OPTIONS_ARRAY, PROMISE_OPTIONS, FUNCTION_OPTIONS, PROMISE_TEXT, FUNCTION_TEXT} from '../../consts';

export default class SelectDemo extends Demo {
	static excluded = ['height', 'vertical', 'align', 'valign', 'children'];
	static handlers = ['onChange', 'onSelect', 'onSelectOption', 'onFocus', 'onBlur', 'onDisabledClick', 'onPromiseResolve', 'onPromiseReject'];
	static args = {
		onChange: ['value', 'name'],
		onSelect: ['value', 'name'],
		onSelectOption: ['index', 'option', 'name'],
		onFocus: ['value', 'name'],
		onBlur: ['value', 'name'],
		onDisabledClick: ['name'],
		onPromiseResolve: ['options'],
		onPromiseReject: ['error']
	};
	static stateProps = ['value'];
	static funcs = {
		onChange: getSetState('value')
	};
	static data = {
		width: 300,
		placeholder: 'Choose an option',
		options: SELECT_OPTIONS_ARRAY
	};
	static componentName = 'Select';
	static component = Select;
	static changeState = {
		onChange: 'value'
	};
	static additionalImport = ['SelectOption'];
	static consts = ['options'];
	static callbacks = {
		onSelectOption: 'handleOptionSelect'
	}
	static customState = {
		transform: false,
		optionData: {}
	}

	renderMapper() {
		return (
			<SelectMapper 
				ref="mapper"
				isOpen={true}
				data={this.state.data}
				handlers={this.constructor.handlers}
				args={this.constructor.args}
				onChange={this.handleChangeData}
			/>
		)
	}

	renderAdditionalMappers() {
		return (
			<SelectOptionMapper
				ref="optionMapper"
				isOpen={true}
				data={this.getOptionData()}
				onChange={this.handleChangeOptionData}
			/>
		)
	}

	getOptionData() {
		return this.state.optionData;
	}

	handleOptionSelect = (index, option) => {
		this.setState({optionData: option});
		this.refs.optionMapper.fireSelect();
	}

	renderPreviewNote = () => {
		return (
			<Checkbox checked={this.state.transform} onChange={this.handleCheckboxChange}>
				Transform options into children
			</Checkbox>
		) 
	}

	handleCheckboxChange = (transform) => {
		this.setState({transform});
	}

	renderPreviewContent = () => {
		if (!this.state.transform) {
			return '';
		}
		let {data: {options}} = this.state;
		if (options instanceof Promise) {
			options = PROMISE_OPTIONS;
		} else if (typeof options == 'function') {
			options = FUNCTION_OPTIONS;
		} 
		if (!(options instanceof Array)) {
			const properOptions = [];
			for (let k in options) {
				properOptions.push({value: k, title: options[k]});
			}
			options = properOptions;
		}
		const T = "\t";
		const TAB = T + T + T + T;
		const TAB2 = TAB + T;
		const N = "\n";		
		let content = '';
		for (let i = 0; i < options.length; i++) {
			let option = options[i];
			if (typeof option == 'string') {
				option = {value: option, title: option};
			}
			const keys = Object.keys(option);
			if (keys.length - 1 > 1) {
				content += TAB + wrap('&lt;') + wrap('SelectOption', 'keyword2') + N;
				for (let k in option) {
					if (k == 'title') {
						continue;
					}
					if (option[k] === true) {
						content += TAB2 + wrap(k, 'key') + N;
					} else {
						content += TAB2 + wrap(k, 'key') + wrap('=') + stringify(option[k], true) + N;
					}
				}
				content += TAB + wrap('&gt;') + N;
			} else {
				content += TAB + wrap('&lt;') + wrap('SelectOption ', 'keyword2') + wrap('value', 'key') + wrap('=') + stringify(option.value, true) + wrap('&gt;') + N;
			}
			content += TAB2 + option.title + N;
			content += TAB + wrap('&lt;/') + wrap('SelectOption', 'keyword2') + wrap('&gt;') + (i < options.length - 1 ? N : '');
		}
		return content;
	}

	isPropAvailable = (name) => {
		if (name == 'options' && this.state.transform) {
			return false;
		}
		return true;
	}
	
	renderPreviewConst = (name, value) => {
		if (name == 'options') {
			if (value instanceof Promise) {
				return PROMISE_TEXT;
			} else if (typeof value == 'function') {
				return FUNCTION_TEXT;
			}
		}
	}
}