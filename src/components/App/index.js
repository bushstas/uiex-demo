import React from 'react';
import Demo from '../../Demo';
import {Renderer} from 'uiex/Renderer'; 
import {AppPage} from 'uiex/AppPage';
import {AppLink} from 'uiex/AppLink';
import {previewRenderer} from '../../utils';
import {getMenu, getContent} from '../../AppDemo';

class NotFound extends React.Component {
	render() {
		return <div>Page is not found</div>
	}
}

function App() {
	return (
		<iframe
			src="/"
			width="100%"
			height="500"
			frameBorder="no"
		/>
	)
}

export default class AppDemo extends Demo {
	static map = {
		checkboxes: {
			hashRouting: {
				description: 'Routing gets page names from the location hash'
			},
			hashPaths: {
				description: 'Routing gets page paths but not page names from the location hash. Needs "hashRouting" to be true'
			}
		},
		inputs: [
			{
				initialPage: {
					description: 'The app page name to open right after loading (String)',
					example: 'news'
				},
				indexPageName: {
					description: 'The name of an index page. An alternative to "indexPage" prop of a AppPage (String)',
					example: 'home'
				},
				loaderView: {
					description: 'The component that renders loader before app is mounted (Function)',
				},
				pageNotFoundView: {
					description: 'The component that renders 404 error page. An alternative to "notFoundPage" prop of a AppPage (Function)',
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
	static excluded = ['vertical', 'block', 'valign', 'disabled', 'hidden', 'uncontrolled', 'skipped', 'width', 'height', 'float', 'align', 'theme', 'style'];
	static handlers = ['onInitPage', 'onChangePage', 'onPageNotFound'];
	static stateProps = [];
	static funcs = {
		
	};
	static args = {
		onInitPage: ['pageNameOrIndex', 'path', 'params'],
		onChangePage: ['pageNameOrIndex', 'path', 'params'],
		onPageNotFound: ['pageName', 'path']
	};
	static componentName = 'App';
	static component = App;
	static info = 'App is a container for pages (routes), gives you a routing system';

    componentDidMount() {
		window.onChangeDemoPage = (page, path, params) => {
			this.fire('onChangePage', page, path, params);
		}
		window.onDemoPageNotFound = (page, path) => {
			this.fire('onPageNotFound', page, path);
		}
		this.fire('onInitPage');
	}

	componentWillUnmount() {
		window.onChangeDemoPage = undefined;
		window.onDemoPageNotFound = undefined;
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