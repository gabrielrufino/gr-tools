const { exec } = require('shelljs')

const notify = ({ message, level = 'normal' }) => {
  if (!['low', 'normal', 'critical'].includes(level)) {
    throw new Error('Invalid level. Valid levels: low, normal and critical')
  }

  exec(`notify-send gr-tools --urgency=${level} "${message}"`)
}

module.exports = notify
