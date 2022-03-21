'use strict'

const ora = require('ora')

const { execPromise, verifyBin } = require('../../helpers')

const nvm = {
  title: 'NVM - Node Version Manager',
  executable: 'nvm',
  setup: async ({ logs, password }) => {
    const installing = ora('Installing nvm environment')

    try {
      verifyBin(['curl', 'bash'])

      !logs && installing.start()

      await execPromise('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash', { silent: !logs })
      await execPromise(`echo ${password} | sudo -S npm uninstall -g gr-tools`)
      await execPromise(`echo ${password} | sudo -S apt remove -y nodejs npm`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S apt autoremove -y`, { silent: !logs })
      await execPromise('. ~/.bashrc', { silent: !logs })
      await execPromise('nvm install v14')
      await execPromise('npm install -g gr-tools')

      !logs && installing.succeed('nvm environment installed')
    } catch (error) {
      !logs && installing.fail('nvm environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = nvm
