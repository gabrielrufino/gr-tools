'use strict'

const ora = require('ora')

const { execPromise, getUserPassword } = require('../../helpers')

const openjdk = {
  title: 'OpenJDK',
  teardown: async ({ logs }) => {
    const installing = ora('Installing openjdk environment')

    try {
      const password = await getUserPassword()
      !logs && installing.start()

      await execPromise(`echo ${password} | sudo -S apt remove -y openjdk-8-jre openjdk-8-jdk`, { silent: !logs })

      !logs && installing.succeed('openjdk environment removed')
    } catch (error) {
      console.error(error.message)
      !logs && installing.fail('openjdk environment not removed')
    }
  }
}

module.exports = openjdk
