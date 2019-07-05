import React from 'react';
import {Checkbox} from 'uiex/Checkbox';
import {CheckboxGroup} from 'uiex/CheckboxGroup';
import {Input} from 'uiex/Input';
import {InputNumber} from 'uiex/InputNumber';
import {InputColor} from 'uiex/InputColor';
import {InputBoolean} from 'uiex/InputBoolean';
import {InputRegexp} from 'uiex/InputRegexp';
import {InputDate} from 'uiex/InputDate';
import {InputPhone} from 'uiex/InputPhone';
import {Select} from 'uiex/Select';
import {SelectObject} from 'uiex/SelectObject';
import {Form, change} from 'uiex/Form';
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
			extraPropsShown: false,
			isOpen: props.isOpen
		}
		this.timeouts = {}
	}

	render() {
		let {map: {checkboxes, inputs}, data, name, excluded, handlers, withExtraProps, customEvents, handlersNote, formName} = this.props;
		const {isOpen = true} = this.state;
		let {columns} = this.props;
		if (!getNumber(columns)) {
			columns = COLUMNS;
		}
		const withCustomEvents = customEvents instanceof Object;
		return (
			<div className="mapper">
				<BoxSection 
					view="header"
					caption={name}
					isOpen={isOpen}
					animation="fade-fall"
					iconAtRight
					note={withExtraProps ? this.renderExtraPropsCheckbox() : null}
					effect="ease-in-out"
					onToggle={this.handleBoxSectionToggle}
				>
					<Form 
						name={formName || 'mapper'}
						data={data}
						columns={columns}
						columnsTiny="2"
						columnsSmall="4"
						columnsMiddle="6"
						columnsLarger="10"
						columnsHuge="18"
						columnsGigantic="24"
						cellSize="2"
						rowMargin="10"
						onChange={this.handleChange}
					>
						<div className="mapper-checkboxes">
							{checkboxes instanceof Object && Object.keys(checkboxes).map(key => {
								if (excluded instanceof Array && excluded.indexOf(key) > -1) {
									return null;
								}
								const item = checkboxes[key];
								return this.renderCheckboxControl(key, item);
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
												const {options, checkboxes} = item;
												if (options) {
													return this.renderSelectControl(key, item);	
												}
												if (checkboxes) {
													return this.renderCheckboxesGroupControl(key, item);	
												}
												return this.renderInputControl(key, item);
											})}
										</FormControlGroup>
									)
								})}
							</div>
						}
						{handlers instanceof Array && 
							<div className={'mapper-handlers' +(withCustomEvents ? ' with-custom-events' : '')}>
								{handlersNote && 
									<div className="mapper-handlers-note">
										{handlersNote}
									</div>
								}
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
						{withCustomEvents && 
							<div className="mapper-handlers custom-events">
								{Object.keys(customEvents).map((k) => {
									return (
										<div className="mapper-handler" key={k} title={customEvents[k]}>
											<div className="inner">
												{k}
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

	handleBoxSectionToggle = (isOpen) => {
		this.setState({isOpen});
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
				value={this.state.extraPropsShown}
				onChange={this.handleExtraPropsCheckboxChange}
			>
				Show extra props
			</Checkbox>
		)
	}

	handleExtraPropsCheckboxChange = (extraPropsShown) => {
		this.setState({extraPropsShown});
	}

	renderCheckboxesGroupControl(name, item) {
		return (
			<FormControl 
				key={name}
				caption={name}
				size={item.size}
				title={item.description}
			>
				<CheckboxGroup 
					name={name}
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
			correctionOnBlur,
			extra,
			readOnly,
			valueWithMeasure,
			customFilter,
			onChangeMeasure
		} = item;

		if (extra && !this.state.extraPropsShown) {
			return null;
		}

		let input;
		const props = {
			name,
			value,
			placeholder: example || example === 0 ? 'Example: ' + example : '',
			maxLength,
			defaultValue,
			clearable: true,
			readOnly,
			customFilter
		};
		switch (item.type) {
			case 'array':
				input = <Input {...props} readOnly value="Array"/>
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
					toFixed,
					valueWithMeasure,
					correctionOnBlur,
					onChangeMeasure: this.getChangeMeasureHandler(onChangeMeasure)
				};
				input = <InputNumber {...props} {...numberProps}/>
			break;

			case 'color':
				props.withoutPicker = item.withoutPicker;
				input = <InputColor {...props}/>
			break;

			case 'regexp':
				input = <InputRegexp {...props}/>
			break;

			case 'phone':
				input = <InputPhone {...props}/>
			break;

			case 'date':
				input = <InputDate {...props}/>
			break;

			case 'boolean':
				input = <InputBoolean {...props}/>
			break;

			default:
				if (name == 'children' && this.props.reactChildren) {
					props.value = '<React.Children>';
					props.readOnly = true;
				}
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

	renderSelectControl(name, item) {
		let SelectComponent = Select;
		let {options, empty = true} = item;
		let optionsFromFunc;
		if (item.autoComplete) {
			SelectComponent = AutoComplete;
		} else if (item.type == 'object') {
			SelectComponent = SelectObject;
			if (typeof item.options == 'function') {
				optionsFromFunc = item.options.call(this.props.owner);
			}
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
					empty={empty}
					name={name}
					readOnly={item.readOnly}
					options={optionsFromFunc || options}
					multiple={item.multiple}
					placeholder={item.placeholder || 'Choose an option'}
				/>
			</FormControl>
		)
	}

	renderCheckboxControl(name, item) {
		return (
			<Checkbox
				key={name}
				name={name}
				value={this.props.data[name]}
				readOnly={item.readOnly}
				title={item.description + ' (Boolean)'}
				onChange={this.handleCheckboxChange}
			>
				{name}
			</Checkbox>
		)
	}

	handleCheckboxChange = (value, name) => {
		change('mapper', {[name]: value});
	}

	handleChange = (data) => {
		const {onChange} = this.props;
		if (typeof onChange == 'function') {
			onChange(data);
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

	getChangeMeasureHandler(handlerName) {
		this.changeMeasureHandlers = this.changeMeasureHandlers || {};
		if (!this.changeMeasureHandlers[handlerName]) {
			this.changeMeasureHandlers[handlerName] = (measure) => {
				if (this.props.owner) {
					this.props.owner[handlerName](measure);
				}
			}
		}
		return this.changeMeasureHandlers[handlerName];
	}
}