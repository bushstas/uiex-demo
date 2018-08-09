import React from 'react';
import Demo from '../../Demo';
import {AutoComplete} from 'uiex/AutoComplete';

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
		},
		inputs: [
			{
				value: {
					description: 'Value',
				},
				placeholder: {
					description: 'Input placeholder',
					stretched: true
				}
			}
		]
	};
	static data = {
		value: 'blue',
		width: 300,
		options: [{title: 'Red', value: 'red'}, {title: 'Green', value: 'green'}, {title: 'Blue', value: 'blue'}, {title: 'Big', value: 'big'}, {title: 'Black', value: 'black'}],
		placeholder: 'Start to input something'
	};	

	static excluded = ['height', 'align', 'valign', 'vertical', 'children'];
	static handlers = ['onChange', 'onInput', 'onSelect', 'onPick', 'onEnter', 'onFocus', 'onBlur', 'onDisabledClick'];
	static args = {
		onChange: ['value', 'name'],
		onInput: ['value', 'name'],
		onSelect: ['value', 'name'],
		onPick: ['value', 'name'],
		onEnter: ['value', 'name'],
		onFocus: ['value', 'name'],
		onBlur: ['value', 'name']
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
}