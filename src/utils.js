export const insertItems = (arr, items, index) => {
	if (!(items instanceof Array)) {
		items = [items];
	}
	const arr1 = arr.slice(0, index);
	const arr2 = arr.slice(index);
	return [...arr1, ...items, ...arr2];
};

export const stringify = (value, addBraces = false, isJSXProp = false, nowrapArrays = false) => {
	const type = typeof value;
	if (value == null) {
		if (value === undefined) {
			value = wrap('undefined', 'number');
		} else {
			value = wrap('null', 'number');
		}
	} else 
		if (typeof value == 'symbol') {
			value = value.toString();
			const parts = value.split(/\(|\)/);
			value = wrap(parts[0], 'keyword2') + wrap('(') + stringify(parts[1]) + wrap(')');
		} else if (typeof value == 'number') {
			value = wrap(value, 'number');
		} else if (typeof value == 'string') {
			if (isJSXProp) {
				value = wrapString(value);
			} else {
				value = wrapString(value, true);
			}
		} else if (typeof value == 'boolean') {
			value = wrap(value.toString(), 'number');
		} else if (value instanceof Array) {
			value = stringifyArray(value, nowrapArrays);
		} else if (typeof value == 'function') {
			value = wrap('() ') + wrap('=>', 'keyword2') + wrap(' {}');
		} else if (value instanceof RegExp) {		
			value = value.toString()
			const parts = value.split('/');
			let flags = '';
			if (parts[parts.length - 1]) {
				flags = wrap(parts[parts.length - 1], 'keyword');
				parts[parts.length - 1] = '';
				value = parts.join('/');
			}			
			value = wrap(value, 'string') + flags;		
		} else if (value instanceof Object) {
			try {
				if (value instanceof Document) {
					value = wrap('document', 'spec');
				} else {
					value = stringifyObject(value);
				}
			} catch(e) {
				if (value instanceof Element) {
					value = wrap('Element', 'keyword2');
				} else if (value instanceof Window) {
					value = wrap('window', 'spec');
				}
			}
		}
		if (addBraces && type != 'string') {
			return wrap('{') + value + wrap('}');
		}
		return value;
}

const stringifyObject = (obj) => {
	let code = wrap('{') + "\n";
	tabulation.add();
	const keys = Object.keys(obj);
	for (let i = 0; i < keys.length; i++) {
		code += tabulation.render(wrap(keys[i], 'key') + wrap(': ') + stringify(obj[keys[i]]));
		if (i < keys.length - 1) {
			code += wrap(',');
		}
		code += "\n";
	}
	tabulation.reduce();
	code += tabulation.render(wrap('}'));
	return code;
}

const stringifyArray = (arr, nowrap = false) => {
	let code = wrap('[') + (!nowrap ? "\n" : '');
	if (!nowrap) {
		tabulation.add();
	}
	for (let i = 0; i < arr.length; i++) {
		if (!nowrap) {
			code += tabulation.render(stringify(arr[i]));
		} else {
			code += stringify(arr[i]);
		}
		if (i < arr.length - 1) {
			code += wrap(',');
			if (nowrap) {
				code += ' ';
			}
		}
		if (!nowrap) {
			code += "\n";		
		}
	}
	if (!nowrap) {
		tabulation.reduce();
	}
	if (!nowrap) {
		code += tabulation.render(wrap(']'));
	} else {
		code += wrap(']');
	}
	return code;
}

const getFuncArgs = (args) => {
	if (!(args instanceof Array)) {
		args = [args];
	}
	return args.map(a => a ? wrap(a, 'args') : '').join(wrap(', '));
};

