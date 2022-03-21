'use strict'

const { execPromise, notify, verifyBin } = require('../../helpers')

const zsh = {
  title: 'ZSH - Oh My Zsh',
  teardown: async ({ logs, password }) => {
    verifyBin(['apt', 'sh', 'wget', 'git'])

    if (!logs) {
      console.warn('The options --logs is enable on zsh setup')
    }

    try {
      await execPromise('uninstall_oh_my_zsh')
      await execPromise(`echo ${password} | sudo -S apt -y remove zsh`)
      await execPromise(`echo ${password} | chsh -s $(which bash)`)

      notify({ message: 'zsh environment installed' })
    } catch {
      notify({ message: 'zsh environment not installed' })
    }
  }
}

module.exports = zsh
