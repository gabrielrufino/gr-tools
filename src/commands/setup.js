'use strict'

const inquirer = require('inquirer')
const ora = require('ora')

const execPromise = require('../helpers/exec-promise')
const notify = require('../helpers/notify')
const validatePassword = require('../helpers/validate-password')
const verifyBin = require('../helpers/verify-bin')

const environments = {
  development: {
    title: 'Development',
    key: 'development',
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
        await execPromise('npm i -g firebase-tools http-server gtop yarn jest lerna', { silent: !logs })
        /**
         * Snap softwares
         */
        await execPromise(`echo ${password} | sudo -S snap install --classic code`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S snap install insomnia`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S snap install android-studio --classic`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S snap install mysql-workbench-community --candidate`, { silent: !logs })

        await execPromise('git config --global user.name "Gabriel Rufino"', { silent: !logs })
        await execPromise('git config --global user.email "contato@gabrielrufino.com"', { silent: !logs })

        !logs && installing.succeed('Development environment installed')

        notify({ message: 'Development environment installed' })
      } catch {
        !logs && installing.fail('Development environment not installed')
      }
    }
  },
  nvm: {
    title: 'NVM - Node Version Manager',
    key: 'nvm',
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
        await execPromise(`echo ${password} | sudo npm uninstall -g gr-tools`)
        await execPromise(`echo ${password} | sudo -S apt remove nodejs npm`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S apt autoremove`, { silent: !logs })
        await execPromise('nvm install v14')
        await execPromise('npm install -g gr-tools')

        !logs && installing.succeed('nvm environment installed')
      } catch {
        !logs && installing.fail('nvm environment not installed')
      }
    }
  },
  typescript: {
    title: 'TypeScript',
    key: 'typescript',
    setup: async ({ logs }) => {
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
  }
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
        choices: Object.values(environments).map(env => ({
          name: env.title,
          value: env.key
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
