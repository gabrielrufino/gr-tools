'use strict'

const { execPromise } = require('../../helpers')

const docker = {
  title: 'Docker',
  executable: 'docker',
  setup: async ({ password }) => {
    try {
      await execPromise(`echo ${password} | sudo -S apt remove -y docker docker-engine docker.io containerd runc`).catch(() => {})
      await execPromise(`echo ${password} | sudo -S apt update`)
      await execPromise(`echo ${password} | sudo -S apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common`)
      await execPromise('curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -')
      await execPromise(`echo ${password} | sudo -S add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`)
      await execPromise(`echo ${password} | sudo -S apt update`)
      await execPromise(`echo ${password} | sudo -S apt install -y docker-ce docker-ce-cli containerd.io`)

      await execPromise(`echo ${password} | sudo -S curl -L "https://github.com/docker/compose/releases/download/1.28.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`)
      await execPromise(`echo ${password} | sudo -S chmod +x /usr/local/bin/docker-compose`)
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = docker
