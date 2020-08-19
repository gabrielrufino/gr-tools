const inquirer = require('inquirer')
const ora = require('ora')
const shell = require('shelljs')
const util = require('util')

const exec = util.promisify(shell.exec)

const updateSystem = async ({ logs }) => {
  const { password } = await inquirer.prompt([
    {
      type: 'password',
      name: 'password',
      message: 'User password: ',
      validate: p => p ? true : 'Enter the password'
    }
  ])

  const spinner = ora({
    text: 'Updating system'
  })

  !logs && spinner.start()

  await exec(`echo ${password} | sudo -S apt update`, { silent: !logs })
  await exec(`echo ${password} | sudo -S apt upgrade -y`, { silent: !logs })
  await exec(`echo ${password} | sudo -S apt autoremove -y`, { silent: !logs })
  await exec(`echo ${password} | sudo -S apt clean`, { silent: !logs })

  !logs && spinner.succeed('System updated')
}

const updateMe = ({ logs }) => {
  const spinner = ora({
    text: 'Updating gr-tools'
  })

  !logs && spinner.start()

  shell.exec('npm install -g gr-tools@latest', { silent: !logs })

  !logs && spinner.succeed('gr-tools updated')
}

const update = (software, commandObject) => {
  switch (software) {
    case 'system':
      updateSystem(commandObject)
      break
    case 'me':
    case 'gr-tools':
      updateMe(commandObject)
      break
    default:
      console.log('Invalid software')
      break
  }
}

module.exports = update
