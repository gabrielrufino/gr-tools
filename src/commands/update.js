'use strict'

const inquirer = require('inquirer')
const ora = require('ora')

const {
  execPromise,
  notify,
  validatePassword,
  verifyBin
} = require('../helpers')

const updateSystem = async ({ logs }) => {
  verifyBin(['echo', 'sudo', 'apt'])

  const { password } = await inquirer.prompt([
    {
      type: 'password',
      name: 'password',
      message: 'User password: ',
      validate: p => p ? true : 'Enter the password'
    }
  ])

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
}

const updateMe = async ({ logs }) => {
  verifyBin(['npm'])

  const spinner = ora({
    text: 'Updating gr-tools'
  })

  !logs && spinner.start()

  await execPromise('npm install -g gr-tools@latest', { silent: !logs })

  !logs && spinner.succeed('gr-tools updated')

  notify({ message: 'gr-tools updated' })
}

const update = (software, commandObject) => {
  try {
    switch (software) {
      case 'system':
        updateSystem(commandObject)
        break
      case 'me':
      case 'gr-tools':
        updateMe(commandObject)
        break
      default:
        console.log('Invalid software')
        break
    }
  } catch {
    const message = 'An unexpected error happened'

    console.error(message)
    notify({ message, level: 'critical' })
  }
}

module.exports = update
