const inquirer = require('inquirer')
const ora = require('ora')
const shell = require('shelljs')

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

  shell.exec(`echo ${password} | sudo -S apt update`, { silent: !logs }, () => {
    shell.exec(`echo ${password} | sudo -S apt upgrade -y`, { silent: !logs }, () => {
      shell.exec(`echo ${password} | sudo -S apt autoremove -y`, { silent: !logs }, () => {
        shell.exec(`echo ${password} | sudo -S apt clean`, { silent: !logs }, () => {
          !logs && spinner.succeed('System updated')
        })
      })
    })
  })
}

const updateMe = ({ logs }) => {
  shell.exec('npm install -g gr-tools@latest', { silent: !logs })
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
