'use strict'

const ora = require('ora')
const si = require('systeminformation')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const verifyBin = require('../../helpers/verify-bin')

const mongodb = {
  title: 'MongoDB',
  setup: async ({ logs }) => {
    const installing = ora('Installing mongodb environment')
    !logs && installing.start()

    try {
      verifyBin(['wget', 'echo', 'apt'])

      await execPromise('sudo apt install gnupg', { silent: !logs })
      await execPromise('wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -', { silent: !logs })

      const { distro, release } = await si.osInfo()

      if (distro === 'Ubuntu' && release.startsWith('18')) {
        await execPromise('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', { silent: !logs })
      } else if (distro === 'Ubuntu' && release.startsWith('20')) {
        await execPromise('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', { silent: !logs })
      }

      await execPromise('sudo apt update', { silent: !logs })
      await execPromise('sudo apt install -y mongodb-org', { silent: !logs })

      !logs && installing.succeed('mongodb environment installed')
      notify({ message: 'mongodb environment installed' })
    } catch (error) {
      !logs && installing.fail('mongodb environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = mongodb
