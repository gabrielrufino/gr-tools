'use strict'

const inquirer = require('inquirer')
const shell = require('shelljs')

const { notify, getUserPassword } = require('../../helpers')

const environments = {
  docker: require('./docker'),
  firebase: require('./firebase'),
  gh: require('./gh'),
  heroku: require('./heroku'),
  kdenlive: require('./kdenlive'),
  minikube: require('./minikube'),
  nvm: require('./nvm'),
  virtualbox: require('./virtualbox'),
  vscode: require('./vscode'),
  workbench: require('./workbench'),
  zsh: require('./zsh')
}

const setup = async (environment, { logs }) => {
  try {
    if (environments[environment]) {
      const password = await getUserPassword()
      await environments[environment].setup({ logs, password })
    } else if (environment === undefined) {
      const answers = await inquirer.prompt({
        type: 'checkbox',
        name: 'environment',
        message: 'Select environments to setup',
        choices: Object.entries(environments).map(([key, env]) => ({
          name: env.title,
          value: key,
          disabled: shell.which(env.executable)
        }))
      })
      const password = await getUserPassword()

      for (const env of answers.environment) {
        await environments[env].setup({ logs, password })
      }
    } else {
      throw new Error('Environment not found')
    }
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error happened'

    console.error(message)
    notify({ message, level: 'critical' })
  }
}

module.exports = setup
