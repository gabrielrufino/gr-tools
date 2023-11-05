'use strict'

const { execPromise, notify, verifyBin } = require('../../helpers')

const virtualbox = {
  title: 'VirtualBox',
  teardown: async ({ password }) => {
    verifyBin(['apt'])

    try {
      await execPromise(`echo ${password} | sudo apt -y remove virtualbox`)

      notify({ message: 'VirtualBox environment removed' })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = virtualbox
