import React from 'react';
import ComponentMapper from '../ComponentMapper';
import {CellGroup, Cell} from 'uiex/CellGroup';
import {Select, SelectOption} from 'uiex/Select';
import {Checkbox} from 'uiex/Checkbox';
import Mapper from '../../Mapper';
import Preview from '../../Preview';
import {CELL_ALIGN, ALIGN_SELF} from 'uiex/consts';

const DATA = {
	columns: 3,
	cellMargin: 5,
	rowMargin: 5,
	cellHeight: '',
	sideShrink: false,
	cellGroupShowExtraProps: false
}

const CELLS_QUANTITY = 10;

const CELLS_DATA = [];

const EXCLUDED = ['align', 'valign', 'block', 'vertical', 'children', 'disabled'];

const MAP = {
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
}

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

const ADDITIONAL_IMPORT = 'Cell';


const STYLE = {
	backgroundColor: '#ddd',
	borderRadius: '3px',
	padding: '15px'
}

export default class CellGroupDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			data: DATA,
			cellData: CELLS_DATA,
			currentCell: 0,
			cellQuantity: CELLS_QUANTITY
		}
	}

	render() {
		const {data} = this.state;
		return (
			<div>
				<ComponentMapper 
					isOpen={false}
					data={this.state.data} 
					excluded={EXCLUDED}
					onChange={this.handleChangeData}
					maxHeight={2000}
					maxWidth={2000}
				/>
				<Mapper 
					ref="mapper"
					name="CellGroup"
					map={MAP} 
					columns="14"
					data={this.state.data}
					onChange={this.handleChangeData}
					withExtraProps
				/>
				<Mapper 
					ref="mapper"
					name="Cell"
					map={CELL_MAP}
					columns="14"
					data={this.getCurrentCellData()}
					value={this.state.currentCell}
					onChange={this.handleChangeCellData}
					withExtraProps
				/>
				<Preview
					ref="preview"
					data={this.state.data}
					name="CellGroup"
					content={this.renderPreviewContent()}
					additionalImport={ADDITIONAL_IMPORT}
				>					
					<div className="mb20">
						Choose cell quantity
						<Select 
							value={this.state.cellQuantity} 
							onChange={this.handleChangeCellQuantity}
							className="ml20"
							width="100"
						>
							<SelectOption value="2">
								2
							</SelectOption>
							<SelectOption value="3">
								3
							</SelectOption>
							<SelectOption value="4">
								4
							</SelectOption>
							<SelectOption value="5">
								5
							</SelectOption>
							<SelectOption value="6">
								6
							</SelectOption>
							<SelectOption value="7">
								7
							</SelectOption>
							<SelectOption value="8">
								8
							</SelectOption>
							<SelectOption value="9">
								9
							</SelectOption>
							<SelectOption value="10">
								10
							</SelectOption>
							<SelectOption value="11">
								11
							</SelectOption>
							<SelectOption value="12">
								12
							</SelectOption>
							<SelectOption value="13">
								13
							</SelectOption>
							<SelectOption value="14">
								14
							</SelectOption>
							<SelectOption value="15">
								15
							</SelectOption>
							<SelectOption value="16">
								16
							</SelectOption>
							<SelectOption value="17">
								17
							</SelectOption>
							<SelectOption value="18">
								18
							</SelectOption>
							<SelectOption value="19">
								19
							</SelectOption>
							<SelectOption value="20">
								20
							</SelectOption>
						</Select>
					</div>
					<CellGroup {...this.state.data}>
						{this.renderCells()}
					</CellGroup>						
				</Preview>
			</div>
		)
	}

	renderCells() {
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

	getCurrentCellData() {
		return this.getCellData(this.state.currentCell);
	}

	getCellData(idx) {
		return this.state.cellData[idx] || {};
	}

	handleCellClick = (currentCell) => {
		this.setState({currentCell});
	}

	handleChangeData = (data) => {
		this.setState({data});
	}

	handleChangeCellData = (data) => {
		const {cellData} = this.state;
		cellData[this.state.currentCell] = data; 
		this.setState({cellData: {...cellData}});
	}

	handleChangeCellQuantity = (cellQuantity) => {
		this.setState({cellQuantity});
	}

	renderPreviewContent() {
		const T = "\t";
		const TAB = T + T + T + T;
		const TAB2 = TAB + T;
		const N = "\n";		
		let content = '';
		for (let i = 0; i < this.state.cellQuantity; i++) {
			const props = this.getCellData(i);
			const keys = Object.keys(props);
			if (keys.length > 1) {
				content += TAB + '<Cell' + N;
				for (let k in props) {
					if (props[k] === true) {
						content += TAB2 + k + N;	
					} else {
						content += TAB2 + k + '=' + this.refs.preview.stringify(props[k], true) + N;
					}
				}
				content += TAB + '>' + N;
			} else if (keys.length > 0) {
				if (props[keys[0]] === true) {
					content += TAB + '<Cell ' + keys[0] + '>' + N;
				} else {
					content += TAB + '<Cell ' + keys[0] + '=' + this.refs.preview.stringify(props[keys[0]], true) + '>' + N;
				}
			} else {
				content += TAB + '<Cell>' + N;
			}
			content += TAB2 + 'Cell #' + (i + 1) + N;
			content += TAB + '</Cell>' + (i < this.state.cellQuantity - 1 ? N : '');
		}
		return content;
	}
}