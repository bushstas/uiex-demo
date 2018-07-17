import React from 'react';
import {Section, Button, Modal} from 'uiex';

export default class Preview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			padding: 10,
			codeShown: false
		}
	}

	render() {
		const {codeShown} = this.state;
		const note = (
			<Button onClick={this.handleGetCodeClick}>
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
				<Modal
					header={'Code of ' + this.props.name}
					width="600"
					isOpen={codeShown}
					onClose={this.handleModalClose}
				>
					{codeShown && this.renderCode()}
				</Modal>
			</Section>
		)
	}

	handleGetCodeClick = () => {
		this.setState({codeShown: true});
	}

	handleModalClose = () => {
		this.setState({codeShown: false});
	}

	renderCode() {
		const priority = ['className', 'title', 'width', 'height'];
		const {data, name} = this.props;
		const bools = [];
		const T = "\t";
		const N = "\n";
		let code = 'import {' + name + '} from "uiex";' + N + N + '<' + name + N;
		for (let item of priority) {
			if (data[item] !== undefined) {
				code += T + item + '=' + (typeof data[item] == 'string' ? '"' + data[item] + '"' : '{' + data[item] + '}') + N;
			}
		}
		for (let k in data) {
			if (k != 'children' && priority.indexOf(k) == -1) {
				if (data[k] === true) {
					bools.push(k);
				} else if (data[k]) {
					code += T + k + '=' + (typeof data[k] == 'string' ? '"' + data[k] + '"' : '{' + data[k] + '}') + N;
				}
			}
		}
		for (let item of bools) {
			code += T + item + N;
		}
		code += '>' + N + T + (data.children || '') + N + '</' + name + '>';
		return (
			<pre>
				{code}
			</pre>
		)
	}
}