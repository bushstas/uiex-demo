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
			value = value.toString().replace(/\(/, '("').replace(/\)$/, '")');
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
			value = wrap(value.toString(), 'string');
		} else if (value instanceof Object) {
			try {
				if (value instanceof Document) {
					value = wrap('document', 'spec');
				} else {
					value = JSON.stringify(value);
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

export const wrap = (text, className = 'symbol', tagName = 'span') => {
	return '<' + tagName + ' class="' + className + '">' + text + '</' + tagName + '>';
}

export const getSetState = (name) => {
	return wrap('this', 'args') + wrap('.') + 'setState' + wrap('({') + name + wrap('});');
}