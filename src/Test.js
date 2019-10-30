import React from 'react';

import {Form, isChanged, getChangedFields, reset} from 'uiex/Form';
import {FormControl} from 'uiex/FormControl';
import {FormControlGroup} from 'uiex/FormControlGroup';
import {Checkbox} from 'uiex/Checkbox';
import {CheckboxGroup} from 'uiex/CheckboxGroup';
import {Input} from 'uiex/Input';
import {SelectObject} from 'uiex/SelectObject';
import {Button} from 'uiex/Button';

const obj = {name: 'Stas', age: 22};
const arr = [1, 2, 3];

const OBJECT_OPTIONS = [
	1, 'Hello', true, obj, arr
];

export default class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				check: ['check1'],
				name: 'Stas',
				options: arr
			}
		};
	}

	handleChange = (data) => {
		console.log(data)
		this.setState({data});
	}

	handleDataChange = (a) => {
		console.log(a)
	}

	handleClick = () => {
		alert(isChanged('aaa'))
		alert(getChangedFields('aaa'))
	}

	handleResetClick = () => {
		reset('aaa')
	}

	render() {
		return (
			<div style={{padding: 100}}>
				<Form
					name="aaa"
					data={this.state.data}
					onChange={this.handleChange}
					onDataChange={this.handleDataChange}
					columns={4}
				>
					<FormControlGroup cellSize={2}>
						<FormControl fullWidth>
							<Checkbox name="check" label="Check">
								<CheckboxGroup noBorder>
									<Checkbox name="check1">
										1
									</Checkbox>
									<Checkbox name="check2">
										2
									</Checkbox>
								</CheckboxGroup>
							</Checkbox>
						</FormControl>
						<FormControl>
							<Input name="name" />
						</FormControl>
						<FormControl>
							<SelectObject
								name="options"
								options={OBJECT_OPTIONS}
							/>
						</FormControl>
					</FormControlGroup>
					<Button onClick={this.handleClick}>
						Changed?
					</Button>
					<Button onClick={this.handleResetClick}>
						Reset
					</Button>
				</Form>
			</div>
		)
	}
}