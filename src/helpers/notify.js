const { exec } = require('shelljs')

const notify = ({ message }) => {
  exec(`notify-send gr-tools "${message}"`)
}

module.exports = notify
