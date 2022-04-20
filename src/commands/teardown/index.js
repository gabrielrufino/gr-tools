'use strict'

const inquirer = require('inquirer')

const { notify, getUserPassword } = require('../../helpers')

const environments = {
  beekeeper: require('./beekeeper'),
  docker: require('./docker'),
  firebase: require('./firebase'),
  gh: require('./gh'),
  heroku: require('./heroku'),
  minikube: require('./minikube'),
  nvm: require('./nvm'),
  virtualbox: require('./virtualbox'),
  vscode: require('./vscode'),
  workbench: require('./workbench'),
  zsh: require('./zsh')
}

const teardown = async (environment, { logs }) => {
  try {
    if (environments[environment]) {
      const password = await getUserPassword()
      await environments[environment].teardown({ logs, password })
    } else {
      const answers = await inquirer.prompt({
        type: 'checkbox',
        name: 'environment',
        message: 'Select environments to setup',
        choices: Object.entries(environments).map(([key, env]) => ({
          name: env.title,
          value: key
        }))
      })
      const password = await getUserPassword()

      for (const env of answers.environment) {
        await environments[env].setup({ logs, password })
      }
    }
  } catch (error) {
    const message = 'An unexpected error happened'

    console.error(message)
    notify({ message, level: 'critical' })
  }
}

module.exports = teardown
