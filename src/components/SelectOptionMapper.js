import React from 'react';
import DemoMapper from '../DemoMapper';

export default class SelectOptionMapper extends DemoMapper {
	static map = {
		checkboxes: {
			selected: {
				description: 'Shows that an option is selected',
			},
			checked: {
				description: 'Shows that an option is checked'
			},
			single: {
				description: 'Shows that an option can\'t be checked with other options at the same time'
			},
			withTopDelimiter: {
				description: 'An option will have top delimiter line'	
			},
			withBottomDelimiter: {
				description: 'An option will have bottom delimiter line'	
			}
		},
		inputs: [
			{
				value:{
					description: 'An option value'
				}
			}
		]
	};
	static handlers = ['onSelect'];
	static args = {
		onSelect: ['value']
	}
	static excluded = ['checked', 'single'];
	static componentName = 'AutoCompleteOption';
}