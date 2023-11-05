'use strict'

const axios = require('axios')
const fs = require('fs')
const shell = require('shelljs')

const { execPromise, notify } = require('../../helpers')

const github = async ({ npmInstall, ssh }) => {
  let page = 1
  let data = []
  const allRepositories = []
  do {
    const response = await axios.get(`https://api.github.com/users/gabrielrufino/repos?page=${page}`)
    data = response.data
    allRepositories.push(...data)
    page++
  } while (data.length)

  const repositories = allRepositories
    .filter(repository => !repository.archived)
    .filter(repository => !fs.existsSync(repository.name))

  shell.mkdir('github')
  shell.cd('github')

  for (const repository of repositories) {
    const { clone_url: cloneUrl, ssh_url: sshUrl, name } = repository
    const url = ssh ? sshUrl : cloneUrl

    await execPromise(`git clone ${url}`)
    shell.cd(name)
    await execPromise('git checkout develop').catch(() => {})

    if (npmInstall && shell.ls('package.json').code === 0) {
      try {
        await execPromise('npm install')
      } catch {
        console.error('Npm dependencies not installed')
      }
    }

    shell.cd('..')
  }

  shell.cd('..')

  notify({ message: 'github cloned' })
}

module.exports = github
