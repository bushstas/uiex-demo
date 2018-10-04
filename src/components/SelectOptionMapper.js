import React from 'react';
import DemoMapper from '../DemoMapper';
import {ICON_TYPE} from 'uiex/consts';

export default class SelectOptionMapper extends DemoMapper {
	static map = {
		checkboxes: {
			single: {
				description: 'Shows that an option can\'t be checked with other options at the same time. Works only for multiple selects',
				readOnly: true
			},
			withTopDelimiter: {
				description: 'An option will have top delimiter line',
				readOnly: true
			},
			withBottomDelimiter: {
				description: 'An option will have bottom delimiter line',
				readOnly: true
			}
		},
		inputs: [
			{
				value: {
					description: 'An option value',
					readOnly: true					
				},
				icon: {
					description: 'An option icon',
					readOnly: true					
				},
				iconType: {
					description: 'An option icon type',
					options: ICON_TYPE,
					readOnly: true
				}
			}
		]
	};
	static handlers = ['onSelect'];
	static args = {
		onSelect: ['value']
	}
	static componentName = 'SelectOption';

	fireSelect() {
		this.fire('onSelect');
	}
}