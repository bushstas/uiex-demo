import React from 'react';
import Demo from '../../Demo';
import {Select} from 'uiex/Select';
import SelectMapper from '../SelectMapper';
import {SELECT_OPTIONS_ARRAY} from '../../consts';

import './style.scss'; 

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
		onChange: 'this.setState({value});'
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

	handleOptionSelect = (index, option) => {
		
	}
}