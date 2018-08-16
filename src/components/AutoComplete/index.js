import React from 'react';
import Demo from '../../Demo';
import SelectOptionMapper from '../SelectOptionMapper';
import SelectMapper from '../SelectMapper';
import {AutoComplete} from 'uiex/AutoComplete';
import {Checkbox} from 'uiex/Checkbox';
import {stringify, getSetState, wrap} from '../../utils';
import {SELECT_OPTIONS_PROMISE_INSTANCE, PROMISE_OPTIONS, FUNCTION_OPTIONS, PROMISE_TEXT_HTML, FUNCTION_TEXT_HTML} from '../../consts';

const SELECT_EXCLUDED = ['multiple', 'empty'];
const SELECT_OPTION_EXCLUDED = ['single'];

export default class AutoCompleteDemo extends Demo {
	static map = {
		checkboxes: {
			dynamic: {
				description: 'The component will not filter given options by itself, you need to pass filtered options to it every time (suitable for ajax loading). In other words the component will always show all options you pass'
			},
			focused: {
				description: 'The component will become focused'
			},
			withoutIcon: {
				description: 'Icon will not be displayed'
			},
			passive: {
				description: 'Passive AutoComplete will show matched options only when you input text (not on focus). Dynamic component can\'t be passive. In other words an active (not passive) component works more like normal select'	
			}
		}
	};
	static data = {
		value: '',
		width: 300,
		options: SELECT_OPTIONS_PROMISE_INSTANCE,
		placeholder: 'Start to input something',
		pendingPlaceholder: 'Loading...'
	};	

	static excluded = ['height', 'align', 'valign', 'vertical', 'children'];
	static handlers = ['onChange', 'onInput', 'onSelect', 'onSelectOption', 'onPick', 'onEnter', 'onFocus', 'onBlur', 'onDisabledClick', 'onPromiseResolve', 'onPromiseReject'];
	static args = {
		onChange: ['value', 'name'],
		onInput: ['value', 'name'],
		onSelect: ['value', 'name'],
		onSelectOption: ['index', 'option', 'name'],
		onPick: ['value', 'name'],
		onEnter: ['value', 'name'],
		onFocus: ['value', 'name'],
		onBlur: ['value', 'name'],
		onPromiseResolve: ['options'],
		onPromiseReject: ['error']
	};
	static stateProps = ['value'];
	static funcs = {
		onChange: getSetState('value')
	};
	static consts = ['options'];
	static componentName = 'AutoComplete';
	static component = AutoComplete;

	static changeState = {
		onChange: 'value'
	};
	static callbacks = {
		onSelectOption: 'handleOptionSelect'
	}

	static customState = {
		transform: false,
		optionData: {}
	};

	static additionalImport = ['AutoCompleteOption'];

	renderMapperBefore() {
		return (
			<SelectMapper
				isOpen={true}
				data={this.state.data}
				onChange={this.handleChangeData}
				excluded={SELECT_EXCLUDED}
			/>
		)
	}

	renderAdditionalMappers() {
		return (
			<SelectOptionMapper
				ref="optionMapper"
				componentName="AutoCompleteOption"
				isOpen={true}
				excluded={SELECT_OPTION_EXCLUDED}
				data={this.getOptionData()}
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
				content += TAB + wrap('&lt;') + wrap('AutoCompleteOption', 'keyword2') + N;
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
				content += TAB + wrap('&lt;') + wrap('AutoCompleteOption ', 'keyword2') + wrap('value', 'key') + wrap('=') + stringify(option.value, true) + wrap('&gt;') + N;
			}
			content += TAB2 + option.title + N;
			content += TAB + wrap('&lt;/') + wrap('AutoCompleteOption', 'keyword2') + wrap('&gt;') + (i < options.length - 1 ? N : '');
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
				return PROMISE_TEXT_HTML;
			} else if (typeof value == 'function') {
				return FUNCTION_TEXT_HTML;
			}
		}
	}
}