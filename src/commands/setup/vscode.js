'use strict'

const ora = require('ora')

const { execPromise, getUserPassword } = require('../../helpers')

const vscode = {
  title: 'VSCode - Visual Studio Code',
  executable: 'code',
  setup: async ({ logs }) => {
    const installing = ora('Installing vscode environment')

    const password = await getUserPassword()

    try {
      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap install --classic code`, { silent: !logs })

      const extensionIds = [
        'davidanson.vscode-markdownlint',
        'dbaeumer.vscode-eslint',
        'dracula-theme.theme-dracula',
        'eamodio.gitlens',
        'ms-azuretools.vscode-docker',
        'tomoki1207.pdf'
      ]
      for (const extensionId of extensionIds) {
        await execPromise(`code --install-extension ${extensionId}`, { silent: !logs })
      }

      !logs && installing.succeed('vscode environment installed')
    } catch (error) {
      !logs && installing.fail('vscode environment not installed')
    }
  }
}

module.exports = vscode
