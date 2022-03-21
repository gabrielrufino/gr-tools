'use strict'

const fs = require('fs')
const ora = require('ora')
const os = require('os')
const path = require('path')

const { execPromise, verifyBin } = require('../../helpers')

const minikube = {
  title: 'minikube',
  executable: 'minikube',
  setup: async ({ logs, password }) => {
    const installing = ora('Installing minikube environment')

    try {
      verifyBin(['curl'])

      !logs && installing.start()

      const arch = os.arch()
      if (arch === 'x64') {
        await execPromise('curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64', { silent: !logs })
        await execPromise(`echo ${password} | sudo -S install minikube-linux-amd64 /usr/local/bin/minikube `, { silent: !logs })
        await execPromise('rm minikube-linux-amd64')

        const alias = 'alias kubectl="minikube kubectl --"'

        const zshrcPath = path.join(process.env.HOME, '.zshrc')

        if (fs.existsSync(zshrcPath)) {
          const content = await fs.promises.readFile(zshrcPath, { encoding: 'utf-8' })

          if (!content.includes(alias)) {
            await execPromise(`echo '${alias}' >> ${zshrcPath}`)
          }
        }

        const bashrcPath = path.join(process.env.HOME, '.bashrc')

        if (fs.existsSync(bashrcPath)) {
          const content = await fs.promises.readFile(bashrcPath, { encoding: 'utf-8' })

          if (!content.includes(alias)) {
            await execPromise(`echo '${alias}' >> ${bashrcPath}`)
          }
        }
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
