'use strict'

const {
  execPromise,
  notify,
  verifyBin
} = require('../../helpers')

const me = async () => {
  verifyBin(['npm'])

  await execPromise('npm update -g gr-tools')

  notify({ message: 'gr-tools updated' })
}

module.exports = me
