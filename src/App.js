import React, {Fragment} from 'react';
// import MainMenu from './MainMenu';

import {App as MainApp} from 'uiex/App';
import {AppPage} from 'uiex/AppPage';
import {MAP} from './map';
import {getSources} from './platform';
import './style.scss';

const INDEX_PAGE = 'Button';

const Item = (props) => {
	return 'Item ' + props.params.id;
};

const Page404 = (props) => {
	return 'Page not found';
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

	renderPagesFromMap() {
		return Object.values(MAP).map(items => {
			return Object.keys(items).map(item => {
				return (
					<AppPage
						key={item}
						name={item}
						path={item}
						component={items[item]}
						indexPage={item == INDEX_PAGE}
					/>
				);
			});
		});
	}

	renderPages() {
		return (
			<Fragment>
				{this.renderPagesFromMap()}
				<AppPage
					name="item"
					path="item/$id"
					component={Item}
					exactPath
				/>
				<AppPage
					name="404"
					path="404"
					component={Page404}
					notFoundPage
				/>
			</Fragment>
		);
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