'use strict'

const ora = require('ora')
const si = require('systeminformation')

const { execPromise, getUserPassword, notify, verifyBin } = require('../../helpers')

const mongodb = {
  title: 'MongoDB',
  executable: 'mongo',
  setup: async ({ logs }) => {
    const installing = ora('Installing mongodb environment')

    try {
      verifyBin(['wget', 'echo', 'apt'])

      const password = await getUserPassword()

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S apt install -y gnupg`, { silent: !logs })
      await execPromise('wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -', { silent: !logs })

      const { distro, release } = await si.osInfo()

      if (distro === 'Ubuntu' && release.startsWith('18')) {
        await execPromise('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', { silent: !logs })
      } else if (distro === 'Ubuntu' && release.startsWith('20')) {
        await execPromise('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', { silent: !logs })
      }

      await execPromise(`echo ${password} | sudo -S apt update`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S apt install -y mongodb-org`, { silent: !logs })

      !logs && installing.succeed('mongodb environment installed')
      notify({ message: 'mongodb environment installed' })
    } catch (error) {
      !logs && installing.fail('mongodb environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = mongodb
