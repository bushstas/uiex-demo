import React from 'react';
import {App} from 'uiex/App';
import {AppPage} from 'uiex/AppPage';
import {AppLink} from 'uiex/AppLink';
import {ButtonGroup} from 'uiex/ButtonGroup';
import {MAP} from './map';

import './style.scss';

const INDEX_PAGE = 'ScrollContainer';

export default class AppDemo extends React.Component {
	render() {
		return (
			<div className="app-demo">
				<App
					indexPageName="about"
					hashRouting
				>
					{this.renderMenu()}
					{this.renderContent()}
				</App>
			</div>
		)
	}

	renderMenu() {
		return (
			<ButtonGroup className="app-demo-menu">
				<AppLink
					page="about"
					isButton
				>
					About
				</AppLink>
				<AppLink
					page="catalog"
					isButton
				>
					Catalog
				</AppLink>
				<AppLink
					page="prices"
					isButton
				>
					Prices
				</AppLink>
				<AppLink
					page="contacts"
					isButton
				>
					Contacts
				</AppLink>
			</ButtonGroup>
		)
	}

	renderContent() {
		return (
			<div className="app-demo-pages">
				<AppPage
					name="about"
					content="This is the About page"
				/>
				<AppPage
					name="catalog"
					content="This is the Catalog page"
				/>
				<AppPage
					name="prices"
					content="This is the Prices page"
				/>
				<AppPage
					name="contacts"
					content="This is the Contacts page"
				/>
			</div>
		)
	}
}