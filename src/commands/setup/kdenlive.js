'use strict'

const ora = require('ora')

const { execPromise } = require('../../helpers')

const kdenlive = {
  title: 'Kdenlive',
  executable: 'kdenlive',
  setup: async ({ logs, password }) => {
    const installing = ora('Installing kdenlive environment')

    try {
      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap install kdenlive`, { silent: !logs })
      !logs && installing.succeed('Kdenlive environment installed')
    } catch (error) {
      !logs && installing.fail('Kdenlive environment not installed')
    }
  }
}

module.exports = kdenlive
