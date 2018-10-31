import React from 'react';
import Demo from '../../Demo';
import {Label} from 'uiex/Label';
import {BUTTONS_VIEW, COLORS, ICON_TYPE} from 'uiex/consts';
import {previewRenderer} from '../../utils';

export default class LabelDemo extends Demo {
	static map = {
		checkboxes: {
		
		},
		inputs: [
			{
				color: {
					description: 'Color of tab buttons',
					options: COLORS
				}
			}
		]
	};
	static data = {
		color: 'black'
	};
	static excluded = ['vertical', 'block', 'valign', 'height'];
	static handlers = [];
	static stateProps = [];
	static funcs = {
		
	};
	static args = {
		
	};
	static componentName = 'Label';
	static component = Label;

	renderContent() {
		return 'label';
	}

	renderPreviewContent = () => {
		return previewRenderer.render(this.renderContent());
	}
}