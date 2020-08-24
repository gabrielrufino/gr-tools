const inquirer = require('inquirer')
const ora = require('ora')
const shell = require('shelljs')
const util = require('util')

const verifyBin = require('../helpers/verify-bin')

const exec = util.promisify(shell.exec)

const setup = async (environment, { logs }) => {
  if (environment === 'typescript') {
    verifyBin(['npm'])

    const installing = ora('Installing typescript environment')
    !logs && installing.start()

    try {
      await exec('npm -g install typescript ts-node', { silent: !logs })
      !logs && installing.succeed('TypeScript environment installed')
    } catch {
      !logs && installing.fail('TypeScript environment not installed')
    }
  } else if (environment === 'development') {
    verifyBin(['sudo', 'apt', 'npm'])

    const { password } = await inquirer.prompt([
      {
        type: 'password',
        name: 'password',
        message: 'User password: ',
        validate: p => p ? true : 'Enter the password'
      }
    ])

    const installing = ora('Installing development environment')

    !logs && installing.start()

    try {
      /**
       * Installing snap
       */
      await exec(`echo ${password} | sudo -S apt update`, { silent: !logs })
      await exec(`echo ${password} | sudo -S apt install git snapd`, { silent: !logs })
      /**
       * Global npm packages
       */
      await exec('npm i -g firebase-tools http-server gtop yarn jest lerna', { silent: !logs })
      /**
       * Snap softwares
       */
      await exec(`echo ${password} | sudo -S snap install --classic code`, { silent: !logs })
      await exec(`echo ${password} | sudo -S snap install insomnia`, { silent: !logs })
      await exec(`echo ${password} | sudo -S snap install android-studio --classic`, { silent: !logs })
      await exec(`echo ${password} | sudo -S snap install mysql-workbench-community --candidate`, { silent: !logs })

      !logs && installing.succeed('Development environment installed')
    } catch {
      !logs && installing.fail('Development environment not installed')
    }
  } else {
    throw new Error('Environment not found')
  }
}

module.exports = setup
