import React from 'react';
import Demo from '../../Demo';
import {BoxSection} from 'uiex/BoxSection';
import AnimatedMapper from '../AnimatedMapper'; 
import {getSetState, previewRenderer} from '../../utils';
import {BOX_CONTENT} from '../../consts';
import {BOX_SECTION_VIEWS} from 'uiex/consts';

export default class BoxSectionDemo extends Demo {
	static map = {
		checkboxes: {
			isOpen: {
				description: 'Open/Close status flag'
			},
			noHideAnimation: {
				description: 'Animation is not used for hiding box'
			},
			iconAtRight: {
				description: 'Arrow icon in the header will be displayed at right'
			}
		},
		inputs: [
			{
				view: {
					description: 'Section header view (String)',
					type: 'select',
					options: BOX_SECTION_VIEWS
				},
				caption: {
					description: 'Text of the section header. Can be a React element (String)',
					example: 'Super section',
					size: 5
				},
				note: {
					description: 'Text of the section note at right in the header. Can be a React element (String)',
					example: 'Super section note',
					size: 5
				}
			}
		]
	};
	static data = {
		speed: 'fast',
		animation: 'fade-fall',
		effect: 'ease-in-out',
		caption: 'Some section'
	};
	static excluded = ['vertical', 'block', 'valign', 'height'];
	static handlers = ['onToggle', 'onDisabledClick'];
	static stateProps = ['isOpen'];
	static funcs = {
		onToggle: getSetState('isOpen')
	};
	static args = {
		onToggle: ['isOpen']
	};
	static componentName = 'BoxSection';
	static component = BoxSection;
	static changeState = {
		onToggle: 'isOpen'
	}

	renderMapperBefore() {
		return (
			<AnimatedMapper 
				isOpen={true}
				data={this.state.data} 
				onChange={this.handleChangeData}
			/>
		)
	}

	renderContent() {
		return BOX_CONTENT;
	}

	renderPreviewContent = () => {
		return previewRenderer.render(BOX_CONTENT);
	}
}