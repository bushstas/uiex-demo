import React from 'react';
import {ScrollContainer} from 'uiex/ScrollContainer';
import {SideMenu} from 'uiex/SideMenu';
import {Button} from 'uiex/Button';
import {AppLink} from 'uiex/AppLink';
import {MAP} from './map';

export default class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<SideMenu
				className="main-menu"
				sliderWidth="5"
				trackWidth="1"
				scrollTop={this.state.scrollTop}
				sliderColor="#BBB"
				trackColor="#CCC"
				scrollbarRadius="5"
				overflowMaskColor="#FFF"
				overflowMaskHeight="20"
				onWheel={this.handleWheel}
				hiddenScrollbar
				scrollable
			>
				{Object.keys(MAP).map(item => {
					return (
						<AppLink
							key={item}
							page={item}
							className="main-menu-button"
							align="left"
							isButton
						>
							{item}
						</AppLink>
					)
				})}
			</SideMenu>
		)
	}

	handleWheel = (scrollTop) => {
		this.setState({scrollTop});
	}
}