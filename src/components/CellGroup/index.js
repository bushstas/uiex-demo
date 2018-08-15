import React from 'react';
import Demo from '../../Demo';
import Mapper from '../../Mapper';
import {CellGroup, Cell} from 'uiex/CellGroup';
import {Select} from 'uiex/Select';
import {CELL_ALIGN, ALIGN_SELF} from 'uiex/consts';
import {stringify, wrap} from '../../utils';

const CELL_MAP = {
	checkboxes: {
		firstInRow: {
			description: 'firstInRow'
		},
		lastInRow: {
			description: 'lastInRow'
		},
		floatSide: {
			description: 'floatSide'
		},
		stretched: {
			description: 'stretched'
		},
		fullWidth: {
			description: 'fullWidth'
		}
	},
	inputs: [
		{
			_COLUMNS: 16,
			size: {
				description: 'Cell size',
				type: 'number',
				maxValue: 10,
				positive: true
			},
			shift: {
				description: 'Cell shift',
				type: 'number',
				maxValue: 10,
				positive: true
			},
			maxSize: {
				description: 'Max size for stretched cells',
				type: 'number',
				maxValue: 10,
				positive: true
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
				positive: true
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
				lastInRow: true
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
				description: 'sideShrink'
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
					positive: true
				},
				cellSize: {
					description: 'Cell default size',
					type: 'number',
					maxValue: 10,
					positive: true
				},
				maxCellSize: {
					description: 'Cell max default size',
					type: 'number',
					maxValue: 10,
					positive: true
				},
				cellMargin: {
					description: 'Space between columns in px',
					type: 'number',
					maxValue: 30,
					positive: true
				},
				rowMargin: {
					description: 'Space between rows in px',
					type: 'number',
					maxValue: 30,
					positive: true
				},
				cellHeight: {
					description: 'Height of cells',
					type: 'number',
					maxValue: 500,
					positive: true
				},
				cellMinHeight: {
					description: 'Minimal height of cells',
					type: 'number',
					maxValue: 500,
					positive: true
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
		const T = "\t";
		const TAB = T + T + T + T;
		const TAB2 = TAB + T;
		const N = "\n";		
		let content = '';
		for (let i = 0; i < this.state.cellQuantity; i++) {
			const props = this.getCellData(i);
			const keys = Object.keys(props);
			if (keys.length > 1) {
				content += TAB + wrap('&lt;') + wrap('Cell', 'keyword2') + N;
				for (let k in props) {
					if (props[k] === true) {
						content += TAB2 + wrap(k, 'key') + N;	
					} else {
						content += TAB2 + wrap(k, 'key') + wrap('=') + stringify(props[k], true) + N;
					}
				}
				content += TAB + wrap('&gt;') + N;
			} else if (keys.length > 0) {
				if (props[keys[0]] === true) {
					content += TAB + wrap('&lt;') + wrap('Cell ', 'keyword2') + wrap(keys[0], 'key') + wrap('&gt;') + N;
				} else {
					content += TAB + wrap('&lt;') + wrap('Cell ', 'keyword2') + wrap(keys[0], 'key') + wrap('=') + stringify(props[keys[0]], true) + wrap('&gt;') + N;
				}
			} else {
				content += TAB + wrap('&lt;') + wrap('Cell', 'keyword2') + wrap('&gt;') + N;
			}
			content += TAB2 + 'Cell #' + (i + 1) + N;
			content += TAB + wrap('&lt;/') + wrap('Cell', 'keyword2') + wrap('&gt;') + (i < this.state.cellQuantity - 1 ? N : '');
		}
		return content;
	}
}