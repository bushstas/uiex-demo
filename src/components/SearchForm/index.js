import React from 'react';
import Demo from '../../Demo';
import {SearchForm} from 'uiex/SearchForm';
import {ICON_TYPE} from 'uiex/consts';
import FormMapper from '../FormMapper';
import {MEASURES} from '../../consts';

export default class SearchFormDemo extends Demo {
	static map = {
		checkboxes: {
			hiddenButton: {
				description: 'Button is only shown on focus',
				defaultValue: false
			}
		},
		inputs: [
			{
				buttonTitle: {
					description: 'Caption of submit button',
					example: 'Find',
					default: ''
				},
				focusedWidth: {
					type: 'number',
					description: 'Width of form on focus',
					example: '120',
					maxValue: 1000,
					measure: 'px',
					measures: MEASURES,
					positive: true
				},
				placeholder: {
					description: 'Placeholder of input',
					example: 'Search word',
					default: ''
				},
				icon: {
					description: 'Icon name of submit button',
					example: 'search',
					default: ''
				},
				iconType: {
					description: 'Icon type',
					options: ICON_TYPE
				}
			}
		]
	};
	static data = {
		width: 400,
		caption: 'Search form',
		buttonTitle: '',
		placeholder: 'Search word',
		icon: 'search',
		captionInside: false
	};
	static excluded = ['vertical'];
	static handlers = ['onChange', 'onSubmit', 'onFocus', 'onBlur', 'onDisabledClick'];
	static componentName = 'SearchForm';
	static component = SearchForm;

	renderMapperBefore() {
		return (
			<FormMapper 
				isOpen={true}
				data={this.state.data} 
				onChange={this.handleChangeData}			
			/>
		)
	}
}