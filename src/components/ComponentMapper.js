import React from 'react';
import DemoMapper from '../DemoMapper';
import {VALIGN, ALIGN, FLOAT} from 'uiex/consts';
import {MEASURES, MAX_WIDTH, MAX_HEIGHT} from '../consts';

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
					maxValue: MAX_WIDTH,
					measure: 'px',
					measures: MEASURES,
					positive: true,
					onChangeMeasure: 'handleChangeWidthMeasure'
				},
				height: {
					type: 'number',
					description: 'Height style attribute (Number | String)',
					example: '50',
					maxValue: MAX_HEIGHT,
					measure: 'px',
					measures: MEASURES,
					positive: true,
					onChangeMeasure: 'handleChangeHeightMeasure'
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

	handleChangeWidthMeasure = (measure) => {
		const {map} = this.state;
		const {inputs} = map;
		const {width} = inputs[0];
		width.measure = measure;
		if (measure == 'px') {
			width.maxValue = this.props.maxWidth || MAX_WIDTH;
		} else {
			width.maxValue = 100;
		}
		const state = {map: {...map}};
		this.setState(state);
	}

	handleChangeHeightMeasure = (measure) => {
		const {map} = this.state;
		const {inputs} = map;
		const {height} = inputs[0];
		height.measure = measure;
		if (measure == 'px') {
			height.maxValue = this.props.maxHeight || MAX_HEIGHT;
		} else {
			height.maxValue = 100;
		}
		const state = {map: {...map}};
		this.setState(state);
	}
}