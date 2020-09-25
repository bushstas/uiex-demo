import React from 'react';
import Demo from '../../Demo';
import {Renderer} from 'uiex/Renderer'; 
import {AppPage} from 'uiex/AppPage';
import {AppLink} from 'uiex/AppLink';
import {previewRenderer} from '../../utils';
import {getMenu, getContent} from '../../AppDemo';

class NotFound extends React.PureComponent {
	render() {
		return <div>Page is not found</div>
	}
}

export const DATA = {
	hashRouting: false,
	notFoundPage: NotFound
};

const App = () => {
	return (
		<iframe
			id="iframe"
			src="/"
			width="100%"
			height="500"
			frameBorder="no"
		/>
	);
}

export default class AppDemo extends Demo {
	static map = {
		checkboxes: {
			hashRouting: {
				description: 'Routing gets page names from the location hash'
			},
			loading: {
				description: 'Display loader or content'
			}
		},
		inputs: [
			{
				notFoundPage: {
					description: 'The component that represents 404 page (Function)',
					example: 'home'
				},
				loader: {
					description: 'The component that represents loader when loading property is true (Function)',
				}
			}
		]
	};
	static data = {...DATA};
	static excluded = ['vertical', 'block', 'valign', 'disabled', 'hidden', 'uncontrolled', 'skipped', 'width', 'height', 'float', 'align', 'theme', 'style'];
	static handlers = ['onInitPage', 'onChangePage', 'onReturnHome', 'onPageNotFound', 'onPushState', 'onReplaceState'];
	static stateProps = [];
	static funcs = {
		
	};
	static args = {
		onInitPage: ['pageData'],
		onChangePage: ['pageData'],
		onPageNotFound: ['pageData'],
		onPushState: ['path'],
		onReplaceState: ['path']
	};
	static componentName = 'App';
	static component = App;
	static info = 'App is a container for pages (routes), gives you a routing system';

    componentDidMount() {
    	window.onInitDemoPage = (page) => {
			this.getHandler('onInitPage')(page);
		}
		window.onChangeDemoPage = (page) => {
			this.getHandler('onChangePage')(page);
		}
		window.onDemoPageNotFound = (page) => {
			this.getHandler('onPageNotFound')(page);
		}
		window.onDemoPushState = (path) => {
			this.getHandler('onPushState')(path);
		}
		window.onDemoReplaceState = (path) => {
			this.getHandler('onReplaceState')(path);
		}
		window.onDemoReturnHome = () => {
			this.getHandler('onReturnHome')();
		}
		
		this.iframe = document.querySelector('#iframe');
	}

	componentDidUpdate() {
		iframe.contentWindow.onChangeData(this.state.data);
	}

	componentWillUnmount() {
		window.onInitDemoPage = undefined;
		window.onChangeDemoPage = undefined;
		window.onDemoPageNotFound = undefined;
		window.onDemoPushState = undefined;
		window.onDemoReplaceState = undefined;
		window.onDemoReturnHome = undefined;
		document.querySelector('#iframe').onload = null;
	}

	renderPreviewContent = () => {
		const content = [
			getMenu(),
			<br />,
			getContent()
		];
		return previewRenderer.render(content);
	}

}