import React from 'react';
import Demo from '../../Demo';
import {Select} from 'uiex/Select';
import SelectMapper from '../SelectMapper';
import {SELECT_OPTIONS_ARRAY} from 'uiex/consts';

import './style.scss';

export default class SelectDemo extends Demo {
	static excluded = ['height', 'vertical', 'align', 'valign', 'children'];
	static handlers = ['onChange', 'onFocus', 'onBlur', 'onDisabledClick'];
	static args = {
		onChange: ['value', 'name'],
		onFocus: ['value', 'name'],
		onBlur: ['value', 'name'],
		onDisabledClick: ['name']
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
}