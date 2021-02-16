'use strict'

const inquirer = require('inquirer')

const notify = require('../../helpers/notify')

const environments = {
  typescript: require('./typescript')
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
        choices: Object.values(environments).map(env => ({
          name: env.title,
          value: env.key
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
