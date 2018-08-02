export const stringify = (value, addBraces = false) => {
	const type = typeof value;
		if (typeof value == 'string') {
			value = '"' + value + '"';
		}
		if (typeof value == 'boolean') {
			value = value.toString();
		}
		if (value instanceof Array) {
			const items = [];
			for (let item of value) {
				items.push(stringify(item));
			}
			value = '[' + items.join(', ') + ']';
		}
		if (addBraces && type != 'string') {
			return '{' + value + '}';
		}
		return value;
}