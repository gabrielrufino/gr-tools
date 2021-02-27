'use strict'

const ora = require('ora')

const { execPromise, getUserPassword } = require('../../helpers')

const vscode = {
  title: 'VSCode - Visual Studio Code',
  teardown: async ({ logs }) => {
    const installing = ora('Removing vscode environment')

    const password = await getUserPassword()

    try {
      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap remove code`, { silent: !logs })

      !logs && installing.succeed('vscode environment removed')
    } catch (error) {
      !logs && installing.fail('vscode environment not removed')
    }
  }
}

module.exports = vscode
