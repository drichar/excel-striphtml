# Excel StripHTML

Demo: [https://excel-striphtml.netlify.app](https://excel-striphtml.netlify.app)

This is a utility for removing HTML tags and entities from an Excel spreadsheet. It uses [SheetJS js-xlsx](http://sheetjs.com/) to parse the input file and write the edited file. The worksheet preview is an [Ant Design](https://ant.design/) `Table` component with pagination and responsive horizontal scrolling. To strip HTML tags from cells [ericnorris/striptags](https://github.com/ericnorris/striptags) is used.

### Usage

1. Click "Upload an Excel file" to select a file (.xlsx format only)

2. Choose a column to strip HTML

3. Click "Strip HTML"

4. If cells have been edited, click "Export File" to save a new .xlsx file (original file name with `_stripHTML` appended)

5. To start again, click "Upload a new Excel file"

### Warning ⚠️

The free public version of [SheetJS js-xlsx](http://sheetjs.com/) cannot format cells, so the exported version will have no formatting. I'm looking into alternatives that will preserve formatting of the original file.

### Development

To run the app locally
```
yarn start
```

To build
```
yarn build
```
