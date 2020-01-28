const axios = require('axios')
const shell = require('shelljs')

const clone = async origin => {
  if (origin === 'github') {
    const { data } = await axios.get('https://api.github.com/users/gabrielrufino/repos')

    const urls = data.filter(repo => !repo.archived).map(repo => repo.clone_url)

    shell.mkdir('github')
    shell.cd('github')

    urls.forEach(url => {
      shell.exec(`git clone ${url}`)
    })

    shell.cd('..')
  } else {
    console.error('Invalid origin')
  }
}

module.exports = clone
