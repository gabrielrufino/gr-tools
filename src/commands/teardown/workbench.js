'use strict'

const ora = require('ora')

const { execPromise, getUserPassword, notify } = require('../../helpers')

const workbench = {
  title: 'MySQL Workbench',
  teardown: async ({ logs }) => {
    const password = await getUserPassword()

    const installing = ora('Removing Workbench environment')
    !logs && installing.start()

    try {
      await execPromise(`echo ${password} | sudo -S snap remove mysql-workbench-community`, { silent: !logs })

      !logs && installing.succeed('Workbench environment removed')
      notify({ message: 'Workbench environment removed' })
    } catch (error) {
      !logs && installing.fail('Workbench environment not removed')
    }
  }
}

module.exports = workbench
