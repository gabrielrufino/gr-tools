'use strict'

const ora = require('ora')

const { execPromise, getUserPassword, notify, verifyBin } = require('../../helpers')

const mongodb = {
  title: 'MongoDB',
  teardown: async ({ logs }) => {
    const installing = ora('Removing mongodb environment')

    try {
      verifyBin(['apt'])

      const password = await getUserPassword()

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S service mongod stop`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S apt-get purge -y mongodb-org*`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S rm -R /var/log/mongodb`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S rm -R /var/lib/mongodb`, { silent: !logs })

      !logs && installing.succeed('mongodb environment removed')
      notify({ message: 'mongodb environment removed' })
    } catch (error) {
      !logs && installing.fail('mongodb environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = mongodb
