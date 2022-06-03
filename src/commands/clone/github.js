'use strict'

const axios = require('axios')
const fs = require('fs')
const ora = require('ora')
const shell = require('shelljs')

const { execPromise, notify } = require('../../helpers')

const github = async ({ logs, npmInstall, ssh, user }) => {
  const gettingRepositories = ora('Loading repositories')
  !logs && gettingRepositories.start()

  let page = 1
  let data = []
  const allRepositories = []
  do {
    const response = await axios.get(`https://api.github.com/users/${user}/repos?page=${page}`)
    data = response.data
    allRepositories.push(...data)
    page++
  } while (data.length)

  const repositories = allRepositories
    .filter(repository => !repository.archived)
    .filter(repository => !fs.existsSync(repository.name))

  !logs && gettingRepositories.succeed('Repositories loaded')

  const creatingFolder = ora('Creating folder \'github\'')
  !logs && creatingFolder.start()

  shell.mkdir('github')
  shell.cd('github')

  !logs && creatingFolder.succeed('Folder \'github\' created')

  for (const repository of repositories) {
    const { clone_url: cloneUrl, ssh_url: sshUrl, name } = repository
    const url = ssh ? sshUrl : cloneUrl

    const cloningRepository = ora(`Cloning repository ${name}`)
    !logs && cloningRepository.start()

    await execPromise(`git clone ${url}`, { silent: !logs })
    shell.cd(name)
    await execPromise('git checkout dev', { silent: !logs }).catch(() => {})

    !logs && cloningRepository.succeed(`Repository ${name} cloned`)

    if (npmInstall && shell.ls('package.json').code === 0) {
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

  shell.cd('..')

  notify({ message: 'github cloned' })
}

module.exports = github
