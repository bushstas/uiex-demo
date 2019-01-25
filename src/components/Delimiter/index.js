import React from 'react';
import Demo from '../../Demo';
import {Delimiter} from 'uiex/Delimiter';

export default class DelimiterDemo extends Demo {
	static map = {
		checkboxes: {
			withLine: {
				description: 'With delimiter line'
			},
			withGradient: {
				description: 'Delimiter line has gradient edges'
			}
		},
		inputs: [
			{
				space: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 200
				},
				lineThickness: {
					description: 'Thickness on delimiter line',
					type: 'number',
					positive: true,
					maxValue: 20
				},
				lineColor: {
					description: 'Color on delimiter line',
					type: 'color'
				}
			}
		]
	};
	static data = {
		space: 20
	};
	static excluded = ['vertical', 'valign', 'align', 'block', 'disabled', 'uncontrolled'];
	static componentName = 'Delimiter';
	static component = Delimiter;


	renderContentBefore() {
        return (
        	<div>
        		Upper block
        	</div>
        );
    }

    renderContentAfter() {
        return (
			<div>
        		Lower block
        	</div>
        );
    }
}