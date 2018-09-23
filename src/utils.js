export const stringify = (value, addBraces = false) => {
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
			value = wrap('"' + value + '"', 'string');
		} else if (typeof value == 'boolean') {
			value = wrap(value.toString(), 'number');
		} else if (value instanceof Array) {
			const items = [];
			for (let item of value) {
				items.push(stringify(item));
			}
			value = wrap('[') + items.join(wrap(', ')) + wrap(']');
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
	const items = [];
	for (let k in obj) {
		items.push(wrap(k, 'key') + wrap(': ') + stringify(obj[k]));
	}
	return wrap('{') + items.join(wrap(', '))  + wrap('}');
}

export const wrap = (text, className = 'symbol', tagName = 'span') => {
	return '<' + tagName + ' class="' + className + '">' + text + '</' + tagName + '>';
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