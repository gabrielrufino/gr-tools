'use strict'

const ora = require('ora')

const { execPromise, getUserPassword, verifyBin } = require('../../helpers')

const heroku = {
  title: 'Heroku CLI',
  executable: 'heroku',
  teardown: async ({ logs }) => {
    const installing = ora('Removing heroku environment')

    try {
      verifyBin(['snap'])

      const password = await getUserPassword()

      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap remove heroku`, { silent: !logs })

      !logs && installing.succeed('heroku environment removed')
    } catch (error) {
      !logs && installing.fail('heroku environment not removed')
      console.error(error.message)
    }
  }
}

module.exports = heroku
