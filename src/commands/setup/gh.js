'use strict'

const inquirer = require('inquirer')
const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const verifyBin = require('../../helpers/verify-bin')

const gh = {
  title: 'gh - Github CLI',
  setup: async ({ logs }) => {
    const installing = ora('Installing gh environment')

    try {
      verifyBin(['snap'])

      const { password } = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: 'User password: ',
          validate: p => p ? true : 'Enter the password'
        }
      ])

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap install --edge gh`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S snap connect gh:ssh-keys`, { silent: !logs })

      !logs && installing.succeed('gh environment installed')
    } catch (error) {
      !logs && installing.fail('gh environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = gh
