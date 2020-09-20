'use strict'

const axios = require('axios')
const ora = require('ora')
const shell = require('shelljs')

const notify = require('../helpers/notify')
const verifyBin = require('../helpers/verify-bin')
const execPromise = require('../helpers/exec-promise')

const clone = async (origin, { logs, npmInstall, user }) => {
  try {
    verifyBin(['git', ...(npmInstall ? ['npm'] : [])])

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

        await execPromise(`git clone ${cloneUrl}`, { silent: !logs })

        !logs && cloningRepository.succeed(`Repository ${name} cloned`)

        if (npmInstall) {
          shell.cd(name)

          if (shell.ls('package.json').code === 0) {
            const installingNpmDependencies = ora('Installing npm dependencies')
            !logs && installingNpmDependencies.start()

            try {
              await execPromise('npm install', { silent: !logs })

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
  } catch {
    const message = 'An unexpected error happened'

    console.error(message)
    notify({ message, level: 'critical' })
  }
}

module.exports = clone
