import React, { useState } from 'react';
import XLSX from 'xlsx';
import { Upload, Button, Table, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const striptags = require('striptags');

function ExcelPage() {
	const [initialData, setInitialData] = useState(null);
	const [exportName, setExportName] = useState('');
	const [title, setTitle] = useState('');
	const [columns, setColumns] = useState([]);
	const [rows, setRows] = useState([]);
	const [selectedColumn, setSelectedColumn] = useState(null);

	/**
	 * If file passes validation, this saves the file name (without extension) to
	 * state, reads the file, and parses it to JSON. The parsed JSON is passed to
	 * convertToTable. Returns false, since the Ant <Upload/> component is
	 * normally used to upload a file.
	 * 
	 * @param {object} file
	 */
	const fileHandler = (file) => {
		if (!file) {
			message.error('No file uploaded!');
			return false;
		}

		const isExcelFile =
			file.type === 'application/vnd.ms-excel' ||
			file.type ===
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

		if (!isExcelFile) {
			message.error('Unknown file format. Only Excel files are allowed.');
			return false;
		}

		// strip .xlsx extension from filename
		setExportName(file.name.replace(/\.[^/.]+$/, ''));
		
		// create file reader
		const reader = new FileReader();
		reader.onload = (e) => {
			const wb = XLSX.read(e.target.result, { type: 'binary' });
			const wsName = wb.SheetNames[0];
			const ws = wb.Sheets[wsName];
			const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
			setInitialData(jsonData);
			convertToTable(jsonData);
		};

		// read file
		reader.readAsBinaryString(file);
		return false;
	};

	/**
	 * Takes the JSON spreadsheet data and converts it to format Ant <Table/>
	 * component expects, saving it to state. It also sets the default selected
	 * column: 'Text', if it exists.
	 * 
	 * @param {object} data spreadsheet data parsed to JSON
	 */
	const convertToTable = (data) => {
		setTitle(data[0][0]);

		const colData = data[1].map((str) => {
			let dataIndex = str.replace(/[^0-9a-zA-Z]/g, '');
			return {
				title: str,
				dataIndex
			}
		});
		setColumns(colData);

		const defaultColumn = colData.find((col) => col.dataIndex === 'Text') ? 'Text' : null;
		setSelectedColumn(defaultColumn);

		const rowData = data.slice(2).map((arr, key) => {
			let row = { key };
			colData.forEach((col, i) => {
				row[col.dataIndex] = arr[i];
			});
			return row;
		});
		setRows(rowData);
	};

	/**
	 * This is the onChange handler for the Ant <Select/> menu, its value
	 * determines which column to strip HTML tags from.
	 * 
	 * @param {string} value dataIndex of selected column
	 */
	const handleSelectedColumnChange = (value) => {
		setSelectedColumn(value);
	};

	/**
	 * This loops through each row and strips or decodes HTML tags in the
	 * selected column. It keeps a count of cells that have been changed,
	 * indicating the total to the user upon completion.
	 */
	const handleStripHtml = () => {
		let count = 0;
		
		const stripped = rows.map((row) => {
			let result = row[selectedColumn];

			if (result) {
				// turn all HTML breaks to spaces
				result = result.replace('<br>', ' ');
				result = result.replace('<br/>', ' ');
				result = result.replace('<br />', ' ');

				// turn all HTML non-breaking spaces to spaces
				result = result.replace('&nbsp;', ' ');

				// @todo see if any other HTML tags/entities need to be converted

				// strip remaining HTML tags
				result = striptags(result);
			}

			// if cell has changed, +1 to count
			if (result !== row[selectedColumn]) {
				count++;
			}

			return {
				...row,
				[selectedColumn]: result
			};
		});

		if (!count) {
			// nothing was changed
			let columnName = columns.find((col) => col.dataIndex === selectedColumn).title;
			message.info(`No HTML was found in the '${columnName}' column. No changes made.`);
		}
		else {
			// update table
			setRows(stripped);

			// show count of changed cells
			message.success(`${count} rows updated`);
		}
	};

	/**
	 * This creates a new XLSX spreadsheet using the data from the original file,
	 * swapping out the cells in the selected column that has had its HTML
	 * stripped/decoded. The new spreadsheet is exported with the original file
	 * name and saved to the browser's default downloads location.
	 */
	const handleExportFile = () => {
		let exportData = [];

		// add title row and column header row
		exportData.push(initialData[0], initialData[1]);

		// loop through rows, use stripped data
		let columnKeys = columns.map((col) => col.dataIndex);
		for (let index = 0; index < rows.length; index++) {
			const row = rows[index];
			let exportRow = columnKeys.map((key, i) => {
				let initialIndex = index + 2;
				let isEditedColumn = key === selectedColumn;
				let isNotUndefined = !!initialData[initialIndex][i];

				if (isEditedColumn && isNotUndefined) {
					return row[key];
				}

				return initialData[initialIndex][i];
			});
			exportData.push(exportRow);
		}

		// create new file
		const book = XLSX.utils.book_new();
		const sheet = XLSX.utils.aoa_to_sheet(exportData);
		XLSX.utils.book_append_sheet(book, sheet, 'sheet 1');

		// export file
		XLSX.writeFile(book, `${exportName}.xlsx`);
	};

	return (
		<div>
			<Upload
				name="file"
				beforeUpload={fileHandler}
			>
				<Button>
					<UploadOutlined /> Upload Excel file
				</Button>
			</Upload>

			{rows.length > 0 && (
				<div>
					<Select
						defaultValue={selectedColumn}
						placeholder="Select a column to strip HTML from"
						onChange={handleSelectedColumnChange}
					>
						{columns.map((col) => (
							<Option value={col.dataIndex}>{col.title}</Option>
						))}
					</Select>
					<Button
						type="primary"
						size="large"
						onClick={handleStripHtml}
					>
						Strip HTML
					</Button>
					<Button
						type="primary"
						size="large"
						onClick={handleExportFile}
					>
						Export File
					</Button>
					<Table
						columns={columns}
						dataSource={rows}
						bordered
						title={() => <h2>{title}</h2>}
					/>
				</div>
			)}
		</div>
	);
}

export default ExcelPage;
