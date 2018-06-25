import React from 'react';
import {Section} from 'uiex';

const defaultState = {
	padding: 10
}

export default class Preview extends React.Component {

	render() {
		this.state = this.state || defaultState;
		return (
			<Section caption="Preview">
				{this.props.children}
			</Section>
		)
	}
}