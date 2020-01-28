const shell = require('shelljs')

const update = () => {
  shell.exec('npm uninstall -g gr-tools')
  shell.exec('npm install -g gr-tools')
}

module.exports = update
