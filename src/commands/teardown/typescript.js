'use strict'

const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const verifyBin = require('../../helpers/verify-bin')

const typescript = {
  title: 'TypeScript',
  key: 'typescript',
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
