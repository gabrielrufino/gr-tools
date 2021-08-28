'use strict'

const ora = require('ora')
const os = require('os')

const { execPromise, getUserPassword } = require('../../helpers')

const minikube = {
  title: 'minikube',
  executable: 'minikube',
  teardown: async ({ logs }) => {
    const installing = ora('Removing minikube environment')

    try {
      const password = await getUserPassword()

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
