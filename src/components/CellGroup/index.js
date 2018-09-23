import React from 'react';
import Demo from '../../Demo';
import Mapper from '../../Mapper';
import {CellGroup, Cell} from 'uiex/CellGroup';
import {Select} from 'uiex/Select';
import {CELL_ALIGN, ALIGN_SELF} from 'uiex/consts';
import {stringify, wrap, tabulation} from '../../utils';

const CELL_MAP = {
	checkboxes: {
		firstInRow: {
			description: 'A cell will start a new row'
		},
		lastInRow: {
			description: 'A cell will be last in a row'
		},
		floatSide: {
			description: 'A cell will get right and will be last in a row'
		},
		stretched: {
			description: 'A cell will occupy all remaining space in a row'
		},
		fullWidth: {
			description: 'A cell will occupy all space in a row'
		}
	},
	inputs: [
		{
			_COLUMNS: 16,
			size: {
				description: 'Cell size',
				type: 'number',
				maxValue: 10,
				positive: true,
				example: 2
			},
			shift: {
				description: 'Cell shift',
				type: 'number',
				maxValue: 10,
				positive: true,
				example: 1
			},
			maxSize: {
				description: 'Max size for stretched cells',
				type: 'number',
				maxValue: 10,
				positive: true,
				example: 6
			},
			alignSelf: {
				description: 'Cell vertical align instead of being stretched',
				type: 'select',
				options: ALIGN_SELF
			},
			height: {
				description: 'Cell height',
				type: 'number',
				maxValue: 1000,
				positive: true,
				example: 200
			},
			cellAlign: {
				description: 'Cell align',
				options: CELL_ALIGN,
				empty: 'Chose an option'
			},
			minHeight: {
				description: 'Cell min height',
				type: 'number',
				maxValue: 1000,
				positive: true,
				lastInRow: true,
				example: 100
			}
		},
		{
			sizeTiny: {
				description: 'Cell size for window width <= 800px',
				type: 'number',
				maxValue: 10,
				positive: true,
				extra: true
			},
			sizeSmall: {
				description: 'Cell size for window width <= 1000px',
				type: 'number',
				maxValue: 10,
				positive: true,
				extra: true
			},
			sizeMiddle: {
				description: 'Cell size for window width <= 1300px',
				type: 'number',
				maxValue: 10,
				positive: true,
				extra: true
			},
			sizeLarger: {
				description: 'Cell size for window width <= 1500px',
				type: 'number',
				maxValue: 10,
				positive: true,
				extra: true
			},
			sizeLarge: {
				description: 'Cell size for window width <= 2000px',
				type: 'number',
				maxValue: 10,
				positive: true,
				extra: true
			},
			sizeHuge: {
				description: 'Cell size for window width <= 2500px',
				type: 'number',
				maxValue: 10,
				positive: true,
				extra: true
			},
			sizeGigantic: {
				description: 'Cell size for window width > 2500px',
				type: 'number',
				maxValue: 10,
				positive: true,
				extra: true
			},
		}
	]
}

const STYLE = {
	backgroundColor: '#ddd',
	borderRadius: '3px',
	padding: '15px'
}

