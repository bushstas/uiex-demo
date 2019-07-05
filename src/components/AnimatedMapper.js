import React from 'react';
import Mapper from '../Mapper';
import {ANIM_TYPE, ANIM_SPEED, ANIM_EFFECTS} from 'uiex/consts';

const MAP = {
	inputs: [
		{
			animation: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Animation type (String)',
				options: ANIM_TYPE,
				default: 'fade-fall'
			},
			speed: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Animation speed (String)',
				options: ANIM_SPEED,
				default: 'fast'
			},
			effect: {
				type: 'select',
				empty: 'Chose an option',
				description: 'Animation effect (String)',
				options: ANIM_EFFECTS,
				default: 'ease-in-out'
			}
		}
	]
}

export default class AnimatedMapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			map: MAP
		}
	}

	render() {
		return (
			<Mapper 
				isOpen={this.props.isOpen}
				formName="animatedMapper"
				name="UIEXAnimated"
				excluded={this.props.excluded}
				map={this.state.map} 
				data={this.props.data} 
				onChange={this.props.onChange}
			/>
		)
	}
}