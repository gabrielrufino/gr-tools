'use strict'

const ora = require('ora')

const { execPromise, getUserPassword, notify, verifyBin } = require('../../helpers')

const mysql = {
  title: 'MySQL',
  setup: async ({ logs }) => {
    try {
      verifyBin(['apt'])

      const password = await getUserPassword()

      const installing = ora('Installing mysql environment')
      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S apt update`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S apt install -y mysql-server`, { silent: !logs })

      !logs && installing.succeed('mysql environment installed')
      notify({ message: 'mysql environment installed' })
    } catch (error) {
      !logs && installing.fail('mysql environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = mysql
