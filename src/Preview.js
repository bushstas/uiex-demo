import React from 'react';
import {Section, Button} from 'uiex';

const defaultState = {
	padding: 10
}

export default class Preview extends React.Component {

	render() {
		this.state = this.state || defaultState;
		const note = (
			<Button onClick={this.handleButtonClick}>
				Get code
			</Button>
		)
		return (
			<Section 
				className="preview" 
				caption="Preview" 
				note={note}
			>
				{this.props.children}
			</Section>
		)
	}

	handleButtonClick = () => {

	}
}