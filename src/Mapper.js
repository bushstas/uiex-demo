import React from 'react';
import {Checkbox} from 'uiex/Checkbox';
import {CheckboxGroup} from 'uiex/CheckboxGroup';
import {Input} from 'uiex/Input';
import {InputNumber} from 'uiex/InputNumber';
import {InputColor} from 'uiex/InputColor';
import {InputBoolean} from 'uiex/InputBoolean';
import {InputRegexp} from 'uiex/InputRegexp';
import {InputDate} from 'uiex/InputDate';
import {Select} from 'uiex/Select';
import {SelectObject} from 'uiex/SelectObject';
import {Form} from 'uiex/Form';
import {FormControl} from 'uiex/FormControl';
import {FormControlGroup} from 'uiex/FormControlGroup';
import {BoxSection} from 'uiex/BoxSection';
import {AutoComplete} from 'uiex/AutoComplete';
import {getNumber} from 'uiex/utils';

const COLUMNS = 12;

export default class Mapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			val: '',
			extraPropsShown: false
		}
		this.timeouts = {}
	}

	render() {
		let {map: {checkboxes, inputs}, data, name, isOpen = true, excluded, handlers, withExtraProps} = this.props;
		let {columns} = this.props;
		if (!getNumber(columns)) {
			columns = COLUMNS;
		}
		if (!(data instanceof Object)) {
			data = {};
		}
		return (
			<div className="mapper">
				<BoxSection 
					caption={name}
					isOpen={isOpen}
					animation="fade-fall"
					iconAtRight
					note={withExtraProps ? this.renderExtraPropsCheckbox() : null}
					effect="ease-in-out"
				>
					<Form 
						onChange={this.handleChangeInput}
						columns={columns}
						columnsTiny="2"
						columnsSmall="4"
						columnsMiddle="6"
						columnsLarger="10"
						columnsHuge="18"
						columnsGigantic="24"
						cellSize="2"
						rowMargin="10"
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
									let columns;
									if (inps._COLUMNS) {
										columns = inps._COLUMNS;
									}
									return (
										<FormControlGroup key={idx} columns={columns}>
											{Object.keys(inps).map(key => {
												if (key.charAt(0) == '_') {
													return;
												}
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
										<div ref={h} className={this.getHandlerClassName()} key={h} title={this.getHandlerTitle(h)}>
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

	getHandlerTitle(name) {
		const {args} = this.props;
		let ar = '';
		if (args instanceof Object && args[name]) {
			if (args[name] instanceof Array) {
				ar = args[name].join(', ');
			} else if (typeof args[name] == 'string') {
				ar = args[name];
			}
		}
		return name + ' (' + ar + ') { ... }'
	}

	renderExtraPropsCheckbox() {
		return (
			<Checkbox 
				checked={this.state.extraPropsShown}
				onChange={this.handleExtraPropsCheckboxChange}
			>
				Show extra props
			</Checkbox>
		)
	}

	handleExtraPropsCheckboxChange = (extraPropsShown) => {
		this.setState({extraPropsShown});
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
			toFixed,
			extra,
			readOnly,
			customFilter
		} = item;

		if (extra && !this.state.extraPropsShown) {
			return null;
		}

		let input;
		const props = {
			name,
			value,
			placeholder: example ? 'Example: ' + example : '',
			maxLength,
			defaultValue,
			clearable: true,
			readOnly,
			customFilter
		};
		switch (item.type) {
			case 'array':
				const arrayValue = 'Array (' + (value instanceof Array ? value.length : (!!value ? 1 : 0)) + ')';
				input = <Input {...props} readOnly value={arrayValue}/>
			break;

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

			case 'date':
				input = <InputDate {...props}/>
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
				stretched={item.stretched}
				fullWidth={item.fullWidth}
				title={item.description}
				lastInRow={item.lastInRow}
			>
				{input}
			</FormControl>
		)
	}

	renderSelectControl(name, item, value) {
		let SelectComponent = Select;
		if (item.autoComplete) {
			SelectComponent = AutoComplete;
		} else if (item.type == 'object') {
			SelectComponent = SelectObject;
		}
		return (
			<FormControl 
				title={item.description}
				key={name}
				caption={name}
				size={item.size}
				lastInRow={item.lastInRow}
				stretched={item.stretched}
			>
				<SelectComponent
					empty
					name={name}
					value={value}
					readOnly={item.readOnly}
					options={item.options}
					multiple={item.multiple}
					placeholder={item.placeholder || 'Choose an option'}
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
				readOnly={item.readOnly}
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