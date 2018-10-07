import React from 'react';
import {Section} from 'uiex/Section';
import {Button} from 'uiex/Button';
import {Modal} from 'uiex/Modal';
import {stringify, wrap, tabulation} from './utils';

export default class Preview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			padding: 10,
			codeShown: false
		}
	}

	render() {
		const {codeShown, expanded} = this.state;
		return (
			<Section 
				className="preview" 
				caption="Preview" 
				note={this.getNote()}
			>
				{this.props.children}
				<Modal
					className="preview-modal"
					expanded={expanded}
					header={'Demo code of ' + this.props.name}
					width="900"
					expandable
					isOpen={codeShown}
					onClose={this.handleModalClose}
					onExpand={this.handleModalExpand}
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
					Get demo code
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

	handleModalExpand = (expanded) => {
		this.setState({expanded});
	}

	renderCode() {
		tabulation.init();
		const priority = ['className', 'title', 'width', 'height'];
		let {
			owner,
			data,
			name,
			unclosable,
			handlers,
			args,
			funcs,
			stateProps,
			consts,
			contentRenderer,
			additionalImport,
			isPropAvailable,
			renderPreviewConst,
			wrapper,
			contentBeforeRenderer,
			contentAfterRenderer,
			imports,
			renderMethods,
			componentRef,
			uncontrolled
		} = this.props;
		const bools = [];

		if (typeof stateProps == 'function') {
			stateProps = stateProps.call(owner);
		}

		const N = "\n";
		if (!(consts instanceof Array)) {
			consts = [];
		}
		consts.push('style');

		// imports
		let addImport = '';
		if (typeof additionalImport == 'string') {
			addImport = wrap(', ') + additionalImport;
		} else if (additionalImport instanceof Array) {
			addImport = wrap(', ') + additionalImport.join(wrap(', '));
		}
		let code = wrap('import', 'keyword') + ' React ' + wrap('from', 'keyword') + wrap(' "react"', 'string') + wrap(';') + N;
		code += wrap('import', 'keyword') + wrap(' {') + name + addImport + wrap('} ') + wrap('from', 'keyword') + wrap(' "uiex/' + name + '"', 'string') + wrap(';') + N;
		if (imports) {
			if (typeof imports == 'string') {
				imports = [imports];
			}
			if (imports instanceof Array) {
				for (let i = 0; i < imports.length; i++) {
					const imp = imports[i];
					code += wrap('import', 'keyword') + wrap(' {') + imp + wrap('} ') + wrap('from', 'keyword') + wrap(' "uiex/' + imp + '"', 'string') + wrap(';') + N;
				}
			}
		}
		code += N;
		
		// consts
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
		}
		if (uncontrolled && stateProps instanceof Array) {
			for (let item of stateProps) {
				constsAdded++;
				let val = data[item];
				if (val === undefined) {
					val = null;
				}
				if (typeof val == 'string') {
					val = wrap('"' + val + '"', 'string');
				} else {
					val = stringify(val);
				}
				code += wrap('const ', 'keyword2') + this.getConstName('initial_' + item) + wrap(' = ') + val + wrap(';') + N;
			}
		}
		if (constsAdded) {
			code += N;
		}

		// class
		code += wrap('export default', 'keyword') + wrap(' class ', 'keyword2') + wrap(name + 'Demo', 'name') + wrap(' extends', 'keyword') + wrap(' React.Component', 'name') + wrap(' {') + N;
		tabulation.add();
		
		
		// constructor
		if (!uncontrolled && stateProps instanceof Array) {
			code += tabulation.render(wrap('constructor', 'keyword2') + wrap('(') + wrap('props', 'args') + wrap(') {'), true);
			tabulation.add();
			code += tabulation.render(wrap('super', 'args') + wrap('(') + 'props' + wrap(');'), true);
			code += tabulation.render(wrap('this', 'args') + wrap('.') + 'state' + wrap(' = {'));

			const lines = [];
			tabulation.add();
			for (let item of stateProps) {
				let val = data[item];
				if (consts instanceof Array && consts.indexOf(item) > -1) {
					val = this.getConstName(item);
				} else {
					if (val === undefined) {
						val = null;
					} else if (typeof val == 'string') {
						val = wrap('"' + val + '"', 'string');
					} else {
						val = stringify(val);
					}
				}
				if (val != null) {
					lines.push(tabulation.render(wrap(item, 'key') + wrap(': ') + val));
				}
			}
			tabulation.reduce();
			if (lines.length > 0) {
				code += N + lines.join(wrap(',') + N) + N;
				code += tabulation.render(wrap('};'), true);
			} else {
				code += wrap('};') + N;
			}
			tabulation.reduce();
			code += tabulation.render(wrap('}'), 2);
		}

		// render
		code += tabulation.render(wrap('render', 'function') + wrap('() {'), true);
		tabulation.add();
		if (!uncontrolled && stateProps instanceof Array) {
			code += tabulation.render(wrap('const', 'keyword2') + wrap(' {') + stateProps.join(', ') + wrap('} = ') + wrap('this', 'args') + wrap('.') + 'state' + wrap(';'), true);
		}
		code += tabulation.render(wrap('return', 'keyword') + wrap(' ('), true);
		
		
		
		// ================ start component
		tabulation.add();
		if (wrapper) {
			if (typeof wrapper == 'string') {
				code += tabulation.render(wrap('&lt;') + wrap(wrapper, 'tag') + wrap('&gt;'), true);
			}
			tabulation.add();
			if (typeof contentBeforeRenderer == 'function') {
				const contentBefore = contentBeforeRenderer();
				if (contentBefore) {
					code += contentBefore + N;
				}
			}
		}
		code += tabulation.render(wrap('&lt;') + wrap(name, 'keyword2'), true);
		tabulation.add();
		if (componentRef && typeof componentRef == 'string') {
			code += tabulation.render(wrap('ref', 'key') + wrap('=') + wrap('"' + componentRef + '"', 'string'), true);
		}
		if (stateProps instanceof Array) {
			for (let k of stateProps) {
				const k2 = uncontrolled ? this.getConstName('initial_' + k) : k;
				code += tabulation.render(wrap(k, 'key') + wrap('={') + k2 + wrap('}'), true);
			}
		}
		for (let item of priority) {
			if (data[item] !== undefined && data[item] !== '') {
				code += tabulation.render(wrap(item, 'key') + wrap('=') + (typeof data[item] == 'string' ? wrap('"' + data[item] + '"', 'string') : wrap('{') + stringify(data[item]) + wrap('}')), true);
			}
		}
		for (let k in data) {
			if (!isPropAvailable(k)) {
				continue;
			}
			if (consts instanceof Array && consts.indexOf(k) > -1 && (!(stateProps instanceof Array) || stateProps.indexOf(k) == -1)) {
				code += tabulation.render(wrap(k, 'key') + wrap('={') + this.getConstName(k) + wrap('}'), true);
				continue;
			}
			if (k != 'children' && priority.indexOf(k) == -1 && (!(stateProps instanceof Array) || stateProps.indexOf(k) == -1)) {
				if (data[k] === true) {
					bools.push(k);
				} else if (data[k] || k == 'valid') {
					code += tabulation.render(wrap(k, 'key') + wrap('=') + (typeof data[k] == 'string' ? wrap('"' + data[k] + '"', 'string') : wrap('{') + stringify(data[k]) + wrap('}')), true);
				}
			}
		}
		for (let item of bools) {
			code += tabulation.render(wrap(item, 'key'), true);
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
				if (funcs instanceof Object && funcs[h] && !uncontrolled) {
					let fn = funcs[h];
					if (typeof fn == 'function') {
						fn = fn.call(owner);
					}
					if (fn instanceof Array) {
						fn = fn.join(N);
					}
					func = fn;
				}				
				const ha = 'handle' + h.replace(/^on/, '');
				const ha2 = wrap('handle' + h.replace(/^on/, ''), 'name');
				code += tabulation.render(wrap(h, 'key') + wrap('={') + wrap('this', 'args') + wrap('.') + ha + wrap('}'), true);
				funcsContent += N + N;
				funcsContent += tabulation.renderWith(ha2 + wrap(' = (') + wrap(a, 'args') + wrap(') ') + wrap('=>', 'keyword2') + wrap(' {'), 1, true);
				funcsContent += tabulation.renderWith(func, 2, true);
				funcsContent += tabulation.renderWith(wrap('}'), 1);
			}
		}
		let content = contentRenderer.call(owner);
		tabulation.reduce();
		const hasContent = content || data.children;
		if (content) {
			content += N;
		}
		if (hasContent && !unclosable) {
			code += tabulation.render(wrap('&gt;'), true);
			tabulation.add();
			code += content || tabulation.render(data.children, true);
			tabulation.reduce();
			code += tabulation.render(wrap('&lt;/') + wrap(name, 'keyword2') + wrap('&gt;'), true);
		} else {
			code += tabulation.render(wrap('/&gt;'), true);
		}
		if (wrapper) {
			if (typeof contentAfterRenderer == 'function') {
				const contentAfter = contentAfterRenderer();
				if (contentAfter) {
					code += contentAfter + N;
				}
			}
			tabulation.reduce();
			if (typeof wrapper == 'string') {
				code += tabulation.render(wrap('&lt;/') + wrap(wrapper, 'tag') + wrap('&gt;'), true);
			}
		}
		// ======================= end component


		tabulation.reduce();
		code += tabulation.render(wrap(')'), true);
		tabulation.reduce();
		code += tabulation.render(wrap('}'));
		if (typeof renderMethods == 'function') {
			const methods = renderMethods();
			if (methods) {
				code += methods;
			}
		}
		code += (funcsContent || '') + N + wrap('}');
		return (
			<pre className="decorated" dangerouslySetInnerHTML={{__html: code}}/>
		)
	}

	getConstName(name) {
		return name.split(/(?=[A-Z])/).join('_').toUpperCase();
	}
}