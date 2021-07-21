'use strict'

const ora = require('ora')

const { execPromise, getUserPassword } = require('../../helpers')

const postman = {
  title: 'Postman',
  executable: 'postman',
  setup: async ({ logs }) => {
    const installing = ora('Installing postman environment')

    const password = await getUserPassword()

    try {
      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap install postman`, { silent: !logs })

      !logs && installing.succeed('postman environment installed')
    } catch (error) {
      !logs && installing.fail('postman environment not installed')
    }
  }
}

module.exports = postman
