const figlet = require('figlet');

const { isRequired } = require('./helpers');

const banner = ({ version = isRequired('version') }) => {
  const output = figlet.textSync('gr-tools');

  console.log(output);
  console.log(`\nVersion: ${version}\n`);
};

module.exports = banner;
