'use strict'

const ora = require('ora')

const {
  execPromise,
  notify,
  verifyBin
} = require('../../helpers')

const me = async ({ logs }) => {
  verifyBin(['npm'])

  const spinner = ora({
    text: 'Updating gr-tools'
  })

  !logs && spinner.start()

  await execPromise('npm update -g gr-tools', { silent: !logs })

  !logs && spinner.succeed('gr-tools updated')

  notify({ message: 'gr-tools updated' })
}

module.exports = me
