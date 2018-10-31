import React from 'react';
import Demo from '../../Demo';
import {Renderer, addComponents} from 'uiex/Renderer';
import {Icon} from 'uiex/Icon';
import {Button} from 'uiex/Button';
import {RENDERER_CHILDREN, RENDERER_HANDLERS} from '../../consts';
import {tabulation, wrap} from '../../utils';

addComponents(Button, Icon);

export default class RendererDemo extends Demo {
	static map = {
		inputs: [
			{
				children: {
					description: 'React children (Array of objects | Object)',
					type: 'object',
					options: RENDERER_CHILDREN,
					stretched: true,
					empty: false
				}
			}
		]
	};
	static data = {
		children: RENDERER_CHILDREN[0]
	};
	static handlers = [...RENDERER_HANDLERS];
	static stateProps = ['children'];
	static funcs = {
		onButtonClick: function() {
			let code = tabulation.renderWith(wrap('// here you have to modify source object to change something', 'comment'), 2, true);
			code += tabulation.renderWith(wrap('// rendered component will have prop "sourceObject"', 'comment'), 2, true);
			code += tabulation.renderWith('sourceObject' + wrap('.') + 'children' + wrap('[') + wrap('0', 'number') + wrap('].') + 'props' + wrap('.') + 'name' + wrap(' = ') + wrap("'some'", 'string') + wrap(';'), 2, true);
			code += tabulation.renderWith('sourceObject' + wrap('.') + 'children' + wrap('[') + wrap('1', 'number') + wrap('] = ') + wrap("'I am clicked'", 'string') + wrap(';'), 2, true);
			code += tabulation.renderWith(wrap('this', 'args') + wrap('.') + 'setState' + wrap('({') + wrap('children', 'key') + wrap(': {') + wrap('...', 'keyword') + wrap('this', 'args') + wrap('.') + 'state' + wrap('.') + 'children' + wrap('}});'), 2);
			return code;
		}
	};
	static args = {
		onButtonClick: ['value', 'sourceObject'],
		onLinkMouseOver: 'event',
		onLinkClick: 'event'
	};
	static consts = ['children'];
	static componentName = 'Renderer';
	static component = Renderer;
	static withoutComponentMapper = true;
	static additionalImport = ['addComponent', 'addComponents'];
	static imports = ['Button', 'Icon'];
	static commentBeforeRenderReturn = 'You can have whatever handlers you need with any names';
	static handlersNote = 'Renderer can have any handlers you need (these three for example)';
	static info = 'Renderer can render content from object, so you can get your content from a server';

	renderContentBeforeClass() {
		let code = tabulation.render(wrap('// you can add any class you need to render', 'comment'), true);
		code += tabulation.render(wrap('addComponent', 'function') + wrap('(') + wrap("'Button'", 'string') + wrap(', ') + 'Button' + wrap(');'), true);
		code += tabulation.render(wrap('addComponent', 'function') + wrap('(') + wrap("'Icon'", 'string') + wrap(', ') + 'Icon' + wrap(');'), 2);
		code += tabulation.render(wrap('// or using component\'s display names', 'comment'), true);
		code += tabulation.render(wrap('addComponents', 'function') + wrap('(') + 'Button' + wrap(', ') + 'Icon' + wrap(');'));
		return code;
	}
}