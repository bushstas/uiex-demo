import React from 'react';
import {ScrollContainer} from 'uiex/ScrollContainer';

const PAGES = [
	'Arrow',
	'AutoComplete',
	'Box',
	'BoxSection',
	'Button',
	'ButtonGroup',
	'CellGroup',
	'ColorPicker',
	'Colors',
	'Draggable',
	'Input',
	'InputArray',
	'InputColor',
	'InputDate',
	'InputNumber',
	'InputPhone',
	'InputRegexp',
	'Modal',
	'RateForm',
	'ScrollContainer',
	'SearchForm',
	'Select',
	'SidePanel',
	'SliderScale',
	'Tab',
	'Tabs'
]

export default class MainMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {onChange, active} = this.props;
		return (
			<ScrollContainer 
				className="main-menu"
				scrollerWidth="6"
				scrollTop={this.state.scrollTop}
				sliderColor="#BBB"
				trackColor="#DDD"
				overflowMaskColor="#FFF"
				overflowMaskHeight="20"
				hiddenScrollbar
				onWheel={this.handleWheel}
			>
				{PAGES.map(item => {
					let className = 'main-menu-button';
					if (item == active) {
						className += ' active';
					}
					return (
						<div 
							key={item}
							className={className}
							onClick={onChange.bind(null, item)}
						>
							{item}
						</div>
					)
				})}
			</ScrollContainer>
		)
	}

	handleWheel = (scrollTop) => {
		this.setState({scrollTop});
	}
}