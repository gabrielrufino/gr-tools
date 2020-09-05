const { exec } = require('shelljs')

const notify = ({ message, level = 'normal' }) => {
  if (!message) {
    throw new Error('message id required')
  }

  if (!['low', 'normal', 'critical'].includes(level)) {
    throw new Error('Invalid level. Valid levels: low, normal and critical')
  }

  exec(`notify-send --urgency=${level} gr-tools "${message}"`)
}

module.exports = notify
