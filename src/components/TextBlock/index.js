import React from 'react';
import Demo from '../../Demo';
import {TextBlock} from 'uiex/TextBlock';
import {TEXT_BLOCK_CONTENT} from '../../consts';
import {previewRenderer} from '../../utils';

export default class TextBlockDemo extends Demo {
	static map = {
		checkboxes: {
			bold: {
				description: ''
			},
			italic: {
				description: ''
			},
			justify: {
				description: ''
			},
			nowrap: {
				description: ''
			},
			noselect: {
				description: ''
			},
			withEllipsis: {
				description: ''
			}
		},
		inputs: [
			{
				fontSize: {
					description: '',
					type: 'number',
					positive: true,
					example: '16'
				},
				lineHeight: {
					description: '',
					type: 'number',
					positive: true,
					maxValue: 100,
					example: '24'
				},
				bgColor: {
					description: '',
					type: 'color',
					example: '555555',
					uncontrolled: true
				},
				textColor: {
					description: '',
					type: 'color',
					example: 'FFFFFF',
					uncontrolled: true
				},
				padding: {
					description: '',
					example: '20'
				},
				margin: {
					description: '',
					example: '10px 20px'
				},
				transparency: {
					description: '',
					type: 'number',
					example: '5',
					maxValue: 10,
					positive: true,
					decimal: true,
					toFixed: 1
				},
				border: {
					description: '',
					example: '1px solid #000'
				},
				borderOpacity: {
					description: 'Border opacity from 0 to 10. Can be decimal',
					type: 'number',
					example: '5',
					maxValue: 10,
					positive: true,
					decimal: true,
					toFixed: 1
				},
				borderRadius: {
					description: '',
					type: 'number',
					positive: true,
					maxValue: 100,
					example: '5'
				},
				boxShadow: {
					description: '',
					example: '5px 5px 10px #AAAAAA'
				},
				textShadow: {
					description: '',
					example: '1px 1px 1px #FFFFFF'
				},
			}
		]
	};
	static data = {
		width: 500
	};
	static excluded = ['vertical', 'block', 'valign', 'disabled', 'uncontrolled'];
	static componentName = 'TextBlock';
	static component = TextBlock;

	renderContent() {
		return TEXT_BLOCK_CONTENT;
	}

	renderPreviewContent = () => {
		return previewRenderer.render(this.renderContent());
	}
}