export const renderer = {
	method: (name, args, renderContent, singleLine = false) => {
		args = getFuncArgs(args);
		let code = tabulation.render(wrap(name, 'name') + wrap(` = (${args}) `) + wrap('=>', 'keyword2') + wrap(' {'), 1);
		tabulation.add();
		if (singleLine) {
			code += tabulation.render(renderContent(), 1);
		} else {
			code += renderContent();
		}
		tabulation.reduce();
		code += tabulation.render(wrap('}'), 2);
		return code;
	},

	return: (renderContent, element = false, withNewLine = false) => {
		if (element) {
			let code = tabulation.render(wrap('return', 'keyword') + wrap(' ('), 1);
			tabulation.add();
			code += tabulation.render(renderContent());
			tabulation.reduce();
			code += tabulation.render(wrap(');'), withNewLine ? 1 : 0);
			return code;
		}
		return tabulation.render(wrap('return', 'keyword')) + ' ' + renderContent() + (withNewLine ? "\n" : '');
	},

	map: (name, renderContent, withNewLine = false) => {
		let code = name + wrap('.') + wrap('map', 'keyword2') + wrap('(');
		code += renderContent();
		code += tabulation.render(wrap(');'), withNewLine ? 1 : 0);
		return code;
	},

	func: (args) => {
		const single = args instanceof Array ? args.length == 1 : true;
		args = getFuncArgs(args);
		const empty = !args;
		let code = (!single || empty ? wrap('(') : '') + args + (!single || empty ? wrap(')') : '') +
			wrap(' =>', 'keyword2') + wrap(' {');
		tabulation.add();
		tabulation.reduce();
		code += tabulation.render(wrap('}'));
		return code;
	}
}

export const wrap = (text, className = 'symbol', tagName = 'span') => {
	return `<${tagName} class="${className}">${text}</${tagName}>`;
}

export const wrapString = (text, singleQuotes = false) => {
	const quote = singleQuotes ? "'" : '"';
	return wrap(quote) + wrap(text, 'string') + wrap(quote);
}

export const getSetState = (name, value = null) => {
	let cn = 'none';
	if (value !== null) {
		value = wrap(': ') + stringify(value);
		cn = 'key';
	} else {
		value = '';
	}
	let str = wrap('this', 'args') + wrap('.') + 'setState' + wrap('({');
	if (typeof name == 'string') {
		str += wrap(name, cn) + value;
	} else if (name instanceof Array) {
		const names = [];
		for (let item of name) {
			names.push(wrap(item, cn));
		}
		str += names.join(wrap(', '));
	} else if (name instanceof Object) {
		const keys = Object.keys(name);
		const isMultiline = keys.length > 1;
		if (isMultiline) {
			str += "\n\t\t\t";
		}
		const names = [];
		for (let k in name) {
			if (name[k] === `$${k}`) {
				names.push(k);
			} else {
				names.push(wrap(k, cn) + wrap(': ') + stringify(name[k]));
			}
		}
		str += names.join(wrap(isMultiline ? ",\n\t\t\t" : ', '));
		if (isMultiline) {
			str += "\n\t\t";
		}
	}
	str += wrap('});');
	return  str;
}

export const getConstName = (name) => {
	return name.split(/(?=[A-Z])/).join('_').toUpperCase();
}

