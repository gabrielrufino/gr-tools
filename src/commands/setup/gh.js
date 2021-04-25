'use strict'

const ora = require('ora')

const { execPromise, getUserPassword, verifyBin } = require('../../helpers')

const gh = {
  title: 'gh - Github CLI',
  executable: 'gh',
  setup: async ({ logs }) => {
    const installing = ora('Installing gh environment')

    try {
      verifyBin(['snap'])

      const password = await getUserPassword()

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap install --edge gh`, { silent: !logs })
      await execPromise(`echo ${password} | sudo -S snap connect gh:ssh-keys`, { silent: !logs })

      !logs && installing.succeed('gh environment installed')
    } catch (error) {
      !logs && installing.fail('gh environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = gh
