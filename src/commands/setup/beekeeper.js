'use strict'

const { execPromise, verifyBin } = require('../../helpers')

const beekeeper = {
  title: 'Beekeeper Studio',
  executable: 'beekeeper-studio',
  setup: async ({ password }) => {
    try {
      verifyBin(['snap'])

      await execPromise(`echo ${password} | sudo -S snap install beekeeper-studio`)
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = beekeeper
