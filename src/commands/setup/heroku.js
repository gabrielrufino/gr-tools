'use strict'

const ora = require('ora')

const { execPromise, getUserPassword, verifyBin } = require('../../helpers')

const heroku = {
  title: 'Heroku CLI',
  executable: 'heroku',
  setup: async ({ logs }) => {
    const installing = ora('Installing heroku environment')

    try {
      verifyBin(['snap'])

      const password = await getUserPassword()

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap install --classic heroku`, { silent: !logs })

      !logs && installing.succeed('heroku environment installed')
    } catch (error) {
      !logs && installing.fail('heroku environment not installed')
      console.error(error.message)
    }
  }
}

module.exports = heroku
