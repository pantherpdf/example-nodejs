const pantherpdf = require('pantherpdf');

// API object is used to customize file storage and other backend services.
// It can be empty for basic usage.
const api = {};

// Build simple report and generate HTML.
async function main()
{
  // Simple text field which will generate dynamic text.
  const text = { type: 'TextSimple', value: { formula: '"Item " + item' }, children: [] };

  // Repeat Text filed for each element of an array.
  const repeat = {
    type: 'Repeat',
    children: [text],
    source: { formula: 'data.listOfItems' },
    varName: 'item',
    direction: 'row',
  };

  const report = {
    ...pantherpdf.emptyReport,
    widgets: [repeat],
  };

  // Root of source data. It's accessible using `data` variable.
  const data = {
    listOfItems: [ 'A', 'B', 'C', 'D' ],
  };
  // Wrapper to tell library what kind of data we want to use.
  // In this case we supply JavaScript object exactly "as-is".
  // Other options are:
  //   - URL to json or js file,
  //   - Javascript code as a string.
  const dataWrapper = { type: 'as-is', value: data };

  // Generate HTML
  const result = await pantherpdf.generate({
    report,
    api,
    data: dataWrapper,
  });

  // Print result.
  console.log(result.html);
}

main();
