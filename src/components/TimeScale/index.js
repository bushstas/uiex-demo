import React from 'react';
import Demo from '../../Demo';
import {TimeScale} from 'uiex/TimeScale';
import {getSetState} from '../../utils';

export default class TimeScaleDemo extends Demo {
	static map = {
		checkboxes: {
			playing: {
				description: 'Timescale is running',
			}
		},
		inputs: [
			{
				value: {
					description: 'Current timescale value in seconds (Number | Numeric String)',
					example: 10,
					maxValue: 5000,
					positive: true,
					decimal: true,
					toFixed: 2,
					type: 'number'
				},
				time: {
					description: 'Current timescale value in format 05:56 or 5:56. Will be overrided  by value (String)',
					example: '02:45'
				},
				startValue: {
					description: 'Start timescale value. Can be number in seconds or string in format 00:00. Zero by default (Number | Numeric String)',
					example: 0,
					maxValue: 4000,
					positive: true,
					type: 'number'
				},
				endValue: {
					description: 'End timescale value. Can be number in seconds or string in format 00:00. Is required (Number | String)',
					example: 100,
					maxValue: 5000,
					positive: true,
					type: 'number'
				},
				borderRadius: {
					description: 'The track border radius (Number | Numeric String)',
					example: 5,
					maxValue: 100,
					positive: true,
					type: 'number'
				},
				clickAreaHeight: {
					description: 'Height of an invisible area for clicking the track when it\'s too narrow. Located vertically in center (Number | Numeric String)',
					example: 40,
					maxValue: 500,
					positive: true,
					type: 'number'
				},
				trackColor: {
					description: 'Color of the track (String)',
					type: 'color'
				},
				indicatorColor: {
					description: 'Color of the indicator (String)',
					type: 'color'
				}
			}
		]
	};
	static data = {
		playing: true,
		width: 900,
		height: 20,
		borderRadius: 15,
		startValue: 0,
		endValue: 60
	};
	static excluded = ['vertical', 'valign'];
	static handlers = ['onChange', 'onClickChange', 'onChangeStatus', 'onEnd', 'onDisabledClick'];
	static stateProps = ['value', 'playing'];
	static funcs = {
		onChange: getSetState('value'),
		onChangeStatus: getSetState('playing')
	};
	static args = {
		onChange: ['value', 'time'],
		onClickChange: ['value', 'time'],
		onChangeStatus: ['playing']
	};
	static componentName = 'TimeScale';
	static component = TimeScale;
	static changeState = {
		onChange: (value, time) => {
			return {value, time}
		},
		onChangeStatus: 'playing'
	}
	static componentMapperProps = {
		maxHeight: 200
	};
}