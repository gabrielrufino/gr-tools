'use strict'

const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const verifyBin = require('../../helpers/verify-bin')

const mongodb = {
  title: 'MongoDB',
  teardown: async ({ logs }) => {
    const installing = ora('Removing mongodb environment')
    !logs && installing.start()

    try {
      verifyBin(['wget', 'echo', 'apt'])

      await execPromise('sudo service mongod stop', { silent: !logs })
      await execPromise('sudo apt purge mongodb-org*', { silent: !logs })
      await execPromise('sudo rm -R /var/log/mongodb', { silent: !logs })
      await execPromise('sudo rm -R /var/lib/mongodb', { silent: !logs })

      !logs && installing.succeed('mongodb environment removed')
      notify({ message: 'mongodb environment removed' })
    } catch (error) {
      !logs && installing.fail('mongodb environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = mongodb
