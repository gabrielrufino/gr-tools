'use strict'

const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const verifyBin = require('../../helpers/verify-bin')

const virtualbox = {
  title: 'VirtualBox',
  setup: async ({ logs }) => {
    verifyBin(['apt'])

    const installing = ora('Installing VirtualBox environment')
    !logs && installing.start()

    try {
      await execPromise('sudo apt update', { silent: !logs })
      await execPromise('sudo apt -y install virtualbox', { silent: !logs })

      !logs && installing.succeed('VirtualBox environment installed')
      notify({ message: 'VirtualBox environment installed' })
    } catch (error) {
      !logs && installing.fail('VirtualBox environment not installed')
    }
  }
}

module.exports = virtualbox
