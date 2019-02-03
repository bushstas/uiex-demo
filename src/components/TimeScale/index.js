import React from 'react';
import Demo from '../../Demo';
import {TimeScale} from 'uiex/TimeScale';
import {DISPLAY_TIME} from 'uiex/consts';
import {getSetState} from '../../utils';

const TIME_STYLE_OPTIONS = [
	{
		color: '#ffffff',
		fontWeight: 'bold'
	},
	{
		backgroundColor: '#ffffff',
		padding: '2px 4px',
		borderRadius: '5px',
		marginTop: '-8px'
	}
]

export default class TimeScaleDemo extends Demo {
	static map = {
		checkboxes: {
			playing: {
				description: 'Timescale is running'
			},
			hiddenTime: {
				description: 'Time will be shown only on mouse over'
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
					maxLength: 4
				},
				endValue: {
					description: 'End timescale value. Can be number in seconds or string in format 00:00. Is required (Number | String)',
					example: 100,
					maxLength: 4
				},
				displayTime: {
					description: 'End timescale value. Can be number in seconds or string in format 00:00. Is required (Number | String)',
					type: 'select',
					options: DISPLAY_TIME
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
					type: 'color',
					uncontrolled: true
				},
				indicatorColor: {
					description: 'Color of the indicator (String)',
					type: 'color',
					uncontrolled: true
				},
				timeStyle: {
					description: 'Style of the indicator (Object)',
					type: 'object',
					options: TIME_STYLE_OPTIONS
				}
			}
		]
	};
	static data = {
		playing: true,
		width: 900,
		height: 20,
		borderRadius: 15,
		startValue: '00:10',
		endValue: '01:00'
	};
	static excluded = ['vertical', 'valign'];
	static handlers = ['onChange', 'onClickChange', 'onChangeStatus', 'onEnd', 'onDisabledClick'];
	static stateProps = ['value', 'time', 'playing'];
	static funcs = {
		onChange: getSetState(['value', 'time']),
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
	static consts = ['timeStyle'];
}