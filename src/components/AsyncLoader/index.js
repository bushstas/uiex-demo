import React from 'react';
import Demo from '../../Demo';
import {AsyncLoader} from 'uiex/AsyncLoader';

const A = (props) => {
	return '111111';
}

const URLS = ['/api/get.php', ['/api/get.php', '/api/post.php']];
const METHODS = [
	'GET', 'POST', 'PUT', 'DELETE', ['GET', 'POST']
];
const DATA_NAMES = ['data', ['data', 'someData']];
const SUCCESS_NAMES = ['success', ['success', 'ok']];

export default class AsyncLoaderDemo extends Demo {
	static map = {
		inputs: [
			{
				url: {
					description: 'Request url(s) (String | String[])',
					type: 'object',
					options: URLS
				},
				method: {
					description: 'Request method(s) (String | String[])',
					type: 'object',
					options: METHODS
				},
				dataFieldName: {
					description: 'Name(s) of field(s) which contains data to extract (String | String[])',
					type: 'object',
					options: DATA_NAMES
				},
				successFlagName: {
					description: 'Name(s) of field(s) which shows that the request was successful  (String | String[])',
					type: 'object',
					options: SUCCESS_NAMES
				}
			}
		]
	};
	static data = {
		renderLoader: () => 'Loader...',
		url: '/api/get.php',
		method: 'GET',
		passDataAs: 'loadedShit',
		dataFieldName: 'data'
	};
	static excluded = ['vertical', 'valign', 'align', 'block', 'disabled', 'uncontrolled'];
	static componentName = 'AsyncLoader';
	static component = AsyncLoader;
	static withoutComponentMapper = true;

	renderContent() {
        return (
        	<A name="shit" age="22"/>
        );
    }
}