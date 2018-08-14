import React from 'react';
import Demo from '../../Demo';
import SelectOptionMapper from '../SelectOptionMapper';
import SelectMapper from '../SelectMapper';
import {AutoComplete} from 'uiex/AutoComplete';
import {SELECT_OPTIONS_PROMISE_INSTANCE} from '../../consts';

const SELECT_EXCLUDED = ['multiple', 'empty'];

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
		onChange: 'this.setState({value});'
	};
	static consts = ['options'];
	static componentName = 'AutoComplete';
	static component = AutoComplete;

	static changeState = {
		onChange: 'value'
	};

	static customState = {
		optionsData: [],
		currentOption: 0
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
				isOpen={true}
				data={this.getOptionData()}
				onChange={this.handleChangeOptionData}
			/>
		)
	}

	getOptionData() {
		const {optionsData, currentOption} = this.state;
		return optionsData[currentOption] || {};
	}

	handleChangeOptionData = (data) => {
		const {optionsData} = this.state;
		optionsData[this.state.currentOption] = data; 
		this.setState({optionsData: {...optionsData}});
	}
}