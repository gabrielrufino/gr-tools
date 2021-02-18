'use strict'

const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const verifyBin = require('../../helpers/verify-bin')

const mysql = {
  title: 'MySQL',
  setup: async ({ logs }) => {
    const installing = ora('Installing mysql environment')
    !logs && installing.start()

    try {
      verifyBin(['apt'])

      await execPromise('sudo apt update', { silent: !logs })
      await execPromise('sudo apt install -y mysql-server', { silent: !logs })

      !logs && installing.succeed('mysql environment installed')
      notify({ message: 'mysql environment installed' })
    } catch (error) {
      !logs && installing.fail('mysql environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = mysql
