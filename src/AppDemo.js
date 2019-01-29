import React from 'react';
import MainMenu from './MainMenu';
import {App as MainApp} from 'uiex/App';
import {AppPage} from 'uiex/AppPage';
import {MAP} from './map';

import './style.scss';

const INDEX_PAGE = 'ScrollContainer';

export default class AppDemo extends React.Component {
	render() {
		return (
			<div>
				<MainMenu onChange={this.handleChangeMenu} />				
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