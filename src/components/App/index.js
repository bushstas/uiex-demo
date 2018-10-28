import React from 'react';
import Demo from '../../Demo';
import {App} from 'uiex/App';
import {Renderer} from 'uiex/Renderer'; 
import {AppPage} from 'uiex/AppPage';
import {AppLink} from 'uiex/AppLink';
import {previewRenderer} from '../../utils';

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

	constructor(props) {
		super(props);
		this.state.objs = [
			{type: 'a', props: {href: 'https://mail.ru'}, children: 'мыло', handlers: {onClick: 'onLinkClick'}},
			{type: 'Button', props: {value: 'aaa'}, children: 'Click me', handlers: {onClick: 'onButtonClick'}}
		];
	}

	renderContent() {
		return [
			<Renderer 
				key="aaa"
				onButtonClick={this.handleButtonClick}
				onLinkClick={this.handleLinkClick}
			>
				{this.state.objs}
			</Renderer>,
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

	handleButtonClick = (value, sourceObject) => {
		sourceObject.children = 'Fuck it';
		this.setState({objs: [...this.state.objs]});
	}

	handleLinkClick = () => {
		alert('clicked on link')
	}

	renderPreviewContent = () => {
		return previewRenderer.render(this.renderContent());
	}

}