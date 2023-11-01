'use strict'

const ora = require('ora')

const { execPromise } = require('../../helpers')

const vscode = {
  title: 'VSCode - Visual Studio Code',
  teardown: async ({ logs, password }) => {
    const installing = ora('Removing vscode environment')

    try {
      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S apt remove code`, { silent: !logs })

      !logs && installing.succeed('vscode environment removed')
    } catch (error) {
      !logs && installing.fail('vscode environment not removed')
    }
  }
}

module.exports = vscode
