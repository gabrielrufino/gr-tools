'use strict'

const { execPromise, verifyBin } = require('../../helpers')

const nvm = {
  title: 'NVM - Node Version Manager',
  executable: 'nvm',
  setup: async ({ password }) => {
    try {
      verifyBin(['curl', 'bash'])

      await execPromise('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash')
      await execPromise(`echo ${password} | sudo -S npm uninstall -g gr-tools`)
      await execPromise(`echo ${password} | sudo -S apt remove -y nodejs npm`)
      await execPromise(`echo ${password} | sudo -S apt autoremove -y`)
      await execPromise('. ~/.bashrc')
      await execPromise('nvm install v14')
      await execPromise('npm install -g gr-tools')
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = nvm
