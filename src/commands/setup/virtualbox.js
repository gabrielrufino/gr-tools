'use strict'

const { execPromise, notify, verifyBin } = require('../../helpers')

const virtualbox = {
  title: 'VirtualBox',
  executable: 'virtualbox',
  setup: async ({ password }) => {
    try {
      verifyBin(['apt'])

      await execPromise(`echo ${password} | sudo -S apt update`)
      await execPromise(`echo ${password} | sudo -S apt -y install virtualbox`)

      notify({ message: 'VirtualBox environment installed' })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = virtualbox
