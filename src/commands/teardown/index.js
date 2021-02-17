'use strict'

const inquirer = require('inquirer')

const notify = require('../../helpers/notify')

const environments = {
  typescript: require('./typescript'),
  workbench: require('./workbench')
}

const teardown = async (environment, { logs }) => {
  try {
    if (environments[environment]) {
      await environments[environment].teardown({ logs })
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

      for (const env of answers.environment) {
        await environments[env].setup({ logs })
      }
    }
  } catch (error) {
    const message = 'An unexpected error happened'

    console.error(message)
    notify({ message, level: 'critical' })
  }
}

module.exports = teardown