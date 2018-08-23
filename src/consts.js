import React from 'react';
import {wrap} from './utils';

export const COLORS = ['ff1a1a', 'ff531a', 'ff8c1a', 'ffc61a', 'ffff1a', 'c6ff1a', '8cff1a', '53ff1a', '1aff1a', '1aff53', '1aff8c', '1affc6', '1affff', '1ac6ff', '1a8cff', '1a53ff', '1a1aff', '531aff', '8c1aff', 'b31aff', 'c61aff', 'ff1aff', 'ff1ac6', 'ff1a8c'];
export const COLORS2 = ['2f0727', '854277', 'c192b8', 'f1d0ee', 'da81af', 'e04386', 'fd82b1', 'ffbbd7', 'ffd0e6', 'feeff4', '8a9bab', 'c9d1de', 'f0dff2', 'dbacdd', 'c44a9a', '9d382b', 'cc8593', 'ebccd4', 'e3d9df', '4e4051', '968089', 'e3c3d4', 'e6ded4', 'c174f0'];

export const MEASURES = ['px', '%'];
export const MAX_WIDTH = 1000;
export const MAX_HEIGHT = 200;

export const PROMISE_TEXT_HTML = wrap('new', 'keyword') + wrap(' Promise', 'keyword2') + wrap('((') + wrap('resolve, reject', 'args') + wrap(')') + wrap(' =>', 'keyword2') + wrap(' {') + "\n\t" + wrap('const', 'keyword2') + ' options ' + wrap("= [") + wrap("'loaded'", 'string') + wrap(',') + wrap(" 'with'", 'string') + wrap(',') + wrap(" 'promise'", 'string') + wrap('];') + "\n\t" + wrap('setTimeout', 'spec') + wrap('(()') + wrap(' =>', 'keyword2') + wrap(' {') + "\n\t\t" + wrap('resolve', 'function') + wrap('(') + 'options' + wrap(');') + "\n\t" + wrap('}, ') + wrap(5000, 'number') + wrap(');') + "\n" + wrap('})');
export const PROMISE_TEXT = "new Promise((resolve, reject) => {\n\tconst options = ['loaded', 'with', 'promise'];\n\tsetTimeout(() => {\n\t\tresolve(options);\n\t}, 5000);\n})";
export const FUNCTION_TEXT_HTML = wrap('()') + wrap(' => ', 'keyword2') + wrap('{') + "\n\t" + wrap('return ', 'keyword') + wrap('[') + wrap("'formed'", 'string') + wrap(', ') + wrap("'with'", 'string') + wrap(', ') + wrap("'function'", 'string') + wrap('];') + "\n" + wrap('}');
export const FUNCTION_TEXT = "() => {\n\treturn ['formed', 'with', 'function'];\n}";

const jsonPreviewInfoPromise = (
	<pre>
		{PROMISE_TEXT}
	</pre>
);

export const PROMISE_OPTIONS = ['loaded', 'with', 'promise'];

export const SELECT_OPTIONS_PROMISE_INSTANCE = new Promise((resolve) => {
	setTimeout(() => resolve(PROMISE_OPTIONS), 5000);
});

const jsonPreviewInfoFunction = (
	<pre>
		{FUNCTION_TEXT}
	</pre>
);

export const FUNCTION_OPTIONS = ['formed', 'with', 'function'];

const jsonPreviewFunction = () => {
	return FUNCTION_OPTIONS;
};

export const SELECT_OPTIONS_OBJECT = {green: 'Green color', brown: 'Brown color', yellow: 'Yellow color', blue: 'Blue color', red: 'Red color', black: 'Black color', white: 'White color'};
export const SELECT_OPTIONS_OBJECTS_ARRAY = [{title: 'Yellow', value: 'yellow', icon: 'face', withBottomDelimiter: true, single: true}, {title: 'Green', value: 'green', icon: 'grade'}, {title: 'Pink', value: 'pink', icon: 'explore'}, {title: 'Purple', value: 'purple', icon: 'favorite'}, {title: 'Brown', value: 'brown', icon: 'train', withTopDelimiter: true, single: true}];
export const SELECT_OPTIONS_ARRAY = ['black', 'blue', 'orange', 'red'];
export const SELECT_OPTIONS_PROMISE = {jsonPreviewInfo: jsonPreviewInfoPromise, value: SELECT_OPTIONS_PROMISE_INSTANCE};
export const SELECT_OPTIONS_FUNCTION = {jsonPreviewInfo: jsonPreviewInfoFunction, value: jsonPreviewFunction};


export const INPUT_COMPONENT_EXCLUDED = ['vertical', 'valign', 'children'];