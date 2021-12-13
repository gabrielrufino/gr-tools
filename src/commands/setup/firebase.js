'use strict'

const ora = require('ora')

const { execPromise, verifyBin } = require('../../helpers')

const firebase = {
  title: 'firebase - Firebase Tools',
  executable: 'firebase',
  setup: async ({ logs }) => {
    const installing = ora('Installing firebase environment')

    try {
      verifyBin(['npm'])

      !logs && installing.start()

      await execPromise('npm install -g firebase-tools', { silent: !logs })

      !logs && installing.succeed('firebase environment installed')
    } catch (error) {
      !logs && installing.fail('firebase environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = firebase
