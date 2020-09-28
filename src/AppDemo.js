import React from 'react';
import {App, navigateToPath} from 'uiex/App';
import {AppPage} from 'uiex/AppPage';
import {AppLink} from 'uiex/AppLink';
import {ButtonGroup} from 'uiex/ButtonGroup';
import {Input} from 'uiex/Input';
import {TextBlock} from 'uiex/TextBlock';
import {MAP} from './map';
import {DATA} from './components/App';
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
			path="catalog/1"
			isButton
		>
			Catalog Item
		</AppLink>
		<AppLink
			page="catalogItem"
			params={{id: 3}}
			isButton
		>
			Catalog Item
		</AppLink>
		<AppLink
			path="catalog/$id"
			params={{id: 4}}
			isButton
		>
			Catalog Item
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
			path="nopath"
			isButton
		>
			Not existed path
		</AppLink>
		<AppLink
			page="nopage"
			isButton
		>
			Not existed page
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
		exactPath
	/>,
	<AppPage
		key="catalogItem"
		name="catalogItem"
		path="catalog/$id"
		component={() => "This is the Catalog item page"}
		componentTextValue="CatalogItemPage"
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
	/>
];


export default class AppDemo extends React.Component {
	state = {
		path: `${SITE}`,
		data: {...DATA}
	};

	componentDidMount() {
		window.onChangeData = (data) => {
			this.setState({data});
		};
	}

	componentWillUnmount() {
		window.onChangeData = null;
	}

	handleInitPage = (page) => {
		const {onInitDemoPage} = window.top;
		if (onInitDemoPage) {
			onInitDemoPage(page);
		}
	}

	handleChangePage = (page) => {
		const {onChangeDemoPage} = window.top;
		if (onChangeDemoPage) {
			onChangeDemoPage(page);
		}
	}

	handlePageNotFound = (page) => {
		const {onDemoPageNotFound} = window.top;
		if (onDemoPageNotFound) {
			onDemoPageNotFound(page);
		}
	}

	handlePushState = (path) => {
		const {pathname, hash} = window.frames.location;
		const properPath = pathname === '/' ? '' : pathname;
		this.setState({
			path: `${SITE}${properPath ? `${properPath}` : ''}${hash ? `/${hash}` : ''}`
		});
		const {onDemoPushState} = window.top;
		if (onDemoPushState) {
			onDemoPushState(path);
		}
	}

	handleReplaceState = (path) => {
		const {pathname, hash} = window.frames.location;
		const properPath = pathname === '/' ? '' : pathname;
		this.setState({
			path: `${SITE}${properPath ? `${properPath}` : ''}${hash ? `/${hash}` : ''}`
		});
		const {onDemoReplaceState} = window.top;
		if (onDemoReplaceState) {
			onDemoReplaceState(path);
		}
	}

	handleReturnHome = (page) => {
		const {onDemoReturnHome} = window.top;
		if (onDemoReturnHome) {
			onDemoReturnHome(page);
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
				{this.renderLocation()}
				{getMenu()}
				<br />
				<App
					{...this.state.data}
					onInitPage={this.handleInitPage}
					onChangePage={this.handleChangePage}
					onPageNotFound={this.handlePageNotFound}
					onPushState={this.handlePushState}
					onReplaceState={this.handleReplaceState}
					onReturnHome={this.handleReturnHome}
				>
					{getContent()}
				</App>
			</div>
		)
	}
}