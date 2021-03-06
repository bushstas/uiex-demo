import React from 'react';
import Demo from '../../Demo';
import {RateForm} from 'uiex/RateForm';
import {ICON_TYPE} from 'uiex/consts';
import FormMapper from '../FormMapper';
import {getSetState} from '../../utils';

const EXCLUDED_FORM = ['value'];

export default class RateFormDemo extends Demo {
	static map = {
		checkboxes: {
			resettable: {
				description: 'Button is only shown on focus',
				defaultValue: false
			}
		},
		inputs: [
			{
				value: {
					description: 'Current rate',
					type: 'number',
					example: '5',
					maxValue: 10,
					positive: true
				},
				normalColor:{
					type: 'color',
					description: 'Normal color of icons',
					uncontrolled: true
				},
				activeColor:{
					type: 'color',
					description: 'Color of active icons',
					uncontrolled: true
				},
				hoverColor:{
					type: 'color',
					description: 'Color of hover icons',
					uncontrolled: true
				},
				submit:{
					description: 'Color of hover icons',
					example: 'Rate'
				},
				reset:{
					description: 'Color of hover icons',
					example: 'Reset'
				}
			},
			{
				scale: {
					description: 'Value of input',
					type: 'number',
					positive: true,
					example: 'word',
					minValue: 3,
					maxValue: 10,
					
				},
				icon: {
					description: 'Icon name',
					example: 'search',
					
				},
				activeIcon: {
					description: 'Active icon name',
					example: 'search',
					
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
		caption: 'Rate form',
		captionInside: false,
		value: 2
	};
	static excluded = ['vertical'];
	static handlers = ['onChange', 'onSubmit', 'onReset', 'onDisabledClick'];
	static stateProps = ['value'];
	static funcs = {
		onChange: getSetState('value')
	};
	static args = {
		onChange: ['value'],
		onSubmit: ['value']
	};
	static changeState = {
		onChange: 'value'
	};
	static componentName = 'RateForm';
	static component = RateForm;

	renderMapperBefore() {
		return (
			<FormMapper 
				isOpen={true}
				data={this.state.data} 
				excluded={EXCLUDED_FORM}
				onChange={this.handleChangeData}
			/>
		)
	}
}