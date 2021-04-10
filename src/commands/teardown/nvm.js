'use strict'

const ora = require('ora')

const { execPromise, verifyBin } = require('../../helpers')

const nvm = {
  title: 'NVM - Node Version Manager',
  teardown: async ({ logs }) => {
    const installing = ora('Removing nvm environment')
    !logs && installing.start()

    try {
      verifyBin(['curl', 'bash'])

      await execPromise('rm -rf "$NVM_DIR"', { silent: !logs })

      !logs && installing.succeed('nvm environment removed')
    } catch (error) {
      !logs && installing.fail('nvm environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = nvm
