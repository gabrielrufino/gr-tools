'use strict'

const ora = require('ora')

const { execPromise, notify, verifyBin } = require('../../helpers')

const typescript = {
  title: 'TypeScript',
  teardown: async ({ logs }) => {
    verifyBin(['npm'])

    const installing = ora('Removing typescript environment')
    !logs && installing.start()

    try {
      await execPromise('npm -g uninstall typescript ts-node', { silent: !logs })
      !logs && installing.succeed('TypeScript environment removed')

      notify({ message: 'TypeScript environment removed' })
    } catch {
      !logs && installing.fail('TypeScript environment not removed')
    }
  }
}

module.exports = typescript
