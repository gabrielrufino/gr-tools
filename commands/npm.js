const fs = require('fs')
const inquirer = require('inquirer')
const path = require('path')

const subcommands = {
  'up-version': async () => {
    const packageJson = require(path.join(process.cwd(), '/package.json'))

    let [major, minor, patch] = packageJson.version.split('.')

    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'What type of update?',
      choices: ['Patch', 'Minor', 'Major']
    })

    if (type === 'Patch') {
      patch = Number(patch) + 1
    } else if (type === 'Minor') {
      minor = Number(minor) + 1
    } else if (type === 'Major') {
      major = Number(major) + 1
    }

    packageJson.version = [major, minor, patch].join('.')

    fs.writeFileSync(path.join(process.cwd(), '/package.json'), `${JSON.stringify(packageJson, null, 2)}\n`, { encoding: 'utf8' })
  }
}

const npm = async subcommand => {
  subcommands[subcommand]()
}

module.exports = npm
