'use strict'

const { execPromise, verifyBin } = require('../../helpers')

const firebase = {
  title: 'firebase - Firebase Tools',
  executable: 'firebase',
  setup: async () => {
    try {
      verifyBin(['npm'])

      await execPromise('npm install -g firebase-tools')
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = firebase
