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

export const BOX_CONTENT = (
	<div>
		<h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		<h3>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
		Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
		<h3>1914 translation by H. Rackham</h3>
		But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
		<h3>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
		At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.			
	</div>
);

export const LOADER_CONTENT = (
	<div>
		<h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		<h3>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
		Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
	</div>
);

export const TOOLTIP_CONTENT = (
	<div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
	</div>
);

export const CHECKBOX_GROUP_OPTIONS = [true, false, "4", ["1", "3", "5"], "10.6.2"];
export const CHECKBOX_OPTIONS = [true, false];

export const RENDERER_CHILDREN = [
	{type: 'Button', props: {value: 'submit'}, handlers: {onClick: 'onButtonClick'}, children: [{type: 'Icon', props: {name: 'check'}}, 'Click me']},
	[
		{type: 'a', props: {href: '#'}, children: 'I am a link', handlers: {onMouseOver: 'onLinkMouseOver', onClick: 'onLinkClick'}},
		{type: 'br'},
		{type: 'a', props: {href: '#'}, children: 'I am a link too', handlers: {onMouseOver: 'onLinkMouseOver', onClick: 'onLinkClick'}}
	]
];

export const RENDERER_HANDLERS = [
	'onButtonClick', 'onLinkMouseOver', 'onLinkClick'
];