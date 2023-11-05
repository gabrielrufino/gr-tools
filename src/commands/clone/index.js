'use strict'

const github = require('./github')

const { notify, verifyBin } = require('../../helpers')

const clone = async (origin, { npmInstall, ssh }) => {
  try {
    verifyBin(['git', ...(npmInstall ? ['npm'] : [])])

    if (origin === 'github') {
      await github({ npmInstall, ssh })
    } else {
      console.error('Invalid origin')
    }
  } catch {
    const message = 'An unexpected error happened'

    console.error(message)
    notify({ message, level: 'critical' })
  }
}

module.exports = clone
