'use strict'

const ora = require('ora')
const os = require('os')

const { execPromise } = require('../../helpers')

const minikube = {
  title: 'minikube',
  executable: 'minikube',
  teardown: async ({ logs, password }) => {
    const installing = ora('Removing minikube environment')

    try {
      !logs && installing.start()

      const arch = os.arch()
      if (arch === 'x64') {
        await execPromise(`echo ${password} | sudo -S rm $(which minikube)`, { silent: !logs })
      } else {
        throw new Error('Arch is not supported')
      }

      !logs && installing.succeed('minikube environment removed')
    } catch (error) {
      !logs && installing.fail('minikube environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = minikube
