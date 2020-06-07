const shell = require('shelljs')

const setup = environment => {
  if (environment === 'typescript') {
    shell.exec('npm -g install typescript ts-node')
  } else if (environment === 'development') {
    /**
     * Installing snap
     */
    shell.exec('sudo apt update')
    shell.exec('sudo apt install snapd')
    /**
     * Global npm packages
     */
    shell.exec('npm i -g firebase-tools http-server gtop yarn')
    /**
     * Snap softwares
     */
    shell.exec('sudo snap install --classic code')
    shell.exec('sudo snap install insomnia')
    shell.exec('sudo snap install android-studio --classic')
    shell.exec('sudo snap install mysql-workbench-community --candidate')
  } else {
    throw new Error('Environment not found')
  }
}

module.exports = setup
