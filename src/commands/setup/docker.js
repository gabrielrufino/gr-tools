'use strict'

const ora = require('ora')

const { execPromise, getUserPassword } = require('../../helpers')

const docker = {
  title: 'Docker Engine',
  setup: async ({ logs }) => {
    const installing = ora('Installing docker environment')

    const password = await getUserPassword()

    try {
      execPromise(`echo ${password} | sudo -S apt remove -y docker docker-engine docker.io containerd runc`, { silent: !logs })
      execPromise(`echo ${password} | sudo -S apt update`, { silent: !logs })
      execPromise(`echo ${password} | sudo -S apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common`, { silent: !logs })
      execPromise('curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -', { silent: !logs })
      execPromise(`echo ${password} | sudo -S add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`, { silent: !logs })
      execPromise(`echo ${password} | sudo -S apt update`, { silent: !logs })
      execPromise(`echo ${password} | sudo -S apt install -y docker-ce docker-ce-cli containerd.io`, { silent: !logs })

      !logs && installing.succeed('docker environment installed')
    } catch (error) {
      !logs && installing.fail('docker environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = docker
