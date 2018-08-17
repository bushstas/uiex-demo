import React from 'react';
import DemoMapper from '../DemoMapper';
import {VALIGN, ALIGN, FLOAT} from 'uiex/consts';
import {MEASURES} from '../utils';

const filterTagName = (value) => {
	if ((/^[a-z]+\d{0,1}$/i).test(value)) {
		return value;
	}
	return value.replace(/[^a-z]/gi, '');
};

export default class ComponentMapper extends DemoMapper {
	static map = {
		checkboxes: {
			block: {
				description: 'Display block',
				defaultValue: false
			},
			disabled: {
				description: 'Disabled',
				defaultValue: false
			},
			hidden: {
				description: 'hidden',
				defaultValue: false
			},
			vertical: {
				description: 'vertical',
				defaultValue: false
			}
		},
		inputs: [
			{
				width: {
					type: 'number',
					description: 'Width style attribute (Number | String)',
					example: '120',
					maxValue: 1000,
					measure: 'px',
					measures: MEASURES,
					positive: true
				},
				height: {
					type: 'number',
					description: 'Height style attribute (Number | String)',
					example: '50',
					maxValue: 200,
					measure: 'px',
					positive: true
				},
				float: {
					description: 'Float style attribute (String)',
					options: FLOAT,
					empty: 'Chose an option'
				},
				align: {
					description: 'Align style attribute (String)',
					options: ALIGN,
					empty: 'Chose an option'
				},
				valign: {
					description: 'Vertical align style attribute (String)',
					options: VALIGN,
					empty: 'Chose an option'
				},
				tagName: {
					description: 'Component main element tag name (String)',
					customFilter: filterTagName,
					maxLength: 15
				},
				className: {
					description: 'Custom ClassName attribute (String)',
					stretched: true
				},
				children: {
					description: 'Content (ReactElement | Array | String)',
					stretched: true
				}
			}
		]
	}
	static componentName = 'UIEXComponent';

	initMap() {
		const map = super.initMap();
		const {maxWidth, maxHeight} = this.props;
		if (maxWidth) {
			map.inputs[0].width.maxValue = maxWidth;
		}
		if (maxHeight) {
			map.inputs[0].height.maxValue = maxHeight;
		}
        return map;
	}
}