'use strict'

const ora = require('ora')

const { execPromise, getUserPassword } = require('../../helpers')

const docker = {
  title: 'Docker',
  teardown: async ({ logs }) => {
    const installing = ora('Removing docker environment')

    try {
      const password = await getUserPassword()

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S apt purge -y docker-ce docker-ce-cli containerd.io`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S rm -rf /var/lib/docker`, { silent: !logs })

      await execPromise(`echo ${password} | sudo -S rm /usr/local/bin/docker-compose`, { silent: !logs })

      !logs && installing.succeed('docker environment removed')
    } catch (error) {
      !logs && installing.fail('docker environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = docker
