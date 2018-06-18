import React from 'react';
import {
	Checkbox,
	Input,
	InputNumber,
	Select,
	SelectOption,
	Form,
	FormControl,
	FormControlGroup,
	BoxSection,
	AutoComplete
} from 'uiex';

export default class Mapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const {map: {checkboxes, inputs}, data, name, isOpen = true} = this.props;
		return (
			<div className="mapper">
				<BoxSection 
					caption={name}
					isOpen={isOpen}
					animation="fade-fall"
					iconAtRight
					effect="ease-in-out"
				>
					<Form 
						onChange={this.handleChangeInput}
						columns="12"
						controlSize="2"
					>
						<div className="mapper-checkboxes">
							{Object.keys(checkboxes).map(key => {
								const item = checkboxes[key];
								const value = data[key];
								return this.renderCheckboxControl(key, item, value);
							})}
						</div>
						<div className="mapper-inputs">						
							{inputs.map((inps, idx) => {
								return (
									<FormControlGroup key={idx}>
										{Object.keys(inps).map(key => {
											const item = inps[key];
											let value = data[key];
											if (typeof value == 'undefined') {
												value = item.value;
											}
											const {options} = item;
											if (options) {
												return this.renderSelectControl(key, item, value);	
											}
											return this.renderInputControl(key, item, value);
										})}
									</FormControlGroup>
								)
							})}
							<AutoComplete 
								name="aaa" 
								value={this.state.ac} 
								onChange={this.handleChangeAC}
							>
								<SelectOption value="bad">
									Bad
								</SelectOption>
								<SelectOption value="normal">
									Normal
								</SelectOption>
								<SelectOption value="good">
									Good
								</SelectOption>
							</AutoComplete>
						</div>
					</Form>
				</BoxSection>
			</div>
		)
	}

	handleChangeAC = (ac) => {
		this.setState({ac})
	}

	renderInputControl(name, item, value) {
		const {
			maxLength,
			example,
			defaultValue,
			measure,
			measures,
			minValue,
			maxValue,
			positive,
			negative,
			decimal,
			toFixed
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
					maxValue,
					positive,
					negative,
					decimal,
					toFixed
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
				shift={item.shift}
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
					empty
					name={name}
					value={value}
					options={item.options}
					placeholder={item.empty}
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