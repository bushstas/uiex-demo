import React from 'react';
import DemoMapper from '../DemoMapper';
import {BUTTONS_VIEW, COLORS, ICON_TYPE} from 'uiex/consts';
import {MEASURES} from '../consts';

const viewOptions = [];
var icons = ['dashboard', 'delete', 'room', 'verified_user'];
let i = 0;
for (let item of BUTTONS_VIEW) {
	viewOptions.push({
		title: item,
		value: item,
		icon: icons[i]
	});
	i++;
}

export default class ButtonGroupMapper extends DemoMapper {
	static map = {
		checkboxes: {
			gradient: {
				description: 'Using gradient',
				defaultValue: false
			},
			iconAtRight: {
				description: 'Icon is located at right',
				defaultValue: false
			}
		},
		inputs: [
			{
				buttonWidth: {
					type: 'number',
					description: 'Width of buttons',
					example: '120',
					maxValue: 1000,
					measure: 'px',
					measures: MEASURES,
					positive: true
				},
				buttonHeight: {
					type: 'number',
					description: 'Height of buttons',
					example: '50',
					maxValue: 200,
					measure: 'px',
					positive: true
				},
				iconSize: {
					type: 'number',
					description: 'Height of buttons',
					example: '20',
					maxValue: 80,
					positive: true
				},
				gradient: {
					type: 'boolean',
					description: 'Gradient'
				}
			},
			{
				view: {
					description: 'Width of buttons',
					options: viewOptions
				},
				buttonColorPreset: {
					description: 'Color preset of buttons',
					options: COLORS
				},
				iconType: {
					description: 'Icon type',
					options: ICON_TYPE
				}
			}
		]
	};
	static componentName = 'ButtonGroup';
	static formName = 'buttonGroupMapper';

	handleChangeMeasure(id, idx, name) {
		const map = super.handleChangeMeasure(id, idx, name);
		this.setState({map, buttonWidthMeasure: id});
	}
}