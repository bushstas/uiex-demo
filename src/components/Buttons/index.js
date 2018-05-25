import React from 'react';
import {Button, ButtonGroup} from 'uiex';

export default class ButtonsDemo extends React.Component {

	render() {
		return (
			<div>
				<ButtonGroup
					onClick={this.handleButtonClick}
					align="right"
					width="700"
					iconSize="22"
					iconAtRight
					buttonColor="blue"
					float="right"
				>
					<Button
						value="save"
						width="auto"
						icon="favorite"
					>
						Сохранить
					</Button>

					<Button
						value="remove"
						icon="perm_identity"
					>
						Удалить
					</Button>

					<Button
						value="cancel"
						icon="face"
					>
						Отмена
					</Button>

				</ButtonGroup>
			</div>
		)
	}

	handleButtonClick = (value) => {
		alert(value)
	}
}