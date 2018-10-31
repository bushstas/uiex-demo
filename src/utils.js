export const stringify = (value, addBraces = false, isJSXProp = false) => {
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
				value = wrap('"' + value + '"', 'string');	
			} else {
				value = wrap('\'' + value + '\'', 'string');
			}
		} else if (typeof value == 'boolean') {
			value = wrap(value.toString(), 'number');
		} else if (value instanceof Array) {
			value = stringifyArray(value);
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

const stringifyArray = (arr) => {
	let code = wrap('[') + "\n";
	tabulation.add();
	for (let i = 0; i < arr.length; i++) {
		code += tabulation.render(stringify(arr[i]));
		if (i < arr.length - 1) {
			code += wrap(',');
		}
		code += "\n";
	}
	tabulation.reduce();
	code += tabulation.render(wrap(']'));
	return code;
}

export const wrap = (text, className = 'symbol', tagName = 'span') => {
	return `<${tagName} class="${className}">${text}</${tagName}>`;
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
	}
	str += wrap('});');
	return  str;
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
	render(content, excluded = []) {
		this.excluded = excluded;
		this.code = '';
		this.renderRectElement(content);
		return this.code.replace(/^[\r\n]+|[\r\n]+$/g, '');
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
				if (typeof type == 'function' || (typeof type == 'string' && /^[A-Z]/.test(type[0]))) {
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

	renderItem(content, name, isComponent = false) {
		this.stringRendered = false;
		const {props} = content;
		this.code += tabulation.render(wrap('&lt;') + wrap(name, isComponent ? 'keyword2' : 'tag'));
		let strProps = [];
		const {previewData, children} = props;
		for (let k in props) {
			if (k !== 'previewData' && k !== 'children') {
				if (props[k] != null && this.excluded.indexOf(k) == -1) {
					let line = wrap(k, 'key') + wrap('=');			
					if (typeof props[k] == 'function') {
						if (previewData instanceof Object && previewData[k]) {
							line += wrap('{') + wrap('this', 'args') + wrap('.') + previewData[k] + wrap('}');
						} else {
							line += wrap('{() ') + wrap('=>', 'keyword2') + wrap(' {}}}');
						}
					} else {
						line += stringify(props[k], true, true);
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
			this.code += (isComponent && !children ? ' ' : '') + wrap((!children ? '/' : '') + '&gt;') + "\n";
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
			this.code += tabulation.render(wrap('&lt;/') + wrap(name, isComponent ? 'keyword2' : 'tag') + wrap('&gt;'), true);
		}
		this.stringRendered = false;
	}
}

export const previewRenderer = new PreviewRenderer();