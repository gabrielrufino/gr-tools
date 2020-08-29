const shell = require('shelljs')
const util = require('util')

const exec = util.promisify(shell.exec)

const validatePassword = async password => {
  try {
    await exec(`echo ${password} | sudo -S ls`, { silent: true })
  } catch {
    throw new Error('Wrong password')
  }
}

module.exports = validatePassword
