'use strict'

const { execPromise, verifyBin } = require('../../helpers')

const gh = {
  title: 'gh - Github CLI',
  teardown: async ({ password }) => {
    try {
      verifyBin(['snap'])

      await execPromise(`echo ${password} | sudo -S snap remove gh`)
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = gh
