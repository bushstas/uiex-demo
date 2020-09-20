import React from 'react';
import {ScrollContainer} from 'uiex/ScrollContainer';
import {SideMenu} from 'uiex/SideMenu';
import {Button} from 'uiex/Button';
import {BoxSection} from 'uiex/BoxSection';
import {BoxSectionGroup} from 'uiex/BoxSectionGroup';
import {AppLink} from 'uiex/AppLink';
import {MAP} from './map';

export default class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderButton = (button) => {
		return (
			<AppLink
				key={button}
				page={button}
				className="main-menu-button"
				align="left"
				isButton
			>
				{button}
			</AppLink>
		);
	}

	renderSectionGroup = (section) => {
		return (
			<BoxSection
				key={section}
				caption={section}
				view="header"
			>
				{Object.keys(MAP[section]).map(this.renderButton)}
			</BoxSection>
		);
	}

	render() {
		return (
			<SideMenu
				className="main-menu"
				sliderWidth="5"
				trackWidth="1"
				sliderColor="#BBB"
				trackColor="#CCC"
				scrollbarRadius="5"
				overflowMaskColor="#FFF"
				overflowMaskHeight="20"
				hiddenScrollbar
				scrollable
				uncontrolled
			>
				<BoxSectionGroup
					width={230}
					iconAtRight
					uncontrolled
				>
					{Object.keys(MAP).map(this.renderSectionGroup)}
				</BoxSectionGroup>
			</SideMenu>
		)
	}
}