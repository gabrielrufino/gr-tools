const shell = require('shelljs')

const update = software => {
  switch (software) {
    case 'system':
      shell.exec('sudo apt update')
      shell.exec('sudo apt upgrade -y')
      shell.exec('sudo apt autoremove -y')
      shell.exec('sudo apt autoclean')
      shell.exec('sudo apt clean')
      break
    case 'me':
    case 'gr-tools':
      shell.exec('npm install -g gr-tools@latest')
      break
    default:
      console.log('Invalid software')
      break
  }
}

module.exports = update
