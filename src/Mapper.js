import React from 'react';
import {Checkbox, Input, Form, FormControl} from 'uiex';

export default class Mapper extends React.Component {

	render() {
		const {map, data, name} = this.props;
		return (
			<div className="mapper">
				<div className="mapper-name">
					{name}
				</div>
				<Form 
					onChange={this.handleChangeInput}
				>
					{Object.keys(map).map(key => {
						const item = map[key];
						const value = data[key];
						
						switch (item.type) {
							case 'boolean':
								return this.renderCheckboxControl(key, item, value);

							default:
								return this.renderInputControl(key, item, value);
						}
						
					})}
				</Form>
			</div>
		)
	}

	renderInputControl(name, item, value) {
		let width = 300;
		if (item.numeric) {
			width = 120;
		}
		return (
			<FormControl 
				key={name}
				caption={name}
			>
				<Input
					name={name}
					value={value}
					placeholder={item.example ? 'Example: ' + item.example : ''}
					width={width}
				/>
			</FormControl>
		)
	}

	renderCheckboxControl(name, item, value) {
		return (
			<Checkbox
				key={name}
				name={name}
				checked={value}
				title={item.description}
				onChange={this.handleChangeCheckbox}
			>
				{name}
			</Checkbox>
		)
	}

	handleChangeCheckbox = (checked, name, value) => {
		this.handleChange(name, checked);
	}

	handleChangeInput = (value, name) => {
		this.handleChange(name, value);
	}

	handleChange(name, value) {
		const {onChange, data} = this.props;
		if (typeof onChange == 'function') {
			data[name] = value;
			onChange({...data});
		}
	}
}