const SELECT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default class CellGroupDemo extends Demo {
	static map = {
		checkboxes: {
			sideShrink: {
				description: 'Side cells don\'t have left and right padding respectivly so they are a little bit bigger, this flag will make them the same size as others'
			},
			cellAutoHeight: {
				description: "Every cell has own height based on it's content (cells are not stretched)"
			}
		},
		inputs: [
			{
				_COLUMNS: 16,
				columns: {
					description: 'Columns count',
					type: 'number',
					maxValue: 10,
					positive: true,
					example: 10
				},
				cellSize: {
					description: 'Cell default size',
					type: 'number',
					maxValue: 10,
					positive: true,
					example: 2
				},
				maxCellSize: {
					description: 'Cell max default size',
					type: 'number',
					maxValue: 10,
					positive: true,
					example: 6
				},
				cellMargin: {
					description: 'Space between columns in px',
					type: 'number',
					maxValue: 30,
					positive: true,
					example: 10
				},
				rowMargin: {
					description: 'Space between rows in px',
					type: 'number',
					maxValue: 30,
					positive: true,
					example: 10
				},
				cellHeight: {
					description: 'Height of cells',
					type: 'number',
					maxValue: 500,
					positive: true,
					example: 100
				},
				cellMinHeight: {
					description: 'Minimal height of cells',
					type: 'number',
					maxValue: 500,
					positive: true,
					example: 60
				},
				cellAlign: {
					description: 'Align of cells',
					type: 'select',
					options: CELL_ALIGN
				},
			},
			{
				columnsTiny: {
					description: 'Columns for window width <= 800px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				columnsSmall: {
					description: 'Columns for window width <= 1000px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				columnsMiddle: {
					description: 'Columns for window width <= 1300px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				columnsLarger: {
					description: 'Columns for window width <= 1500px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				columnsLarge: {
					description: 'Columns for window width <= 2000px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				columnsHuge: {
					description: 'Columns for window width <= 2500px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				columnsGigantic: {
					description: 'Columns for window width > 2500px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				cellSizeTiny: {
					description: 'Cell default size for window width <= 800px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				cellSizeSmall: {
					description: 'Cell default size for window width <= 1000px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				cellSizeMiddle: {
					description: 'Cell default size for window width <= 1300px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				cellSizeLarger: {
					description: 'Cell default size for window width <= 1500px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				cellSizeLarge: {
					description: 'Cell default size for window width <= 2000px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				cellSizeHuge: {
					description: 'Cell default size for window width <= 2500px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				},
				cellSizeGigantic: {
					description: 'Cell default size for window width > 2500px',
					type: 'number',
					maxValue: 10,
					positive: true,
					extra: true
				}
			}
		]
	};
	static data = {
		columns: 3,
		cellMargin: 5,
		rowMargin: 5,
		cellHeight: '',
		sideShrink: false,
		cellGroupShowExtraProps: false
	};
	static excluded = ['align', 'valign', 'block', 'vertical', 'children', 'disabled'];
	static componentMapperProps = {
		maxHeight: 2000,
		maxWidth: 2000
	};
	static mapperProps = {
		columns: 14,
		withExtraProps: true
	};
	static previewProps = {
		additionalImport: 'Cell'
	}
	static componentName = 'CellGroup';
	static component = CellGroup;
	static customState = {
		cellData: [],
		currentCell: 0,
		cellQuantity: 10
	};

	renderAdditionalMappers() {
		return (
			<Mapper 
				ref="cellMapper"
				name="Cell"
				map={CELL_MAP}
				columns="14"
				data={this.getCurrentCellData()}
				value={this.state.currentCell}
				onChange={this.handleChangeCellData}
				withExtraProps
			/>
		)
	}

	renderContent() {
		const cells = [];
		for (let i = 0; i < this.state.cellQuantity; i++) {
			cells.push(
				<Cell 
					key={i} 
					onClick={this.handleCellClick} 
					style={STYLE}
					className={i == this.state.currentCell ? 'active-cell' : null}
					{...this.getCellData(i)}
				>
					Cell #{i + 1}
				</Cell>
			);
		}
		return cells;
	}

	renderContentBefore() {		
		return (
			<div className="mb20">
				Choose cell quantity
				<Select 
					value={this.state.cellQuantity} 
					onChange={this.handleChangeCellQuantity}
					className="ml20"
					width="100"
					options={SELECT_OPTIONS}
				/>
			</div>
		)
	}

	getCurrentCellData() {
		return this.getCellData(this.state.currentCell);
	}

	getCellData(idx) {
		return this.state.cellData[idx] || {};
	}

	handleCellClick = (currentCell) => {
		this.setState({currentCell});
	}

	handleChangeCellData = (data) => {
		const {cellData} = this.state;
		cellData[this.state.currentCell] = data; 
		this.setState({cellData: {...cellData}});
	}

	handleChangeCellQuantity = (cellQuantity) => {
		this.setState({cellQuantity});
	}

	renderPreviewContent = () => {
		const N = "\n";		
		let content = '';
		for (let i = 0; i < this.state.cellQuantity; i++) {
			const props = this.getCellData(i);
			const keys = Object.keys(props);
			if (keys.length > 1) {
				content += tabulation.render(wrap('&lt;') + wrap('Cell', 'keyword2'), true);
				tabulation.add();
				for (let k in props) {
					if (props[k] === true) {
						content += tabulation.render(wrap(k, 'key'), true);
					} else {
						content += tabulation.render(wrap(k, 'key') + wrap('=') + stringify(props[k], true), true);
					}
				}
				tabulation.reduce();
				content += tabulation.render(wrap('&gt;'), true);
			} else if (keys.length > 0) {
				if (props[keys[0]] === true) {
					content += tabulation.render(wrap('&lt;') + wrap('Cell ', 'keyword2') + wrap(keys[0], 'key') + wrap('&gt;'), true);
				} else {
					content += tabulation.render(wrap('&lt;') + wrap('Cell ', 'keyword2') + wrap(keys[0], 'key') + wrap('=') + stringify(props[keys[0]], true) + wrap('&gt;'), true);
				}
			} else {
				content += tabulation.render(wrap('&lt;') + wrap('Cell', 'keyword2') + wrap('&gt;'), true);
			}
			tabulation.add();
			content += tabulation.render('Cell #' + (i + 1), true);
			tabulation.reduce();
			content += tabulation.render(wrap('&lt;/') + wrap('Cell', 'keyword2') + wrap('&gt;'), i < this.state.cellQuantity - 1);
		}
		return content;
	}
}