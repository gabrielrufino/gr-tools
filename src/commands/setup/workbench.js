'use strict'

const ora = require('ora')

const { execPromise, getUserPassword, notify } = require('../../helpers')

const workbench = {
  title: 'MySQL Workbench',
  executable: 'mysql-workbench-community',
  setup: async ({ logs }) => {
    const installing = ora('Installing Workbench environment')

    try {
      const { password } = await getUserPassword()

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap install mysql-workbench-community --candidate`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S snap connect mysql-workbench-community:password-manager-service`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S snap connect mysql-workbench-community:ssh-keys`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S snap connect mysql-workbench-community:cups-control`, { silent: !logs })

      !logs && installing.succeed('Workbench environment installed')
      notify({ message: 'Workbench environment installed' })
    } catch (error) {
      !logs && installing.fail('Workbench environment not installed')
    }
  }
}

module.exports = workbench
