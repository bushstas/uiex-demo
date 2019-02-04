import React from 'react';
import Demo from '../../Demo';
import {TextCut} from 'uiex/TextCut';
import {getSetState} from '../../utils';

export default class TextCutDemo extends Demo {
	static map = {
		checkboxes: {
			withEllipsis: {
				description: ''
			},
			withEllipsisMask: {
				description: ''
			},
			withBottomMask: {
				description: ''
			},
			justified: {
				description: ''
			},
			noMinimize: {
				description: ''	
			}
		},
		inputs: [
			{
				maxLines: {
					description: '',
					type: 'number',
					positive: true
				},
				lineHeight: {
					description: '',
					type: 'number',
					positive: true
				},
				maxHeight: {
					description: '',
					type: 'number',
					positive: true
				}
			}
		]
	};
	static data = {
		width: 200,
		style: {lineHeight: '22px'},
		withEllipsis: true,
		lineHeight: 22,
		maxLines: 2, 
		children: 'I hope that we\'re able to get everybody in a big and beautiful room and do a new treaty that would be much better. Certainly, I would like to see that,” Trump told reporters at the White House. Earlier in the day, however, he vowed to “move forward with developing our own military response options” against Russian alleged violations. Moscow, on its part has vehemently denied the accusations, even showcasing the missile the US claimed to be in violation of the INF agreement in an unprecedented step towards transparency. The 1987 deal between the US and Soviet Union bans ground based missiles – both ballistic and cruise ones – with ranges between 500 and 5,500 kilometers. Washington and Moscow have repeatedly accused each other of violating the agreement – with the US claiming that Russia covertly produced banned systems and the latter stating that the so-called US missile-defense systems, deployed in Europe, were actually capable of launching offensive munitions.'
	};
	static excluded = ['vertical', 'block', 'valign', 'height'];
	static handlers = ['onExpand'];
	static stateProps = ['expanded'];
	static funcs = {
		onExpand: getSetState('expanded')
	};
	static changeState = {
		onExpand: 'expanded'
	};
	static args = {
		onExpand: 'expanded'
	};
	static componentName = 'TextCut';
	static component = TextCut;
}