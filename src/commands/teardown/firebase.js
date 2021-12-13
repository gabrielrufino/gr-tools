'use strict'

const ora = require('ora')

const { execPromise, verifyBin } = require('../../helpers')

const firebase = {
  title: 'firebase - Firebase Tools',
  executable: 'firebase',
  teardown: async ({ logs }) => {
    const installing = ora('Removing firebase environment')

    try {
      verifyBin(['npm'])

      !logs && installing.start()

      await execPromise('npm uninstall -g firebase-tools', { silent: !logs })

      !logs && installing.succeed('firebase environment removed')
    } catch (error) {
      !logs && installing.fail('firebase environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = firebase
