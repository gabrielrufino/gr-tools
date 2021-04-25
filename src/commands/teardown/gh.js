'use strict'

const ora = require('ora')

const { execPromise, verifyBin, getUserPassword } = require('../../helpers')

const gh = {
  title: 'gh - Github CLI',
  teardown: async ({ logs }) => {
    const installing = ora('Removing gh environment')

    try {
      verifyBin(['snap'])

      const password = await getUserPassword()

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap remove gh`, { silent: !logs })

      !logs && installing.succeed('gh environment removed')
    } catch (error) {
      !logs && installing.fail('gh environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = gh
