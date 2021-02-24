'use strict'

const ora = require('ora')

const { execPromise, getUserPassword, notify, verifyBin } = require('../../helpers')

const mysql = {
  title: 'MySQL',
  teardown: async ({ logs }) => {
    const installing = ora('Removing mysql environment')

    try {
      verifyBin(['apt'])

      const password = await getUserPassword()

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S apt remove -y mysql-server mysql-client mysql-common`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S apt autoremove`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S apt autoclean`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S rm -Rf /var/lib/mysql`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S rm -Rf /etc/mysql`, { silent: !logs })

      !logs && installing.succeed('mysql environment removed')
      notify({ message: 'mysql environment removed' })
    } catch (error) {
      !logs && installing.fail('mysql environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = mysql
