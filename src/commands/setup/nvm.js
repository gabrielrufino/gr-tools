'use strict'

const inquirer = require('inquirer')
const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const verifyBin = require('../../helpers/verify-bin')

const nvm = {
  title: 'NVM - Node Version Manager',
  setup: async ({ logs }) => {
    const installing = ora('Installing nvm environment')
    !logs && installing.start()

    try {
      verifyBin(['curl', 'bash'])

      const { password } = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: 'User password: ',
          validate: p => p ? true : 'Enter the password'
        }
      ])

      await execPromise('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash', { silent: !logs })
      await execPromise(`echo ${password} | sudo -S npm uninstall -g gr-tools`)
      await execPromise(`echo ${password} | sudo -S apt remove -y nodejs npm`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S apt autoremove -y`, { silent: !logs })
      await execPromise('. ~/.bashrc', { silent: !logs })
      await execPromise('nvm install v14')
      await execPromise('npm install -g gr-tools')

      !logs && installing.succeed('nvm environment installed')
    } catch (error) {
      !logs && installing.fail('nvm environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = nvm
