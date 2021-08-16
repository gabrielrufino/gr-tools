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

    await execPromise(`echo ${password} | sudo -S apt update`, { silent: !logs })
    await execPromise(`echo ${password} | sudo -S apt upgrade -y`, { silent: !logs })
    await execPromise(`echo ${password} | sudo -S apt autoremove -y`, { silent: !logs })
    await execPromise(`echo ${password} | sudo -S apt clean`, { silent: !logs })

    !logs && spinner.succeed('System updated')

    notify({ message: 'System updated' })
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = system
