import React from 'react';
import {Section} from 'uiex/Section';
import {Button} from 'uiex/Button';
import {Modal} from 'uiex/Modal';
import {stringify, wrap} from './utils';

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
		return (
			<Section 
				className="preview" 
				caption="Preview" 
				note={this.getNote()}
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

	getNote() {
		return (
			<span>
				{this.props.renderPreviewNote()}
				<Button onClick={this.handleGetCodeClick}>
					Get code
				</Button>
			</span>
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
		const {owner, data, name, unclosable, handlers, args, funcs, stateProps, consts, contentRenderer, additionalImport, isPropAvailable, renderPreviewConst} = this.props;
		const bools = [];
		const T = "\t";
		const N = "\n";
		let addImport = '';
		if (typeof additionalImport == 'string') {
			addImport = wrap(', ') + additionalImport;
		} else if (additionalImport instanceof Array) {
			addImport = wrap(', ') + additionalImport.join(wrap(', '));
		}
		let code = wrap('import', 'keyword') + wrap(' {') + 'Component' + wrap('} ') + wrap('from', 'keyword') + wrap(' "react"', 'string') + wrap(';') + N;
		code += wrap('import', 'keyword') + wrap(' {') + name + addImport + wrap('} ') + wrap('from', 'keyword') + wrap(' "uiex/' + name + '"', 'string') + wrap(';') + N + N;
		let constsAdded = 0;
		if (consts instanceof Array) {
			for (let c of consts) {
				if (!isPropAvailable(c)) {
					continue;
				}
				if (data[c] != null) {
					constsAdded++;
					const constValue = renderPreviewConst(c, data[c]) || stringify(data[c]);
					code += wrap('const ', 'keyword2') + this.getConstName(c) + wrap(' = ') + constValue + wrap(';') + N;
				}
			}
			if (constsAdded) {
				code += N;
			}
		}
		code += wrap('export default', 'keyword') + wrap(' class ', 'keyword2') + wrap(name + 'Demo', 'name') + wrap(' extends', 'keyword') + wrap(' Component', 'name') + wrap(' {') + N;
		if (stateProps instanceof Array) {
			code += T + wrap('constructor', 'keyword2') + wrap('(') + wrap('props', 'args') + wrap(') {') + N;
			code += T + T + wrap('super', 'args') + wrap('(') + 'props' + wrap(');') + N;
			code += T + T + wrap('this', 'args') + wrap('.') + 'state' + wrap(' = {') + N;
			const lines = [];
			for (let item of stateProps) {
				let val = data[item];
				if (consts instanceof Array && consts.indexOf(item) > -1) {
					val = this.getConstName(item);
				} else {
					if (data[item] == null) {
						val = wrap('""', 'string');
					} else if (typeof data[item] == 'string') {
						val = wrap('"' + data[item] + '"', 'string');
					} else {
						val = stringify(data[item]);
					}
				}
				lines.push(T + T + T + wrap(item, 'key') + wrap(': ') + val);
			}
			code += lines.join(',' + N) + N + T + T + wrap('}') + N;
			code += T + wrap('}') + N + N;
		}
		code += T + wrap('render', 'function') + wrap('() {') + N;
		if (stateProps instanceof Array) {
			code += T + T + wrap('const', 'keyword2') + wrap(' {') + stateProps.join(', ') + wrap('} = ') + wrap('this', 'args') + wrap('.') + 'state' + wrap(';') + N;
		}
		code += T + T + wrap('return', 'keyword') + wrap(' (') + N + T + T + T + wrap('&lt;') + wrap(name, 'keyword2') + N;
		if (stateProps instanceof Array) {
			for (let k of stateProps) {
				code += T + T + T + T + wrap(k, 'key') + wrap('={') + k + wrap('}') + N;
			}
		}
		for (let item of priority) {
			if (data[item] !== undefined) {
				code += T + T + T + T + wrap(item, 'key') + wrap('=') + (typeof data[item] == 'string' ? wrap('"' + data[item] + '"', 'string') : wrap('{') + stringify(data[item]) + wrap('}')) + N;
			}
		}
		for (let k in data) {
			if (!isPropAvailable(k)) {
				continue;
			}
			if (consts instanceof Array && consts.indexOf(k) > -1 && (!(stateProps instanceof Array) || stateProps.indexOf(k) == -1)) {
				code += T + T + T + T + wrap(k, 'key') + wrap('={') + this.getConstName(k) + wrap('}') + N;
				continue;
			}
			if (k != 'children' && priority.indexOf(k) == -1 && (!(stateProps instanceof Array) || stateProps.indexOf(k) == -1)) {
				if (data[k] === true) {
					bools.push(k);
				} else if (data[k]) {
					code += T + T + T + T + wrap(k, 'key') + wrap('=') + (typeof data[k] == 'string' ? wrap('"' + data[k] + '"', 'string') : wrap('{') + stringify(data[k]) + wrap('}')) + N;
				}
			}
		}
		for (let item of bools) {
			code += T + T + T + T + wrap(item, 'key') + N;
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
				const ha2 = wrap('handle' + h.replace(/^on/, ''), 'name');
				code += T + T + T + T + wrap(h, 'key') + wrap('={') + wrap('this', 'args') + wrap('.') + ha + wrap('}') + N;
				funcsContent += N + N + T + ha2 + wrap(' = (') + wrap(a, 'args') + wrap(') ') + wrap('=>', 'keyword2') + wrap(' {') + N + T + T + func + N + T + wrap('}');
			}
		}
		const content = contentRenderer.call(owner);
		const hasContent = content || data.children;
		if (hasContent && !unclosable) {			
			code += T + T + T + wrap('&gt;') + N + (content || (T + T + T + T + (data.children || ''))) + N + T + T + T + wrap('&lt;/') + wrap(name, 'keyword2') + wrap('&gt;') + N;
		} else {
			code += T + T + T + wrap('/&gt;') + N;
		}
		code += T + T + wrap(')') + N + T +  wrap('}');
		code += (funcsContent || '') + N + wrap('}');
		return (
			<pre dangerouslySetInnerHTML={{__html: code}}/>
		)
	}

	getConstName(name) {
		return name.split(/(?=[A-Z])/).join('_').toUpperCase();
	}
}