export const getRenderName = (name) => {
	return `render${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

class Tabulation {
	constructor() {
		this.tabs = ['', "\t", "\t\t", "\t\t\t", "\t\t\t\t", "\t\t\t\t\t", "\t\t\t\t\t\t", "\t\t\t\t\t\t\t", "\t\t\t\t\t\t\t\t", "\t\t\t\t\t\t\t\t\t", "\t\t\t\t\t\t\t\t\t\t"];
		this.ns = ['', "\n", "\n\n", "\n\n\n"];
	}
	init() {
		this.level = 0;
	}
	add(q = 1) {
		this.level += q;
	}
	reduce(q = 1) {
		this.level -= q;
	}
	get() {
		return this.tabs[this.level];	
	}
	set(level) {
		this.prevLevel = this.level;
		this.level = level;
	}
	reset() {
		this.level = this.prevLevel;
	}
	render(str, withN = false) {
		if (typeof str == 'number') {
			str = str.toString();
		}
		if (typeof str != 'string') {
			str = '';
		}
		if (withN === true) {
			withN = 1;
		}
		return this.get() + str + (withN ? this.ns[withN] : '');
	}
	renderWith(str, q, withN = false) {
		let level = this.level;
		this.level = q;
		str = this.render(str, withN);
		this.level = level;
		return str;
	}
	getCount() {
		return this.level;
	}
}

export const tabulation = new Tabulation();

class PreviewRenderer {
	getConsts() {
		return this.consts;
	}

	render(content, excluded = [], withConsts = false) {
		if (!(excluded instanceof Array)) {
			excluded = [];
		}
		this.excluded = excluded;
		this.withConsts = withConsts;
		this.consts = [];
		this.code = '';
		this.renderRectElement(content);
		return this.code.replace(/^[\r\n]+|[\r\n]+$/g, '');
	}

	renderFew(...contents) {
		const content = contents.map(c => this.render(c));
		return content.join("\n");
	}

	renderRectElement(content, next = null) {
		if (content instanceof Array) {
			for (let item of content) {
				this.renderRectElement(item);
			}
			return;
		}
		if (content instanceof Object) {
			const {type} = content;
			if (type) {
				if (typeof type == 'symbol' && type.toString() === 'Symbol(react.fragment)') {
					this.renderFragment(content);
				} else if (typeof type == 'function' || (typeof type == 'string' && /^[A-Z]/.test(type[0]))) {
					this.renderComponent(content);
				} else {
					this.renderElement(content);
				}
			}
			return;
		}		
		this.renderString(content, next);
	}

	renderString(content, next) {
		if (!this.stringRendered) {
			this.code += tabulation.render(content, next == null || next instanceof Object);
		} else {
			this.code += content + (next == null || next instanceof Object ? "\n" : '');
		}
		this.stringRendered = true;
	}

	renderElement(content) {
		this.renderItem(content, content.type);
	}

	renderComponent(content) {
		this.renderItem(content, content.type.name, true);
	}

	renderFragment(content) {
		this.renderItem(content, 'Fragment', 'fragment');
	}

	renderItem(content, name, isComponent = false) {
		this.stringRendered = false;
		const {props} = content;
		let className = isComponent ? 'keyword2' : 'tag';
		if (isComponent === 'fragment') {
			className = 'fragment';
		}
		this.code += tabulation.render(wrap('&lt;') + wrap(name, className));
		let strProps = [];
		const {previewData, children} = props;
		for (let k in props) {
			if (k !== 'previewData' && k !== 'children' && !/TextValue$/.test(k)) {
				const isInConsts = this.withConsts instanceof Object && this.withConsts[k];
				const isProp = props[k] != null || isInConsts;				
				if (isProp && this.excluded.indexOf(k) == -1) {					
					let line = wrap(k, 'key');
					if (isInConsts) {
						line += wrap('=') + wrap('{') + this.withConsts[k] + wrap('}');
						strProps.push(line);
						continue;
					}
					if (typeof props[k] == 'boolean') {
						strProps.push(line);
						continue;
					}
					line += wrap('=');
					if (typeof props[k] == 'function') {
						if (props[`${k}TextValue`]) {
							line += wrap('{') + props[`${k}TextValue`] + wrap('}');
						} else if (previewData instanceof Object && previewData[k]) {
							line += wrap('{') + wrap('this', 'args') + wrap('.') + previewData[k] + wrap('}');
						} else {
							line += wrap('{() ') + wrap('=>', 'keyword2') + wrap(' {}}}');
						}
					} else {
						if (props[k] instanceof Object && this.withConsts) {
							tabulation.set(0);
							const value = stringify(props[k], true, true, !this.withConsts);
							tabulation.reset();
							let constName = getConstName(k);
							if (isComponent) {
								constName = `${getConstName(name)}_${constName}`
							}
							this.consts.push(wrap('const ', 'keyword2') + constName + wrap(' = ') + value + wrap(';'));
							line += wrap('{') + constName + wrap('}');
						} else {
							line += stringify(props[k], true, true, !this.withConsts);
						}
					}
					strProps.push(line);
				}
			}
		}
		if (strProps.length > 0) {
			if (strProps. length == 1) {
				this.code += ' ' + strProps[0];
			} else {
				tabulation.add();
				this.code += "\n";
				for (let item of strProps) {
					this.code += tabulation.render(item, true);
				}
				tabulation.reduce();
			}
		}
		if (strProps.length > 1) {
			this.code += tabulation.render(wrap((!children ? '/' : '') + '&gt;'), true);
		} else {
			this.code += (!children ? ' ' : '') + wrap((!children ? '/' : '') + '&gt;') + "\n";
		}
		if (children) {
			tabulation.add();
			if (children instanceof Array) {
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					this.renderRectElement(child, children[i + 1]);
				}
			} else {
				this.renderRectElement(children);
			}
			tabulation.reduce();
			this.code += tabulation.render(wrap('&lt;/') + wrap(name, className) + wrap('&gt;'), true);
		}
		this.stringRendered = false;
	}
}

export const previewRenderer = new PreviewRenderer();