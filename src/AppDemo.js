import React from 'react';
import {App, navigateToPath} from 'uiex/App';
import {AppPage} from 'uiex/AppPage';
import {AppLink} from 'uiex/AppLink';
import {ButtonGroup} from 'uiex/ButtonGroup';
import {Input} from 'uiex/Input';
import {TextBlock} from 'uiex/TextBlock';
import {MAP} from './map';

import './style.scss';

const INDEX_PAGE = 'ScrollContainer';
const SITE = 'site.com';

export const getMenu = () => (
	<ButtonGroup className="app-demo-menu">
		<AppLink
			page="home"
			isButton
		>
			Home
		</AppLink>
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
		<AppLink
			page="notExisted"
			isButton
		>
			Not existed
		</AppLink>
	</ButtonGroup>
);


export const getContent = () => [
	<AppPage
		key="home"
		name="home"
		path="/"
		component={() => "This is the Home page"}
		componentTextValue="HomePage"
	/>,
	<AppPage
		key="about"
		name="about"
		path="about"
		component={() => "This is the About page"}
		componentTextValue="AboutPage"
	/>,
	<AppPage
		key="catalog"
		name="catalog"
		path="catalog"
		component={() => "This is the Catalog page"}
		componentTextValue="CatalogPage"
	/>,
	<AppPage
		key="prices"
		name="prices"
		path="prices"
		component={() => "This is the Prices page"}
		componentTextValue="PricesPage"
	/>,
	<AppPage
		key="contacts"
		name="contacts"
		path="contacts"
		component={() => "This is the Contacts page"}
		componentTextValue="ContactsPage"
	/>,
	<AppPage
		key="404"
		component={() => "Page not found"}
		componentTextValue="NotFoundPage"
		notFoundPage
	/>
];


export default class AppDemo extends React.Component {
	state = {
		path: `${SITE}`
	};

	handleChangePage = (page, path, params) => {
		this.setState({
			path: `${SITE}${path ? `/${path}` : ''}`
		});
		const {onChangeDemoPage} = window.top;
		if (onChangeDemoPage) {
			onChangeDemoPage(page, path, params);
		}
	}

	handlePageNotFound = (page, path) => {
		const {onDemoPageNotFound} = window.top;
		if (onDemoPageNotFound) {
			onDemoPageNotFound(page, path);
		}
	}

	handleChangeLocation = (path) => {
		this.setState({path});
	}

	handleEnterLocation = (location) => {
		const properLocation = location.replace(new RegExp(`^${SITE}/*`), '');
		navigateToPath(properLocation);
	}

	renderLocation() {
		return (
			<div style={{marginBottom: '20px'}}>
				<Input
					value={this.state.path}
					width="100%"
					onChange={this.handleChangeLocation}
					onEnter={this.handleEnterLocation}
				/>
			</div>
		);
	}

	render() {
		return (
			<div className="app-demo">
				<App
					indexPageName="home"
					onChangePage={this.handleChangePage}
					onPageNotFound={this.handlePageNotFound}
					hashRouting
					hashPaths
				>
					{this.renderLocation()}
					{getMenu()}
					<br />
					{getContent()}
				</App>
			</div>
		)
	}
}