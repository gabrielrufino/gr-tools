'use strict'

const inquirer = require('inquirer')
const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const validatePassword = require('../../helpers/validate-password')
const verifyBin = require('../../helpers/verify-bin')

const environments = {
  development: {
    title: 'Development',
    setup: async ({ logs }) => {
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
        await execPromise('npm i -g firebase-tools http-server gtop yarn lerna', { silent: !logs })
        /**
         * Snap softwares
         */
        await execPromise(`echo ${password} | sudo -S snap install --classic code`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S snap install insomnia`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S snap install android-studio --classic`, { silent: !logs })

        await execPromise('git config --global user.name "Gabriel Rufino"', { silent: !logs })
        await execPromise('git config --global user.email "contato@gabrielrufino.com"', { silent: !logs })

        !logs && installing.succeed('Development environment installed')

        notify({ message: 'Development environment installed' })
      } catch {
        !logs && installing.fail('Development environment not installed')
      }
    }
  },
  docker: require('./docker'),
  gh: require('./gh'),
  kdenlive: require('./kdenlive'),
  mongodb: require('./mongodb'),
  mysql: require('./mysql'),
  nvm: require('./nvm'),
  openjdk: require('./openjdk'),
  typescript: require('./typescript'),
  virtualbox: require('./virtualbox'),
  vscode: require('./vscode'),
  workbench: require('./workbench'),
  zsh: require('./zsh')
}

const setup = async (environment, { logs }) => {
  try {
    if (environments[environment]) {
      await environments[environment].setup({ logs })
    } else if (environment === undefined) {
      const answers = await inquirer.prompt({
        type: 'checkbox',
        name: 'environment',
        message: 'Select environments to setup',
        choices: Object.entries(environments).map(([key, env]) => ({
          name: env.title,
          value: key
        }))
      })

      for (const env of answers.environment) {
        try {
          await environments[env].setup({ logs })
        } catch {}
      }
    } else {
      throw new Error('Environment not found')
    }
  } catch {
    const message = 'An unexpected error happened'

    console.error(message)
    notify({ message, level: 'critical' })
  }
}

module.exports = setup
