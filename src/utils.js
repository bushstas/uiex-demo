export const stringify = (value, addBraces = false) => {
	const type = typeof value;
	if (value == null) {
		if (value === undefined) {
			value = 'undefined';
		} else {
			value = 'null';
		}
	} else 
		if (typeof value == 'symbol') {
			value = value.toString().replace(/\(/, '("').replace(/\)$/, '")');
		} else if (typeof value == 'string') {
			value = '"' + value + '"';
		} else if (typeof value == 'boolean') {
			value = value.toString();
		} else if (value instanceof Array) {
			const items = [];
			for (let item of value) {
				items.push(stringify(item));
			}
			value = '[' + items.join(', ') + ']';
		} else if (typeof value == 'function') {
			value = '() => {}';
		} else if (value instanceof RegExp) {
			value = value.toString();
		} else if (value instanceof Object) {
			try {
				if (value instanceof Document) {
					value = 'document';
				} else {
					value = JSON.stringify(value);
				}
			} catch(e) {
				if (value instanceof Element) {
					value = 'Element';
				} else if (value instanceof Window) {
					value = 'window';
				}
			}
		}
		if (addBraces && type != 'string') {
			return '{' + value + '}';
		}
		return value;
}