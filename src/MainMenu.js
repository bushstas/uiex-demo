import React from 'react';
import {ScrollContainer} from 'uiex/ScrollContainer';
import {Button} from 'uiex/Button';
import {MAP} from './map';

export default class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		const keys = Object.keys(MAP);
		this.state = {
			active: 'TextBlock'
		};
	}

	componentDidMount() {
		const {active} = this.state;
		this.handleChange(active);
	}

	handleChange = (active) => {
		this.setState({active});
		this.props.onChange(MAP[active]);
	}

	render() {
		const {onChange} = this.props;
		const {active} = this.state;
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
					let className = 'main-menu-button';
					if (item === active) {
						className += ' active';
					}
					return (
						<Button 
							key={item}
							value={item}
							className={className}
							align="left"
							onClick={this.handleChange}
						>
							{item}
						</Button>
					)
				})}
			</ScrollContainer>
		)
	}

	handleWheel = (scrollTop) => {
		this.setState({scrollTop});
	}
}