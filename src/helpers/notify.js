'use strict'

const { exec } = require('shelljs')

const isRequired = require('./is-required')

const notify = ({ message = isRequired('message'), level = 'normal' }) => {
  if (!['low', 'normal', 'critical'].includes(level)) {
    throw new Error('Invalid level. Valid levels: low, normal and critical')
  }

  exec(`notify-send --urgency=${level} gr-tools "${message}"`)
}

module.exports = notify
