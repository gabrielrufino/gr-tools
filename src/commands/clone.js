const axios = require('axios')
const ora = require('ora')
const shell = require('shelljs')
const util = require('util')

const notify = require('../helpers/notify')
const verifyBin = require('../helpers/verify-bin')

const exec = util.promisify(shell.exec)

const clone = async (origin, { logs, npmInstall, user }) => {
  verifyBin(['git', ...(npmInstall ? ['npm'] : [])])

  try {
    if (origin === 'github') {
      const gettingRepositories = ora('Loading repositories')
      !logs && gettingRepositories.start()

      const { data } = await axios.get(`https://api.github.com/users/${user}/repos`)

      const repositories = data
        .filter(repo => !repo.archived)

      !logs && gettingRepositories.succeed('Repositories loaded')

      const creatingFolder = ora('Creating folder \'github\'')
      !logs && creatingFolder.start()

      shell.mkdir('github')
      shell.cd('github')

      !logs && creatingFolder.succeed('Folder \'github\' created')

      for (const repository of repositories) {
        const { clone_url: cloneUrl, name } = repository

        const cloningRepository = ora(`Cloning repository ${name}`)
        !logs && cloningRepository.start()

        await exec(`git clone ${cloneUrl}`, { silent: !logs })

        !logs && cloningRepository.succeed(`Repository ${name} cloned`)

        if (npmInstall) {
          shell.cd(name)

          if (shell.ls('package.json').code === 0) {
            const installingNpmDependencies = ora('Installing npm dependencies')
            !logs && installingNpmDependencies.start()

            try {
              await exec('npm install', { silent: !logs })

              !logs && installingNpmDependencies.succeed('Npm dependencies installed')
            } catch {
              !logs && installingNpmDependencies.fail('Npm dependencies not installed')
            }
          }

          shell.cd('..')
        }
      }

      shell.cd('..')

      notify({ message: 'github cloned' })
    } else {
      console.error('Invalid origin')
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = clone
