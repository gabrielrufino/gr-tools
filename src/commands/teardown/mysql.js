'use strict'

const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const verifyBin = require('../../helpers/verify-bin')

const mysql = {
  title: 'MySQL',
  teardown: async ({ logs }) => {
    const installing = ora('Removing mysql environment')
    !logs && installing.start()

    try {
      verifyBin(['apt'])

      await execPromise('sudo apt remove -y mysql-server mysql-client mysql-common', { silent: !logs })
      await execPromise('sudo apt autoremove', { silent: !logs })
      await execPromise('sudo apt autoclean', { silent: !logs })
      await execPromise('sudo rm -Rf /var/lib/mysql', { silent: !logs })
      await execPromise('sudo rm -Rf /etc/mysql', { silent: !logs })

      !logs && installing.succeed('mysql environment removed')
      notify({ message: 'mysql environment removed' })
    } catch (error) {
      !logs && installing.fail('mysql environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = mysql
