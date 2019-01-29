import React from 'react';
import {ScrollContainer} from 'uiex/ScrollContainer';
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
			<ScrollContainer 
				className="main-menu"
				sliderWidth="5"
				trackWidth="1"
				scrollTop={this.state.scrollTop}
				sliderColor="#BBB"
				trackColor="#CCC"
				scrollbarRadius="5"
				overflowMaskColor="#FFF"
				overflowMaskHeight="20"
				hiddenScrollbar
				onWheel={this.handleWheel}
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
			</ScrollContainer>
		)
	}

	handleWheel = (scrollTop) => {
		this.setState({scrollTop});
	}
}