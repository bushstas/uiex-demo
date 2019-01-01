import React from 'react';
import Demo from '../../Demo';
import {Form} from 'uiex/Form';
import {getSetState} from '../../utils';

export default class FormDemo extends Demo {
	static map = {
		inputs: [
			{
				name: {
					description: 'A name of the form (String)'
				},
				name1: {
					description: 'A name of the form (String)'
				},
				name2: {
					description: 'A name of the form (String)'
				},
				name3: {
					description: 'A name of the form (String)'
				}
			}
		]
	};
	static data = {
		width: 500,
		name: "name"
	};
	static excluded = ['vertical', 'block', 'valign'];
	static handlers = ['onChange'];
	static stateProps = ['data'];
	static funcs = {
		onChange: getSetState('data')
	};
	static args = {
		onChange: ['data', 'fieldName', 'value']
	};
	static changeState = {
		onChange: 'data'
	};
	static componentName = 'Form';
	static component = Form;
}