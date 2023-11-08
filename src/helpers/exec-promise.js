const { promisify } = require('util');

const { exec } = require('shelljs');

const execPromise = promisify(exec);

module.exports = execPromise;
