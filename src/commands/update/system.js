'use strict'

const ora = require('ora')

const {
  execPromise,
  notify,
  validatePassword,
  verifyBin,
  getUserPassword
} = require('../../helpers')

const system = async ({ logs }) => {
  try {
    verifyBin(['echo', 'sudo', 'apt'])

    const password = await getUserPassword()

    await validatePassword(password)

    const spinner = ora({
      text: 'Updating system'
    })

    !logs && spinner.start()

    await execPromise(`
      echo ${password} | sudo -S apt update
      echo ${password} | sudo -S apt full-upgrade -y
      echo ${password} | sudo -S apt autoremove -y
    `, { silent: !logs })

    !logs && spinner.succeed('System updated')

    notify({ message: 'System updated' })
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = system
