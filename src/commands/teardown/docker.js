'use strict'

const { execPromise } = require('../../helpers')

const docker = {
  title: 'Docker',
  teardown: async ({ password }) => {
    try {
      await execPromise(`echo ${password} | sudo -S apt purge -y docker-ce docker-ce-cli containerd.io`)
      await execPromise(`echo ${password} | sudo -S rm -rf /var/lib/docker`)

      await execPromise(`echo ${password} | sudo -S rm /usr/local/bin/docker-compose`)
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = docker
