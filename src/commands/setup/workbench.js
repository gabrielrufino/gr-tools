'use strict'

const { execPromise, notify } = require('../../helpers')

const workbench = {
  title: 'MySQL Workbench',
  executable: 'mysql-workbench-community',
  setup: async ({ password }) => {
    try {
      await execPromise(`echo ${password} | sudo -S snap install mysql-workbench-community --candidate`)
      await execPromise(`echo ${password} | sudo -S snap connect mysql-workbench-community:password-manager-service`)
      await execPromise(`echo ${password} | sudo -S snap connect mysql-workbench-community:ssh-keys`)
      await execPromise(`echo ${password} | sudo -S snap connect mysql-workbench-community:cups-control`)

      notify({ message: 'Workbench environment installed' })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = workbench
