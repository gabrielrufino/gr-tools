const shell = require('shelljs')

const setup = environment => {
  if (environment === 'typescript') {
    shell.exec('npm -g install typescript ts-node')
  } else {
    throw new Error('Environment not found')
  }
}

module.exports = setup
