'use strict'

const ora = require('ora')
const os = require('os')

const { execPromise, getUserPassword, verifyBin } = require('../../helpers')

const minikube = {
  title: 'minikube',
  executable: 'minikube',
  setup: async ({ logs }) => {
    const installing = ora('Installing minikube environment')

    try {
      verifyBin(['curl'])

      const password = await getUserPassword()

      !logs && installing.start()

      const arch = os.arch()
      if (arch === 'x64') {
        await execPromise('curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64', { silent: !logs })
        await execPromise(`echo ${password} | sudo -S install minikube-linux-amd64 /usr/local/bin/minikube `, { silent: !logs })
        await execPromise('rm minikube-linux-amd64')
      } else {
        throw new Error('Arch is not supported')
      }

      !logs && installing.succeed('minikube environment installed')
    } catch (error) {
      !logs && installing.fail('minikube environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = minikube
