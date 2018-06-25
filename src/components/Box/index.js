import React from 'react';
import {Box, Button, UIEXCONSTS} from 'uiex';
import ComponentMapper from '../ComponentMapper';
import Mapper from '../../Mapper';
import Preview from '../../Preview';

import './style.scss';

const DATA = {
	classes: 'demo',
	isOpen: true,
	buttonUnder: false,
	speed: 'fast',
	animation: 'fade-fall',
	effect: 'ease-in-out',
	button: 'Open the box/Close the box'
}

const EXCLUDED = ['vertical']

const MAP = {
	checkboxes: {
		isOpen: {
			type: 'boolean',
			description: 'Open/Close status flag',
			default: true
		},
		buttonUnder: {
			type: 'boolean',
			description: 'Open/Close button is under the box',
			default: false
		}
	},
	inputs: [
		{
			button: {
				description: 'Text of button',
				example: 'Open/Close',
				default: ''
			},
			animation: {
				type: 'select',
				description: 'Animation type',
				options: UIEXCONSTS.ANIM_TYPE,
				default: 'fade-fall'
			},
			speed: {
				type: 'select',
				description: 'Animation speed from 1 to 10',
				options: UIEXCONSTS.ANIM_SPEED,
				default: 'fast'
			},
			effect: {
				type: 'select',
				description: 'Animation effect',
				options: UIEXCONSTS.ANIM_EFFECTS,
				default: 'ease-in-out'
			}
		}
	]
}

const HANDLERS = ['onToggle', 'onDisabledClick'];

export default class ButtonsDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			data: DATA
		};
	}

	render() {
		const {isOpen} = this.state.data;
		return (
			<div>
				<ComponentMapper 
					isOpen={false}
					data={this.state.data} 
					excluded={EXCLUDED}
					onChange={this.handleChangeData}
				/>
				<Mapper 
					ref="mapper"
					name="Box"
					map={MAP} 
					data={this.state.data} 
					onChange={this.handleChangeData}
					handlers={HANDLERS}
				/>
				<Preview>
					<Box 
						{...this.state.data} 
						onToggle={this.handleToggleBox}
						onDisabledClick={this.handleDisabledClick}
					>
						<h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

						<h3>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

						<h3>1914 translation by H. Rackham</h3>
						But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

						<h3>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
						At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
					</Box>
				</Preview>
			</div>
		)
	}

	handleToggleBox = (isOpen) => {
		const data = this.state.data;
		this.setState({
			data: {
				...this.state.data,
				isOpen
			}
		});
		this.fire('onToggle');
	}

	handleChangeData = (data) => {
		this.setState({data});
	}

	handleDisabledClick = () => {
		this.fire('onDisabledClick');
	}

	fire(event) {
		this.refs.mapper.fire(event);
	}
}