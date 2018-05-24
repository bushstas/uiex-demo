import React from 'react';
import {Button, ButtonGroup} from 'uiex';

export default class App extends React.PureComponent {
	render() {
		return (
			<ButtonGroup
				onClick={this.handleButtonClick}
				align="right"
				buttonWidth="130"
				float="right"
			>
				<Button
					color="green"
					value="save"
					onClick={this.aaa}
				>
					Сохранить
				</Button>

				<Button
					color="red"
					value="remove"
				>
					Удалить
				</Button>

				<Button
					color="white"
					value="cancel"
				>
					Отмена
				</Button>

			</ButtonGroup>
		)
	}

	handleButtonClick = (value) => {
		alert(value)
	}

	aaa = (value) => {
		alert('Saving')
	}
}