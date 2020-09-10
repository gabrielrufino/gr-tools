'use strict'

const inquirer = require('inquirer')
const ora = require('ora')

const execPromise = require('../helpers/exec-promise')
const notify = require('../helpers/notify')
const validatePassword = require('../helpers/validate-password')
const verifyBin = require('../helpers/verify-bin')

const setupTypescript = async ({ logs }) => {
  verifyBin(['npm'])

  const installing = ora('Installing typescript environment')
  !logs && installing.start()

  try {
    await execPromise('npm -g install typescript ts-node', { silent: !logs })
    !logs && installing.succeed('TypeScript environment installed')

    notify({ message: 'TypeScript environment installed' })
  } catch {
    !logs && installing.fail('TypeScript environment not installed')
  }
}

const setupDevelopment = async ({ logs }) => {
  verifyBin(['sudo', 'apt', 'npm'])

  const { password } = await inquirer.prompt([
    {
      type: 'password',
      name: 'password',
      message: 'User password: ',
      validate: p => p ? true : 'Enter the password'
    }
  ])

  await validatePassword(password)

  const installing = ora('Installing development environment')

  !logs && installing.start()

  try {
    /**
     * Installing snap
     */
    await execPromise(`echo ${password} | sudo -S apt update`, { silent: !logs })
    await execPromise(`echo ${password} | sudo -S apt install git snapd`, { silent: !logs })
    /**
     * Global npm packages
     */
    await execPromise('npm i -g firebase-tools http-server gtop yarn jest lerna', { silent: !logs })
    /**
     * Snap softwares
     */
    await execPromise(`echo ${password} | sudo -S snap install --classic code`, { silent: !logs })
    await execPromise(`echo ${password} | sudo -S snap install insomnia`, { silent: !logs })
    await execPromise(`echo ${password} | sudo -S snap install android-studio --classic`, { silent: !logs })
    await execPromise(`echo ${password} | sudo -S snap install mysql-workbench-community --candidate`, { silent: !logs })

    !logs && installing.succeed('Development environment installed')

    notify({ message: 'Development environment installed' })
  } catch {
    !logs && installing.fail('Development environment not installed')
  }
}

const setupNvm = async ({ logs }) => {
  verifyBin(['curl', 'bash'])

  const installing = ora('Installing nvm environment')
  !logs && installing.start()

  try {
    await execPromise('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash', { silent: !logs })

    !logs && installing.succeed('nvm environment installed')
  } catch {
    !logs && installing.fail('nvm environment not installed')
  }
}

const setup = async (environment, { logs }) => {
  if (environment === 'typescript') {
    await setupTypescript({ logs })
  } else if (environment === 'development') {
    await setupDevelopment({ logs })
  } else if (environment === 'nvm') {
    await setupNvm({ logs })
  } else {
    throw new Error('Environment not found')
  }
}

module.exports = setup
