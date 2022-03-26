'use strict'

const ora = require('ora')

const { execPromise, notify, verifyBin } = require('../../helpers')

const virtualbox = {
  title: 'VirtualBox',
  teardown: async ({ logs, password }) => {
    verifyBin(['apt'])

    const installing = ora('Removing VirtualBox environment')
    !logs && installing.start()

    try {
      await execPromise(`echo ${password} | sudo apt -y remove virtualbox`, { silent: !logs })

      !logs && installing.succeed('VirtualBox environment removed')
      notify({ message: 'VirtualBox environment removed' })
    } catch (error) {
      !logs && installing.fail('VirtualBox environment not removed')
    }
  }
}

module.exports = virtualbox
