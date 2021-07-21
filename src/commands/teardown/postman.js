'use strict'

const ora = require('ora')

const { execPromise, getUserPassword } = require('../../helpers')

const postman = {
  title: 'Postman',
  executable: 'postman',
  teardown: async ({ logs }) => {
    const installing = ora('Removing postman environment')

    const password = await getUserPassword()

    try {
      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S snap remove postman`, { silent: !logs })

      !logs && installing.succeed('postman environment removed')
    } catch (error) {
      !logs && installing.fail('postman environment not removed')
    }
  }
}

module.exports = postman
