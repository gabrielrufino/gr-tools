'use strict'

const ora = require('ora')

const { execPromise, verifyBin } = require('../../helpers')

const beekeeper = {
  title: 'Beekeeper Studio',
  executable: 'beekeeper-studio',
  setup: async ({ logs, password }) => {
    const installing = ora('Installing beekeeper environment')

    try {
      verifyBin(['snap'])

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap install beekeeper-studio`, { silent: !logs })

      !logs && installing.succeed('beekeeper environment installed')
    } catch (error) {
      !logs && installing.fail('beekeeper environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = beekeeper
