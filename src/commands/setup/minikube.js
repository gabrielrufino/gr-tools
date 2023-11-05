'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')

const { execPromise, verifyBin } = require('../../helpers')

const minikube = {
  title: 'minikube',
  executable: 'minikube',
  setup: async ({ password }) => {
    try {
      verifyBin(['curl'])

      const arch = os.arch()
      if (arch === 'x64') {
        await execPromise(`
          curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
          echo ${password} | sudo -S install minikube-linux-amd64 /usr/local/bin/minikube
          rm minikube-linux-amd64
        `)

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
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = minikube
