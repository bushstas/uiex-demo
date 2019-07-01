import React from 'react';
// import MainMenu from './MainMenu';
import {App as MainApp} from 'uiex/App';
import {AppPage} from 'uiex/AppPage';
import {MAP} from './map';
import {getSources} from './platform';
import './style.scss';

const INDEX_PAGE = 'Button';

export default class App extends React.Component {
	render() {
		const Platform = getSources();
		return (
			<div>
				<Platform.MainMenu onChange={this.handleChangeMenu} />				
				<MainApp
					className="main-content"
					hashRouting
				>
					{this.renderContent()}
				</MainApp>
			</div>
		)
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
}