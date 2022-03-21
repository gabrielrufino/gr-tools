'use strict'

const ora = require('ora')

const { execPromise, notify, verifyBin } = require('../../helpers')

const virtualbox = {
  title: 'VirtualBox',
  executable: 'virtualbox',
  setup: async ({ logs, password }) => {
    const installing = ora('Installing VirtualBox environment')

    try {
      verifyBin(['apt'])

      !logs && installing.start()
      await execPromise(`echo ${password} | sudo -S apt update`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S apt -y install virtualbox`, { silent: !logs })

      !logs && installing.succeed('VirtualBox environment installed')
      notify({ message: 'VirtualBox environment installed' })
    } catch (error) {
      !logs && installing.fail('VirtualBox environment not installed')
    }
  }
}

module.exports = virtualbox
