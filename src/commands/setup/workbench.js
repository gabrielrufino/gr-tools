const inquirer = require('inquirer')
const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')

const workbench = {
  title: 'MySQL Workbench',
  key: 'workbench',
  setup: async ({ logs }) => {
    const { password } = await inquirer.prompt([
      {
        type: 'password',
        name: 'password',
        message: 'User password: ',
        validate: p => p ? true : 'Enter the password'
      }
    ])

    const installing = ora('Installing Workbench environment')
    !logs && installing.start()

    try {
      await execPromise(`echo ${password} | sudo -S snap install mysql-workbench-community --candidate`, { silent: !logs })

      !logs && installing.succeed('Workbench environment installed')
      notify({ message: 'Workbench environment installed' })
    } catch (error) {
      !logs && installing.fail('Workbench environment not installed')
    }
  }
}

module.exports = workbench
