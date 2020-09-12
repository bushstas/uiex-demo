import React from 'react';
// import MainMenu from './MainMenu';
import {App as MainApp} from 'uiex/App';
import {AppPage} from 'uiex/AppPage';
import {SideMenu} from 'uiex/SideMenu';
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

export default class App extends React.Component {
	renderMainMenu() {
		const Platform = getSources();
		return (
			<Platform.MainMenu
				onChange={this.handleChangeMenu}
			/>
		);
	}

	renderContent() {
		return Object.keys(MAP).map(item => {
			return (
				<AppPage
					key={item}
					name={item}
					path={item}
					component={MAP[item]}
					indexPage={item == INDEX_PAGE}
				/>
			)
		});
	}

	render() {
		return (
			<MainApp
				className="main-content"
				hashRouting
				sideMenu={this.renderMainMenu()}
				sideMenuWidth={265}
			>
				{this.renderContent()}
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
			</MainApp>
		)
	}
}