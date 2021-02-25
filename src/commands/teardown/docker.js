'use strict'

const ora = require('ora')

const { execPromise, getUserPassword } = require('../../helpers')

const docker = {
  title: 'Docker Engine',
  teardown: async ({ logs }) => {
    const installing = ora('Removing docker environment')

    try {
      !logs && installing.start()

      const password = await getUserPassword()

      await execPromise(`echo ${password} | sudo -S apt purge -y docker-ce docker-ce-cli containerd.io`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S rm -rf /var/lib/docker`, { silent: !logs })

      !logs && installing.succeed('docker environment removed')
    } catch (error) {
      !logs && installing.fail('docker environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = docker
