import React from 'react';
import {Checkbox} from 'uiex/Checkbox';
import {CheckboxGroup} from 'uiex/CheckboxGroup';
import {Input} from 'uiex/Input';
import {InputNumber} from 'uiex/InputNumber';
import {InputColor} from 'uiex/InputColor';
import {InputBoolean} from 'uiex/InputBoolean';
import {InputRegexp} from 'uiex/InputRegexp';
import {Select, SelectOption} from 'uiex/Select';
import {Form} from 'uiex/Form';
import {FormControl} from 'uiex/FormControl';
import {FormControlGroup} from 'uiex/FormControlGroup';
import {BoxSection} from 'uiex/BoxSection';
import {AutoComplete} from 'uiex/AutoComplete';
import {MultiSelect} from 'uiex/MultiSelect';

const OPTIONS =[{title:'Awesome', value: 'Awesome', withBottomDelimiter: true}, 'Fake', 'Goofie', 'Bad', 'Fucked', 'Fantastic', 'Bold', 'Lovely', 'Green', 'Good', 'Normal', 'Scary', 'Well', 'Safe', 'Lonely', 'Silent', 'Stormy', 'Wet', 'SuperPuperMegaCool', 'Shocked',{title:'Broken', value: 'Broken', withTopDelimiter: true}];

export default class Mapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			val: ''
		}
		this.timeouts = {}
	}

	render() {
		const {map: {checkboxes, inputs}, data, name, isOpen = true, excluded, handlers} = this.props;
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
						cellSize="2"
					>
						<div className="mapper-checkboxes">
							{checkboxes instanceof Object && Object.keys(checkboxes).map(key => {
								if (excluded instanceof Array && excluded.indexOf(key) > -1) {
									return null;
								}
								const item = checkboxes[key];
								const value = data[key];
								return this.renderCheckboxControl(key, item, value);
							})}
						</div>
						{inputs instanceof Array && 
							<div className="mapper-inputs">
								{inputs.map((inps, idx) => {
									return (
										<FormControlGroup key={idx}>
											{Object.keys(inps).map(key => {
												if (excluded instanceof Array && excluded.indexOf(key) > -1) {
													return null;
												}
												const item = inps[key];
												let value = data[key];
												if (typeof value == 'undefined') {
													value = item.value;
												}
												const {options, checkboxes} = item;
												if (options) {
													return this.renderSelectControl(key, item, value);	
												}
												if (checkboxes) {
													return this.renderCheckboxesGroupControl(key, item, value);	
												}
												return this.renderInputControl(key, item, value);
											})}
										</FormControlGroup>
									)
								})}
							</div>
						}
						{handlers instanceof Array && 
							<div className="mapper-handlers">
								{handlers.map((h) => {
									return (
										<div ref={h} className={this.getHandlerClassName()} key={h}>
											<div className="inner">
												{h}
											</div>
											<div className="mask">
												{h}
											</div>
										</div>
									)
								})}
							</div>
						}
					</Form>
				</BoxSection>
			</div>
		)
	}

	renderCheckboxesGroupControl(name, item, value) {
		return (
			<FormControl 
				key={name}
				caption={name}
				size={item.size}
				title={item.description}
			>
				<CheckboxGroup 
					name={name}
					value={value}
					options={item.checkboxes}
					icon
					checkAll={false}
					columns="5"
					noBorder
				>	
				</CheckboxGroup>
			</FormControl>
		)
	}

	handleChangeRadio = (radio, name) => {
		this.setState({radio});
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
			defaultValue,
			clearable: true
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

			case 'color':
				props.withoutPicker = item.withoutPicker;
				input = <InputColor {...props}/>
			break;

			case 'regexp':
				input = <InputRegexp {...props}/>
			break;

			case 'boolean':
				input = <InputBoolean {...props}/>
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
				title={item.description}
			>
				{input}
			</FormControl>
		)
	}

	renderSelectControl(name, item, value) {
		let SelectComponent = Select;
		if (item.multiple) {
			SelectComponent = MultiSelect;
		}
		if (item.autoComplete) {
			SelectComponent = AutoComplete;
		}
		return (
			<FormControl 
				title={item.description}
				key={name}
				caption={name}
				size={item.size}
			>
				<SelectComponent
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
				title={item.description + ' (Boolean)'}
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

	fire(event) {
		if (this.refs[event]) {
			this.refs[event].className = this.getHandlerClassName('fired');
			clearTimeout(this.timeouts[event]);
			this.timeouts[event] = setTimeout(() => {
				if (this.refs[event]) {
					this.refs[event].className = this.getHandlerClassName();
				}
			}, 1500);
		}
	}

	getHandlerClassName(className = '') {
		return 'mapper-handler' + (className ? ' ' + className : '');
	}
}