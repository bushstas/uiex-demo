import React from 'react';
import {Section} from 'uiex/Section';
import {Button} from 'uiex/Button';
import {Modal} from 'uiex/Modal';
import {stringify, wrap, tabulation, previewRenderer, getConstName, getRenderName} from './utils';

export default class Preview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			padding: 10,
			codeShown: false,
			customizationShown: false
		}
	}

	render() {
		const {withoutComponentMapper} = this.props;
		const {
			codeShown,
			customizationShown,
			expanded,
			customizationExpanded
		} = this.state;
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
				{!withoutComponentMapper &&
					<Modal
						className="preview-modal"
						expanded={customizationExpanded}
						header={'Customization example'}
						width="900"
						expandable
						isOpen={customizationShown}
						onClose={this.handleCustomizationModalClose}
						onExpand={this.handleCustomizationModalExpand}
					>
						{customizationShown && this.renderCustomizationCode()}
					</Modal>
				}
			</Section>
		)
	}

	getNote() {
		const {withoutComponentMapper, onRerender} = this.props;
		return (
			<span>
				{this.props.renderPreviewNote()}
				<Button
					title="Unmount and then render again"
					onClick={onRerender}
				>
					Rerender component
				</Button>
				<Button onClick={this.handleGetCodeClick}>
					Get demo code
				</Button>
				{!withoutComponentMapper &&
					<Button onClick={this.handleCustomizationClick}>
						Customizitation example
					</Button>
				}
			</span>
		)
	}

	handleGetCodeClick = () => {
		this.setState({codeShown: true});
	}

	handleCustomizationClick = () => {
		this.setState({customizationShown: true});
	}

	handleModalClose = () => {
		this.setState({codeShown: false});
	}

	handleCustomizationModalClose = () => {
		this.setState({customizationShown: false});
	}

	handleModalExpand = (expanded) => {
		this.setState({expanded});
	}

	handleCustomizationModalExpand = (customizationExpanded) => {
		this.setState({customizationExpanded});
	}

	renderObject(object) {
		let code = wrap('{') + "\n";
		tabulation.add();
		const keys = Object.keys(object);
		for (let i = 0; i < keys.length; i++) {
			code += tabulation.render(wrap(keys[i], 'key') + wrap(': '));
			if (object[keys[i]] instanceof Object) {
				code += this.renderObject(object[keys[i]]);
			} else {
				code += stringify(object[keys[i]]);
			}
			code += (i < keys.length - 1 ? wrap(',') : '') + "\n";
		}
		tabulation.reduce();
		code += tabulation.render(wrap('}'));
		return code;
	}

	renderCustomizationCode() {
		tabulation.init();
		let {
			component,
			name,
			defaultProps = {
				width: 100,
				height: 100,
				className: 'arrow'
			},
			defaultStyle = {
				color: 'black',
				fontSize: 16
			},
			defaultStyles = {
				main: {
					color: 'black',
					fontSize: 16
				}
			},
			theme = {
				color: 'black',
				fontSize: 16
			},
			themes = {
				main: {
					color: 'black',
					fontSize: 16
				}
			} 
		} = this.props;

		let hasStyleNames = false;
		if (component.styleNames instanceof Array && component.styleNames.length > 0) {
			hasStyleNames = true;
			for (let i = 0; i < component.styleNames.length; i++) {
				defaultStyles[component.styleNames[i]] = {
					opacity: 0.5,
					backgroundColor: '#FFF'
				};
				themes[component.styleNames[i]] = {
					opacity: 0.5,
					backgroundColor: '#FFF'
				};
			}
		}
		let code = tabulation.render(wrap('import', 'keyword') + wrap(' {'), true);
		tabulation.add();
		code += tabulation.render('setDefaultProps' + wrap(', '), true);
		code += tabulation.render('setDefaultStyle' + wrap(', '), true);
		code += tabulation.render('setDefaultStyles' + wrap(', '), true);
		code += tabulation.render('addTheme' + wrap(', '), true);
		code += tabulation.render('addThemes', true);
		tabulation.reduce();
		code += tabulation.render(wrap('} ') + wrap('from', 'keyword') + wrap(' "uiex"', 'string') + wrap(';'), true);
		code += tabulation.render(wrap('import', 'keyword') + wrap(' {') + name + wrap('} ') + wrap('from', 'keyword') + wrap(' "uiex/' + name + '"', 'string') + wrap(';'), 2);

		code += tabulation.render(wrap('setDefaultProps', 'function') + wrap('(') + name + wrap(', '));
		code += this.renderObject(defaultProps);
		code += tabulation.render(wrap(');'), 2);

		code += tabulation.render(wrap('setDefaultStyle', 'function') + wrap('(') + name + wrap(', '));
		code += this.renderObject(defaultStyle);
		code += tabulation.render(wrap(');'), 2);

		if (hasStyleNames) {
			code += tabulation.render(wrap('setDefaultStyles', 'function') + wrap('(') + name + wrap(', '));
			code += this.renderObject(defaultStyles);
			code += tabulation.render(wrap(');'), 2);
		}

		code += tabulation.render(wrap('// usage: &lt;' + name + ' theme="colored" /&gt;', 'comment'), true);
		code += tabulation.render(wrap('addTheme', 'function') + wrap('(') + name + wrap(', ') + wrap('"colored"', 'string') + wrap(', '));
		code += this.renderObject(theme);
		code += tabulation.render(wrap(');'), 2);

		if (hasStyleNames) {
			code += tabulation.render(wrap('addThemes', 'function') + wrap('(') + name + wrap(', ') + wrap('"colored"', 'string') + wrap(', '));
			code += this.renderObject(themes);
			code += tabulation.render(wrap(');'), 2);
		}
		return (
			<pre className="decorated" dangerouslySetInnerHTML={{__html: code}}/>
		)
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
			uncontrolled,
			commentBeforeRenderReturn,
			contentBeforeClassRenderer,
			propsToRender
		} = this.props;
		const bools = [];
		let childrenFromConst = false;
		let childrenFromState = stateProps instanceof Array && stateProps.indexOf('children') > -1;

		if (typeof stateProps == 'function') {
			stateProps = stateProps.call(owner);
		}

		const N = "\n";
		if (!(consts instanceof Array)) {
			consts = [];
		}
		consts.push('style');

		let renderCode = '';
		const addToImport = [];
		let constsFromRenderer = [];
		tabulation.add();
		// render componentlike props
		if (propsToRender instanceof Array && propsToRender.length > 0) {
			propsToRender.forEach((p) => {
				if (data[p] != null && data[p].type instanceof Function && React.isValidElement(data[p])) {
					addToImport.push(data[p].type.name);
					renderCode += tabulation.render(wrap(getRenderName(p), 'name') + wrap('() {'), true);
					tabulation.add();
					renderCode += tabulation.render(wrap('return', 'keyword') + wrap(' ('), true);
					tabulation.add();
					renderCode += previewRenderer.render(data[p], [], true);
					constsFromRenderer = constsFromRenderer.concat(previewRenderer.getConsts());
					tabulation.reduce();
					renderCode += N + tabulation.render(wrap(');'), true);
					tabulation.reduce();
					renderCode += tabulation.render(wrap('}'), 2);
				}
			});
		}
		constsFromRenderer = constsFromRenderer.join(N + N);
		tabulation.reduce();

		// imports
		let addImport = '';
		if (typeof additionalImport == 'string') {
			addImport = wrap(', ') + additionalImport;
		} else if (additionalImport instanceof Array) {
			addImport = wrap(', ') + additionalImport.join(wrap(', '));
		}
		let code = wrap('import', 'keyword') + ' React ' + wrap('from', 'keyword') + wrap(' "react"', 'string') + wrap(';') + N;
		code += wrap('import', 'keyword') + wrap(' {') + name + addImport + wrap('} ') + wrap('from', 'keyword') + wrap(' "uiex/' + name + '"', 'string') + wrap(';') + N;
		if (imports || addToImport.length > 0) {
			if (typeof imports == 'string') {
				imports = [imports];
			}
			if (addToImport.length > 0) {
				if (!(imports instanceof Array)) {
					imports = [];
				}
				imports = imports.concat(addToImport);
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
		let constList = '';
		if (consts instanceof Array) {
			constList = [];
			for (let c of consts) {
				if (!isPropAvailable(c)) {
					continue;
				}
				if (data[c] != null) {
					constsAdded++;
					const constValue = renderPreviewConst(c, data[c]) || stringify(data[c]);
					constList.push(wrap('const ', 'keyword2') + getConstName(c) + wrap(' = ') + constValue + wrap(';'));
				}
			}
			constList = constList.join(N + N);
		}
		if (constList || constsFromRenderer) {
			code += constList + constsFromRenderer + N + N;
		}
		if (uncontrolled && stateProps instanceof Array && stateProps.length > 0) {
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
				code += wrap('const ', 'keyword2') + getConstName('initial_' + item) + wrap(' = ') + val + wrap(';') + N;
			}
		}
		if (constsAdded) {
			code += N;
		}

		if (typeof contentBeforeClassRenderer == 'function') {
			const contentBeforeClass = contentBeforeClassRenderer();
			code += contentBeforeClass + N + N;
		}

		// class
		code += wrap('export default', 'keyword') + wrap(' class ', 'keyword2') + wrap(name + 'Demo', 'name') + wrap(' extends', 'keyword') + wrap(' React.Component', 'name') + wrap(' {');
		tabulation.add();
		
		// constructor
		if (!uncontrolled && stateProps instanceof Array && stateProps.length > 0) {
			code += N + tabulation.render(wrap('constructor', 'keyword2') + wrap('(') + wrap('props', 'args') + wrap(') {'), true);
			tabulation.add();
			code += tabulation.render(wrap('super', 'args') + wrap('(') + 'props' + wrap(');'), true);
			code += tabulation.render(wrap('this', 'args') + wrap('.') + 'state' + wrap(' = {'));

			const lines = [];
			tabulation.add();
			for (let item of stateProps) {
				let val = data[item];
				if (consts instanceof Array && consts.indexOf(item) > -1) {
					val = getConstName(item);
				} else {
					if (val === undefined) {
						val = stringify(null);
					} else if (typeof val == 'string') {
						val = wrap('\'' + val + '\'', 'string');
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
			code += tabulation.render(wrap('}'), 1);
		}

		// render
		renderCode += tabulation.render(wrap('render', 'function') + wrap('() {'), true);
		tabulation.add();
		if (!uncontrolled && stateProps instanceof Array && stateProps.length > 0) {
			renderCode += tabulation.render(wrap('const', 'keyword2') + wrap(' {') + stateProps.join(', ') + wrap('} = ') + wrap('this', 'args') + wrap('.') + 'state' + wrap(';'), true);
		}
		if (commentBeforeRenderReturn) {
			renderCode += tabulation.render(wrap('// ' + commentBeforeRenderReturn, 'comment'), true);	
		}
		renderCode += tabulation.render(wrap('return', 'keyword') + wrap(' ('), true);
		
		// ================ start component
		tabulation.add();
		if (wrapper) {
			if (typeof wrapper == 'string') {
				renderCode += tabulation.render(wrap('&lt;') + wrap(wrapper, 'tag') + wrap('&gt;'), true);
			}
			tabulation.add();
			if (typeof contentBeforeRenderer == 'function') {
				const contentBefore = contentBeforeRenderer();
				if (contentBefore) {
					renderCode += contentBefore + N;
				}
			}
		}
		renderCode += tabulation.render(wrap('&lt;') + wrap(name, 'keyword2'), true);
		tabulation.add();
		if (componentRef && typeof componentRef == 'string') {
			renderCode += tabulation.render(wrap('ref', 'key') + wrap('=') + wrap('"' + componentRef + '"', 'string'), true);
		}
		if (stateProps instanceof Array) {
			for (let k of stateProps) {
				if (k == 'children') {
					continue;
				}
				const k2 = uncontrolled ? getConstName('initial_' + k) : k;
				renderCode += tabulation.render(wrap(k, 'key') + wrap('={') + k2 + wrap('}'), true);
			}
		}
		for (let item of priority) {
			if (data[item] !== undefined && data[item] !== '') {
				renderCode += tabulation.render(wrap(item, 'key') + wrap('=') + (typeof data[item] == 'string' ? wrap('"' + data[item] + '"', 'string') : wrap('{') + stringify(data[item]) + wrap('}')), true);
			}
		}
		for (let k in data) {
			if (!isPropAvailable(k)) {
				continue;
			}
			if (propsToRender instanceof Array && propsToRender.indexOf(k) > -1) {
				if (data[k] != null) {
					renderCode += tabulation.render(wrap(k, 'key') + wrap('={') + wrap('this', 'args') + wrap('.') + getRenderName(k) + wrap('()}'), true);
				}
				continue;
			}
			if (consts instanceof Array && consts.indexOf(k) > -1 && (!(stateProps instanceof Array) || stateProps.indexOf(k) == -1)) {
				if (k == 'children') {
					childrenFromConst = true;
				}
				if (data[k] != null && k != 'children') {
					renderCode += tabulation.render(wrap(k, 'key') + wrap('={') + getConstName(k) + wrap('}'), true);
				}
				continue;
			}
			if (k != 'children' && priority.indexOf(k) == -1 && (!(stateProps instanceof Array) || stateProps.indexOf(k) == -1)) {
				if (data[k] === true) {
					bools.push(k);
				} else if (data[k] || k == 'valid') {
					renderCode += tabulation.render(wrap(k, 'key') + wrap('=') + (typeof data[k] == 'string' ? wrap('"' + data[k] + '"', 'string') : wrap('{') + stringify(data[k]) + wrap('}')), true);
				}
			}
		}
		for (let item of bools) {
			renderCode += tabulation.render(wrap(item, 'key'), true);
		}
		let funcsContent = '';
		if (handlers instanceof Array) {
			for (let h of handlers) {
				let shift = 2;
				let a = '';
				let func = '';
				if (args instanceof Object && typeof args[h] == 'string') {
					args[h] = [args[h]];
				}
				if (args instanceof Object && args[h] instanceof Array) {
					a = args[h].join(', ');
				}
				if (funcs instanceof Object && funcs[h] && !uncontrolled) {
					let fn = funcs[h];
					if (typeof fn == 'function') {
						shift = 0;
						fn = fn.call(owner);
					}
					if (fn instanceof Array) {
						fn = fn.join(N);
					}
					func = fn;
				}				
				const ha = 'handle' + h.replace(/^on/, '');
				const ha2 = wrap('handle' + h.replace(/^on/, ''), 'name');
				renderCode += tabulation.render(wrap(h, 'key') + wrap('={') + wrap('this', 'args') + wrap('.') + ha + wrap('}'), true);
				funcsContent += N;
				funcsContent += tabulation.renderWith(ha2 + wrap(' = (') + wrap(a, 'args') + wrap(') ') + wrap('=>', 'keyword2') + wrap(' {'), 1, true);
				funcsContent += tabulation.renderWith(func, shift, true);
				funcsContent += tabulation.renderWith(wrap('}'), 1);
				funcsContent += N;
			}
			if (funcsContent) {
				funcsContent += N;
			}
		}
		let content = contentRenderer.call(owner);
		tabulation.reduce();
		const hasContent = content || data.children;
		if (content) {
			content += N;
		}
		if (hasContent && !unclosable) {
			renderCode += tabulation.render(wrap('&gt;'), true);
			tabulation.add();
			if (childrenFromState) {
				renderCode += tabulation.render(wrap('{') + 'children' + wrap('}'), true);
			} else if (childrenFromConst) {
				renderCode += tabulation.render(wrap('{') + getConstName('children') + wrap('}'), true);
			} else if (content) {
				renderCode += content;
			} else {
				renderCode += tabulation.render(data.children, true);
			}
			tabulation.reduce();
			renderCode += tabulation.render(wrap('&lt;/') + wrap(name, 'keyword2') + wrap('&gt;'), true);
		} else {
			renderCode += tabulation.render(wrap('/&gt;'), true);
		}
		if (wrapper) {
			if (typeof contentAfterRenderer == 'function') {
				const contentAfter = contentAfterRenderer();
				if (contentAfter) {
					renderCode += contentAfter + N;
				}
			}
			tabulation.reduce();
			if (typeof wrapper == 'string') {
				renderCode += tabulation.render(wrap('&lt;/') + wrap(wrapper, 'tag') + wrap('&gt;'), true);
			}
		}
		// ======================= end component


		tabulation.reduce();
		renderCode += tabulation.render(wrap(');'), true);
		tabulation.reduce();
		renderCode += tabulation.render(wrap('}'));

		let methodsCode = '';
		if (typeof renderMethods == 'function') {
			const methods = renderMethods();
			if (methods) {
				methodsCode += methods;
			}
		}
		if (!funcsContent) {
			renderCode = N + renderCode;
		}
		code += funcsContent + renderCode + methodsCode + N + wrap('}');
		code = code.replace(/\n{3,}/g, "\n\n");
		return (
			<pre className="decorated" dangerouslySetInnerHTML={{__html: code}}/>
		)
	}
}