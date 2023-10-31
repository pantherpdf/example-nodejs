const pantherpdf = require('pantherpdf');

const api = {};

async function main()
{
  const report = {...pantherpdf.emptyReport};
  const data = {};
  const result = await pantherpdf.generate({ report, api, data, target: 'html' });
  console.log(result.body);
}
main();
