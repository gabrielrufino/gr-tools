'use strict'

const inquirer = require('inquirer')
const shell = require('shelljs')

const { notify } = require('../../helpers')

const environments = {
  docker: require('./docker'),
  firebase: require('./firebase'),
  gh: require('./gh'),
  heroku: require('./heroku'),
  kdenlive: require('./kdenlive'),
  minikube: require('./minikube'),
  nvm: require('./nvm'),
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
          value: key,
          disabled: shell.which(env.executable)
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
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error happened'

    console.error(message)
    notify({ message, level: 'critical' })
  }
}

module.exports = setup
