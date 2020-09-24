import React, {Fragment} from 'react';
// import MainMenu from './MainMenu';

import {App as MainApp} from 'uiex/App';
import {AppPage} from 'uiex/AppPage';
import {MAP} from './map';
import {getSources} from './platform';
import './style.scss';

const Page404 = (props) => {
	return 'Page not found';
};

const Home = (props) => {
	return 'Home page';
};

export default class App extends React.PureComponent {
	constructor(props) {
		super(props);
		this.sideMenu = this.renderMainMenu();
		this.pages = this.renderPages();
	}

	renderMainMenu() {
		const Platform = getSources();
		return (
			<Platform.MainMenu
				onChange={this.handleChangeMenu}
			/>
		);
	}

	renderPages() {
		const pages = Object.values(MAP).map(items => {
			return Object.keys(items).map(item => {
				return (
					<AppPage
						key={item}
						name={item}
						path={item}
						component={items[item]}
					/>
				);
			});
		});
		pages.push(
			<AppPage
				key="homePage"
				name="home"
				path="/"
				component={Home}
				indexPage
			/>,
			<AppPage
				key="404page"
				name="404page"
				path="404"
				component={Page404}
				notFoundPage
			/>
		)
		return pages;
	}

	render() {
		return (
			<MainApp
				className="main-content"
				hashRouting={false}
				sideMenu={this.sideMenu}
				sideMenuWidth={265}
			>
				{this.pages}
			</MainApp>
		)
	}
}