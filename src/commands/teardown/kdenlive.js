'use strict'

const ora = require('ora')

const { execPromise, getUserPassword } = require('../../helpers')

const kdenlive = {
  title: 'Kdenlive',
  teardown: async ({ logs }) => {
    const installing = ora('Removing kdenlive environment')

    const password = await getUserPassword()

    try {
      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap remove kdenlive`, { silent: !logs })
      !logs && installing.succeed('Kdenlive environment removed')
    } catch (error) {
      !logs && installing.fail('Kdenlive environment not removed')
    }
  }
}

module.exports = kdenlive
