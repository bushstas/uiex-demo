import React from 'react';
import {Section} from 'uiex/Section';
import {Button} from 'uiex/Button';
import {Modal} from 'uiex/Modal';
import {stringify} from './utils';

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
					width="800"
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
		const {owner, data, name, unclosable, handlers, args, funcs, stateProps, consts, contentRenderer, additionalImport} = this.props;
		const bools = [];
		const T = "\t";
		const N = "\n";
		let addImport = '';
		if (typeof additionalImport == 'string') {
			addImport = ', ' + additionalImport;
		} else if (additionalImport instanceof Array) {
			addImport = ', ' + additionalImport.join(', ');
		}
		let code = 'import {Component} from "react";' + N;
		code += 'import {' + name + addImport + '} from "uiex/' + name + '";' + N + N;
		if (consts instanceof Array) {
			for (let c of consts) {
				code += 'const ' + this.getConstName(c) + ' = ' + stringify(data[c]) + ';' + N + N;
			}
		}
		code += 'export default class ' + name + 'Demo extends Component {' + N;
		if (stateProps instanceof Array) {
			code += T + 'constructor(props) {' + N;
			code += T + T + 'super(props);' + N;
			code += T + T + 'this.state = {' + N;
			const lines = [];
			for (let item of stateProps) {
				let val = data[item];
				if (data[item] == null) {
					val = '""';
				} else if (typeof data[item] == 'string') {
					val = '"' + data[item] + '"';
				}
				lines.push(T + T + T + item + ': ' + val);
			}
			code += lines.join(',' + N) + N + T + T + '}' + N;
			code += T + '}' + N + N;
		}
		code += T + 'render() {' + N;
		if (stateProps instanceof Array) {
			code += T + T + 'const {' + stateProps.join(', ') + '} = this.state;' + N;
		}
		code += T + T + 'return (' + N + T + T + T + '<' + name + N;
		if (stateProps instanceof Array) {
			for (let k of stateProps) {
				code += T + T + T + T + k + '=' + '{' + k + '}' + N;
			}
		}
		for (let item of priority) {
			if (data[item] !== undefined) {
				code += T + T + T + T + item + '=' + (typeof data[item] == 'string' ? '"' + data[item] + '"' : '{' + data[item] + '}') + N;
			}
		}
		for (let k in data) {
			if (consts instanceof Array && consts.indexOf(k) > -1) {
				code += T + T + T + T + k + '={' + this.getConstName(k) + '}' + N;
				continue;
			}
			if (k != 'children' && priority.indexOf(k) == -1 && (!(stateProps instanceof Array) || stateProps.indexOf(k) == -1)) {
				if (data[k] === true) {
					bools.push(k);
				} else if (data[k]) {
					code += T + T + T + T + k + '=' + (typeof data[k] == 'string' ? '"' + data[k] + '"' : '{' + data[k] + '}') + N;
				}
			}
		}
		for (let item of bools) {
			code += T + T + T + T + item + N;
		}
		let funcsContent;
		if (handlers instanceof Array) {
			funcsContent = '';
			for (let h of handlers) {
				let a = '';
				let func = '';
				if (args instanceof Object && args[h] instanceof Array) {
					a = args[h].join(', ');
				}
				if (funcs instanceof Object && funcs[h]) {
					if (funcs[h] instanceof Array) {
						funcs[h] = funcs[h].join(N);
					}
					func = funcs[h];
				}
				const ha = 'handle' + h.replace(/^on/, '');
				code += T + T + T + T + h + '={this.' + ha + '}' + N;
				funcsContent += N + N + T + ha + ' = (' + a + ') => {' + N + T + T + func + N + T + '}';
			}
		}
		if (!unclosable) {
			const content = contentRenderer.call(owner);
			code += T + T + T + '>' + N + (content || (T + T + T + T + (data.children || ''))) + N + T + T + T + '</' + name + '>' + N;
		} else {
			code += T + T + T + '/>' + N;
		}
		code += T + T + ')' + N + T +  '}';
		code += (funcsContent || '') + N + '}';
		return (
			<pre>
				{code}
			</pre>
		)
	}

	getConstName(name) {
		return name.split(/(?=[A-Z])/).join('_').toUpperCase();
	}
}