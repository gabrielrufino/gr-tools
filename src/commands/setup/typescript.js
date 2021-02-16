'use strict'

const ora = require('ora')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const verifyBin = require('../../helpers/verify-bin')

const typescript = {
  title: 'TypeScript',
  key: 'typescript',
  setup: async ({ logs }) => {
    verifyBin(['npm'])

    const installing = ora('Installing typescript environment')
    !logs && installing.start()

    try {
      await execPromise('npm -g install typescript ts-node', { silent: !logs })
      !logs && installing.succeed('TypeScript environment installed')

      notify({ message: 'TypeScript environment installed' })
    } catch {
      !logs && installing.fail('TypeScript environment not installed')
    }
  }
}

module.exports = typescript
