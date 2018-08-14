import React from 'react';

export const COLORS = ['ff1a1a', 'ff531a', 'ff8c1a', 'ffc61a', 'ffff1a', 'c6ff1a', '8cff1a', '53ff1a', '1aff1a', '1aff53', '1aff8c', '1affc6', '1affff', '1ac6ff', '1a8cff', '1a53ff', '1a1aff', '531aff', '8c1aff', 'b31aff', 'c61aff', 'ff1aff', 'ff1ac6', 'ff1a8c'];

export const MEASURES = [
	{id: 'px', name: 'px'},
	{id: '%', name: '%'}
];

const jsonPreviewInfoPromise = (
	<pre>
		new Promise((resolve, reject) => {"{\n\t"}const options = ['loaded', 'with', 'promise'];
		{"\n\t"}setTimeout(() => {"{\n\t\t"}resolve(options);{"\n\t}"}, 5000);
		{"\n})"}
	</pre>
);

export const SELECT_OPTIONS_PROMISE_INSTANCE = new Promise((resolve) => {
	const options = ['loaded', 'with', 'promise'];
	setTimeout(() => resolve(options), 5000);
});

const jsonPreviewInfoFunction = (
	<pre>
		() => {"{\n\t"}return ['formed', 'with', 'function'];{"\n}"}
	</pre>
);

const jsonPreviewFunction = () => {
	return ['formed', 'with', 'function'];
};

export const SELECT_OPTIONS_OBJECT = {green: 'Green color', brown: 'Brown color', yellow: 'Yellow color', blue: 'Blue color', red: 'Red color', black: 'Black color', white: 'White color'};
export const SELECT_OPTIONS_OBJECTS_ARRAY = [{title: 'Yellow', value: 'yellow', icon: 'face', withBottomDelimiter: true}, {title: 'Green', value: 'green', icon: 'grade'}, {title: 'Pink', value: 'pink', icon: 'explore'}, {title: 'Purple', value: 'purple', icon: 'favorite'}, {title: 'Brown', value: 'brown', icon: 'train', withTopDelimiter: true}];
export const SELECT_OPTIONS_ARRAY = ['black', 'blue', 'orange', 'red'];
export const SELECT_OPTIONS_PROMISE = {jsonPreviewInfo: jsonPreviewInfoPromise, value: SELECT_OPTIONS_PROMISE_INSTANCE};
export const SELECT_OPTIONS_FUNCTION = {jsonPreviewInfo: jsonPreviewInfoFunction, value: jsonPreviewFunction};