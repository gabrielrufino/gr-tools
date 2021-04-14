'use strict'

const { execPromise, getUserPassword, notify, verifyBin } = require('../../helpers')

const zsh = {
  title: 'ZSH - Oh My Zsh',
  executable: 'zsh',
  setup: async ({ logs }) => {
    try {
      verifyBin(['apt', 'sh', 'wget', 'git'])

      const { password } = await getUserPassword()

      if (!logs) {
        console.warn('The options --logs is enable on zsh setup')
      }

      await execPromise(`echo ${password} | sudo -S apt -y install zsh`)
      await execPromise('sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"')
      await execPromise(`echo ${password} | chsh -s $(which zsh)`)

      notify({ message: 'zsh environment installed' })
    } catch {
      notify({ message: 'zsh environment not installed' })
    }
  }
}

module.exports = zsh
