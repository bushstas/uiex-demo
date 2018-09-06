import React from 'react';
import Demo from '../../Demo';
import {Draggable, DragHandleArea} from 'uiex/Draggable';
import {getSetState} from '../../utils';
import {DRAG_LIMITS, DRAG_POSITION_X, DRAG_POSITION_Y} from 'uiex/consts';

const percents = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
const dragPositionX = [...DRAG_POSITION_X, ...percents];
const dragPositionY = [...DRAG_POSITION_Y, ...percents];

export default class DraggableDemo extends Demo {
	static map = {
		checkboxes: {
			horizontal: {
				description: 'Dragging only along the X axis'
			},
			vertical: {
				description: 'Dragging only along the Y axis'
			},
			fixed: {
				description: 'With CSS fixed position'
			},
			withOwnPosition: {
				description: 'Will not have added CSS absolute or fixed position'
			}
		},
		inputs: [
			{
				dragLimits: {
					type: 'select',
					empty: 'Chose an option',
					description: 'Dragging limits (String)',
					options: DRAG_LIMITS
				},
				x: {
					type: 'number',
					description: 'Current X coordinate (Number | Numeric String)',
					example: 50
				},
				y: {
					type: 'number',
					description: 'Current Y coordinate (Number | Numeric String)',
					example: 50
				},
				z: {
					type: 'number',
					description: 'Z-index (Number | Numeric String)',
					example: 100,
					positive: true
				},
				initialPositionX: {
					type: 'select',
					empty: 'Chose an option',
					description: 'Initial position along the X axis. Will get effect always when X is null or undefined (String)',
					options: dragPositionX
				},
				initialPositionY: {
					type: 'select',
					empty: 'Chose an option',
					description: 'Initial position along the Y axis. Will get effect always when Y is null or undefined (String)',
					options: dragPositionY
				}
			}
		]
	};
	static data = {
		width: 70,
		height: 70,
		initialPositionX: 'center',
		initialPositionY: 'center'
	};
	static excluded = ['vertical', 'block', 'valign', 'float', 'align'];
	static handlers = ['onDragStart', 'onDrag', 'onDragEnd'];
	static args = {
		onDragStart: ['x', 'y'],
		onDrag: ['x', 'y'],
		onDragEnd: ['x', 'y']
	};
	static funcs = {
		onDrag: getSetState(['x', 'y'])
	};
	static stateProps = ['x', 'y'];
	static changeState = {
		onDrag: function(x, y) {
			return {x, y};
		}
	};
	static componentName = 'Draggable';
	static component = Draggable;

	renderComponent(Component, props) {
        return (
           <div className="draggable-area">
		   		Parent
				{super.renderComponent(Component, props)}
		   </div>
        )
	}
	
	renderContent() {
		return (
			<DragHandleArea>
				Drag me
			</DragHandleArea>
		)
	}
}