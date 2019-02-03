import React from 'react';
import Demo from '../../Demo';
import {App} from 'uiex/App';
import {Renderer} from 'uiex/Renderer'; 
import {AppPage} from 'uiex/AppPage';
import {AppLink} from 'uiex/AppLink';
import {previewRenderer} from '../../utils';

class NotFound extends React.Component {
	render() {
		return <div>Page is not found</div>
	}
}

export default class AppDemo extends Demo {
	static map = {
		checkboxes: {
			hashRouting: {
				description: 'Routing gets page names from the location hash'
			},
			hashPaths: {
				description: 'Routing gets page paths but not page names from the location hash'
			}
		},
		inputs: [
			{
				initialPage: {
					description: 'The app page name to open right after loading (String)',
					example: 'news'
				},
				indexPageName: {
					description: 'The name of an index page. The same as indexPage prop of a AppPage (String)',
					example: 'home'
				},
				loaderView: {
					description: 'The component that renders loader before app is mounted (Function)',
				},
				pageNotFoundView: {
					description: 'The component that renders 404 error page (Function)',
				},
				criticalErrorView: {
					description: 'The component that renders critical error page (Function)',
				}
			}
		]
	};
	static data = {
		hashRouting: false,
		indexPageName: 'home'
	};
	static excluded = ['vertical', 'block', 'valign', 'disabled', 'hidden', 'uncontrolled', 'skipped'];
	static handlers = ['onChangePage'];
	static stateProps = [];
	static funcs = {
		
	};
	static args = {
		onChangePage: ['pageNameOrIndex', 'params']
	};
	static componentName = 'App';
	static component = App;

	constructor(props) {
		super(props);
		this.state.formData = {email: 'bushstas@mail.ru'};
		this.state.objs = [
			{type: 'a', props: {href: 'https://mail.ru'}, children: 'мыло', handlers: {onClick: 'onLinkClick'}},
			{type: 'Button', props: {value: 'aaa'}, children: 'Click me', handlers: {onClick: 'onButtonClick'}}
		];
	}

	renderContent() {
		return 1111111111;
	}

	handleEmailChange = () => {
		alert(56)
	}

	handleFormChange = (formData) => {
		this.setState({formData});
	}

	handleButtonClick = (value, sourceObject) => {
		this.setState({formData: {name: 'name', email: 'email'}})
		// sourceObject.children = 'Fuck it';
		// this.setState({objs: [...this.state.objs]});
	}

	handleLinkClick = () => {
		alert('clicked on link')
	}

	renderPreviewContent = () => {
		const content = [
			<div key="0">
				<AppLink page="home">
					Home
				</AppLink>
				<AppLink page="catalog">
					Catalog
				</AppLink>
				<AppLink path="catalog/item">
					Catalog Item
				</AppLink>
				<AppLink page="contacts">
					Contacts
				</AppLink>
				<AppLink page="catalog_item" params={{id: 3}}>
					Item
				</AppLink>
				<AppLink page="fuck">
					Fuck
				</AppLink>
				<AppLink path="/contacts">
					Fuck
				</AppLink>
				<AppLink path="catalog/item/$id/" params={{id: 444}}>
					item #33
				</AppLink>
			</div>,
			<AppPage
				key="1"
				name="home"
				content="home"
				path="/"
			/>,
			<AppPage
				key="2"
				name="catalog"
				content="catalog"
				path="/catalog"
				exactPath
			/>,
			<AppPage
				key="3"
				name="contacts"
				content="contacts"
				path="contacts/"
			/>,
			<AppPage
				key="4"
				name="catalog_item"
				content="catalog item"
				path="catalog/item/$id"
			/>,
			<AppPage
				key="6"
				name="catalog_item_info"
				content="catalog item info"
				path="catalog/item/$id/info"
			/>,
			<AppPage
				key="5"
				component={NotFound}
				notFoundPage
			/>
		];
		return previewRenderer.render(content);
	}

}

class FuckThisCrap extends React.PureComponent {
	render() {
		return (			
			<Input name="address" />				
		);
	}
}