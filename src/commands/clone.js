const axios = require('axios')
const shell = require('shelljs')

const clone = async (origin, { npmInstall, user }) => {
  if (origin === 'github') {
    const { data } = await axios.get(`https://api.github.com/users/${user}/repos`)

    const repositories = data
      .filter(repo => !repo.archived)

    shell.mkdir('github')
    shell.cd('github')

    repositories.forEach(({ clone_url: cloneUrl, name }) => {
      shell.exec(`git clone ${cloneUrl}`)

      if (npmInstall) {
        shell.cd(name)

        if (shell.ls('package.json').code === 0) {
          shell.exec('npm install')
        }

        shell.cd('..')
      }
    })

    shell.cd('..')
  } else {
    console.error('Invalid origin')
  }
}

module.exports = clone
