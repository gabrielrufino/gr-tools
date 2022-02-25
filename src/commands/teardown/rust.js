'use strict'

const ora = require('ora')

const { execPromise } = require('../../helpers')

const rust = {
  title: 'Rust',
  executable: 'rustup',
  teardown: async ({ logs }) => {
    const installing = ora('Removing rust environment')

    try {
      !logs && installing.start()

      await execPromise('rustup self uninstall', { silent: !logs })

      !logs && installing.succeed('Rust environment removed')
    } catch (error) {
      !logs && installing.fail('Rust environment not removed')
    }
  }
}

module.exports = rust
