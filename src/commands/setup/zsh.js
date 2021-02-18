'use strict'

const inquirer = require('inquirer')

const execPromise = require('../../helpers/exec-promise')
const notify = require('../../helpers/notify')
const verifyBin = require('../../helpers/verify-bin')

const zsh = {
  title: 'ZSH - Oh My Zsh',
  setup: async ({ logs }) => {
    verifyBin(['apt', 'sh', 'wget', 'git'])

    const { password } = await inquirer.prompt([
      {
        type: 'password',
        name: 'password',
        message: 'User password: ',
        validate: p => p ? true : 'Enter the password'
      }
    ])

    if (!logs) {
      console.warn('The options --logs is enable on zsh setup')
    }

    try {
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
