'use strict'

const inquirer = require('inquirer')
const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')

const workbench = {
  title: 'MySQL Workbench',
  key: 'workbench',
  teardown: async ({ logs }) => {
    const { password } = await inquirer.prompt([
      {
        type: 'password',
        name: 'password',
        message: 'User password: ',
        validate: p => p ? true : 'Enter the password'
      }
    ])

    const installing = ora('Removing Workbench environment')
    !logs && installing.start()

    try {
      await execPromise(`echo ${password} | sudo -S snap remove mysql-workbench-community`, { silent: !logs })

      !logs && installing.succeed('Workbench environment removed')
      notify({ message: 'Workbench environment removed' })
    } catch (error) {
      !logs && installing.fail('Workbench environment not removed')
    }
  }
}

module.exports = workbench
