const execPromise = require('./exec-promise')
const isRequired = require('./is-required')

const validatePassword = async (password = isRequired('password')) => {
  try {
    await execPromise(`echo ${password} | sudo -S ls`, { silent: true })
  } catch {
    throw new Error('Wrong password')
  }
}

module.exports = validatePassword
