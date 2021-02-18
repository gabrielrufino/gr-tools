'use strict'

const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const verifyBin = require('../../helpers/verify-bin')

const virtualbox = {
  title: 'VirtualBox',
  teardown: async ({ logs }) => {
    verifyBin(['apt'])

    const installing = ora('Removing VirtualBox environment')
    !logs && installing.start()

    try {
      await execPromise('sudo apt -y remove virtualbox', { silent: !logs })

      !logs && installing.succeed('VirtualBox environment removed')
      notify({ message: 'VirtualBox environment removed' })
    } catch (error) {
      !logs && installing.fail('VirtualBox environment not removed')
    }
  }
}

module.exports = virtualbox
