import React from 'react';
import {
	Checkbox,
	Input,
	InputNumber,
	Select,
	Form,
	FormControl,
	FormControlsGroup
} from 'uiex';

export default class Mapper extends React.Component {

	render() {
		const {map: {checkboxes, inputs}, data, name} = this.props;
		return (
			<div className="mapper">
				<div className="mapper-name">
					{name}
				</div>
				<Form 
					onChange={this.handleChangeInput}
				>
					<div className="mapper-checkboxes">
						{Object.keys(checkboxes).map(key => {
							const item = checkboxes[key];
							const value = data[key];
							return this.renderCheckboxControl(key, item, value);
						})}
					</div>
					<div className="mapper-inputs">
						<FormControlsGroup 
							columns="10"
							sideMargin="12"
						>
							{Object.keys(inputs).map(key => {
								const item = inputs[key];
								const value = data[key];
								const {options} = item;
								if (options) {
									return this.renderSelectControl(key, item, value);	
								}
								return this.renderInputControl(key, item, value);
							})}
						</FormControlsGroup>
					</div>
				</Form>
			</div>
		)
	}

	renderInputControl(name, item, value) {
		const {
			maxLength,
			example,
			defaultValue,
			measure,
			measures,
			minValue,
			maxValue
		} = item;

		let input;
		const props = {
			name,
			value,
			placeholder: example ? 'Example: ' + example : '',
			maxLength,
			defaultValue
		};
		switch (item.type) {
			case 'number':
				const numberProps = {
					measure,
					measures,
					minValue,
					maxValue
				};
				input = <InputNumber {...props} {...numberProps} onChangeMeasure={this.props.onChangeMeasure}/>
			break;

			default:
				input = <Input {...props}/>
		}
		return (
			<FormControl 
				key={name}
				caption={name}
				size={item.size}
			>
				{input}
			</FormControl>
		)
	}

	renderSelectControl(name, item, value) {
		return (
			<FormControl 
				key={name}
				caption={name}
				size={item.size}
			>
				<Select
					name={name}
					value={value}
					options={item.options}
					placeholder={item.empty}
					animated
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

	handleChangeInput = (name, value) => {
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