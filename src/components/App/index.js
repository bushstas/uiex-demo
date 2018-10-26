import React from 'react';
import Demo from '../../Demo';
import {App} from 'uiex/App';
import {AppPage} from 'uiex/AppPage';
import {AppLink} from 'uiex/AppLink';

export default class AppDemo extends Demo {
	static map = {
		checkboxes: {
			hashRouting: {
				description: ''
			}
		},
		inputs: [
			{
				page: {
					description: ''
				}
			}
		]
	};
	static data = {
		
	};
	static excluded = ['vertical', 'block', 'valign'];
	static handlers = [];
	static stateProps = [];
	static funcs = {
		
	};
	static args = {
		
	};
	static componentName = 'App';
	static component = App;

	renderContent() {
		return [
			<div key="0">
				<AppLink page="home">
					Home
				</AppLink>
				<AppLink page="catalog">
					Catalog
				</AppLink>
				<AppLink page="contacts">
					Contacts
				</AppLink>
			</div>,
			<AppPage key="1" name="home" content="home" indexPage />,
			<AppPage key="2" name="catalog" content="catalog" />,
			<AppPage key="3" name="contacts" content="contacts" />
		];
	}

	renderPreviewContent = () => {
		return previewRenderer.render(this.renderContent());
	}

}