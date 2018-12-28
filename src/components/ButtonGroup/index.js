import React from 'react';
import Demo from '../../Demo';
import {Button} from 'uiex/Button';
import {ButtonGroup} from 'uiex/ButtonGroup';
import ButtonGroupMapper from '../ButtonGroupMapper';

import './style.scss';

const BUTTONS_DATA = {
	save: {
		value: 'save',
		icon: 'save',
		children: 'Save'
	},
	remove: {
		value: 'remove',
		icon: 'delete_forever',
		children: 'Remove'
	},
	cancel: {
		value: 'cancel',
		icon: 'cancel',
		children: 'Cancel'
	}
}

export default class ButtonGroupDemo extends Demo {
	static handlers = ['onClick', 'onDisabledClick'];
	static componentName = 'ButtonGroup';
	static component = ButtonGroup;
	static data = {
		iconSize: 18
	};
	static args = {
		onClick: ['buttonValue'],
		onDisabledClick: ['buttonValue']
	};
	
	renderMapper() {
		return (
			<ButtonGroupMapper
				data={this.state.data}
				onChange={this.handleChangeData}
			/>
		)
	}

	renderContent() {
		return Object.keys(BUTTONS_DATA).map(key => {
			return (
				<Button
					key={key}
					onClick={this.getHandler('onClick')}
					onDisabledClick={this.getHandler('onDisabledClick')}
					{...BUTTONS_DATA[key]}
				/>
			)
		})
	}
}