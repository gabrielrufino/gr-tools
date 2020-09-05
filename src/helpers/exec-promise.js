const { exec } = require('shelljs')
const { promisify } = require('util')

const execPromise = promisify(exec)

module.exports = execPromise
