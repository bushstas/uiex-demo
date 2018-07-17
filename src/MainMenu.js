import React from 'react';

const PAGES = [
	'AutoComplete',
	'Box',
	'BoxSection',
	'ButtonGroup',
	'Input',
	'InputColor',
	'InputDate',
	'InputNumber',
	'InputPhone',
	'Modal',
	'RateForm',
	'SearchForm',
	'SidePanel',
	'Tab',
	'Tabs'
]

export default class MainMenu extends React.Component {

	render() {
		const {onChange, active} = this.props;
		return (
			<div className="main-menu">
				{PAGES.map(item => {
					let className;
					if (item == active) {
						className = 'active';
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
			</div>
		)
	}
}