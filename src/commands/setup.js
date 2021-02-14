'use strict'

const inquirer = require('inquirer')
const ora = require('ora')
const si = require('systeminformation')

const execPromise = require('../helpers/exec-promise')
const notify = require('../helpers/notify')
const validatePassword = require('../helpers/validate-password')
const verifyBin = require('../helpers/verify-bin')

const environments = {
  development: {
    title: 'Development',
    key: 'development',
    setup: async ({ logs }) => {
      verifyBin(['sudo', 'apt', 'npm'])

      const { password } = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: 'User password: ',
          validate: p => p ? true : 'Enter the password'
        }
      ])

      await validatePassword(password)

      const installing = ora('Installing development environment')

      !logs && installing.start()

      try {
        /**
         * Installing snap
         */
        await execPromise(`echo ${password} | sudo -S apt update`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S apt install git snapd`, { silent: !logs })
        /**
         * Global npm packages
         */
        await execPromise('npm i -g firebase-tools http-server gtop yarn lerna', { silent: !logs })
        /**
         * Snap softwares
         */
        await execPromise(`echo ${password} | sudo -S snap install --classic code`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S snap install insomnia`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S snap install android-studio --classic`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S snap install mysql-workbench-community --candidate`, { silent: !logs })

        await execPromise('git config --global user.name "Gabriel Rufino"', { silent: !logs })
        await execPromise('git config --global user.email "contato@gabrielrufino.com"', { silent: !logs })

        !logs && installing.succeed('Development environment installed')

        notify({ message: 'Development environment installed' })
      } catch {
        !logs && installing.fail('Development environment not installed')
      }
    }
  },
  gh: {
    title: 'gh - Github CLI',
    key: 'gh',
    setup: async ({ logs }) => {
      const installing = ora('Installing gh environment')

      try {
        verifyBin(['snap'])

        const { password } = await inquirer.prompt([
          {
            type: 'password',
            name: 'password',
            message: 'User password: ',
            validate: p => p ? true : 'Enter the password'
          }
        ])

        !logs && installing.start()

        await execPromise(`echo ${password} | sudo -S snap install --edge gh`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S snap connect gh:ssh-keys`, { silent: !logs })

        !logs && installing.succeed('gh environment installed')
      } catch (error) {
        !logs && installing.fail('gh environment not installed')
        console.error(error.message)
      }
    }
  },
  mongodb: {
    title: 'MongoDB',
    key: 'mongodb',
    setup: async ({ logs }) => {
      const installing = ora('Installing mongodb environment')
      !logs && installing.start()

      try {
        verifyBin(['wget', 'echo', 'apt'])

        await execPromise('wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -', { silent: !logs })

        const { distro, release } = await si.osInfo()

        if (distro === 'Ubuntu' && release.startsWith('18')) {
          await execPromise('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', { silent: !logs })
        } else if (distro === 'Ubuntu' && release.startsWith('20')) {
          await execPromise('echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list', { silent: !logs })
        }

        await execPromise('sudo apt update', { silent: !logs })
        await execPromise('sudo apt install -y mongodb-org', { silent: !logs })

        !logs && installing.succeed('mongodb environment installed')
        notify({ message: 'mongodb environment installed' })
      } catch (error) {
        !logs && installing.fail('mongodb environment not installed')
        console.error(error.message)
      }
    }
  },
  nvm: {
    title: 'NVM - Node Version Manager',
    key: 'nvm',
    setup: async ({ logs }) => {
      const installing = ora('Installing nvm environment')
      !logs && installing.start()

      try {
        verifyBin(['curl', 'bash'])

        const { password } = await inquirer.prompt([
          {
            type: 'password',
            name: 'password',
            message: 'User password: ',
            validate: p => p ? true : 'Enter the password'
          }
        ])

        await execPromise('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash', { silent: !logs })
        await execPromise(`echo ${password} | sudo -S npm uninstall -g gr-tools`)
        await execPromise(`echo ${password} | sudo -S apt remove nodejs npm`, { silent: !logs })
        await execPromise(`echo ${password} | sudo -S apt autoremove`, { silent: !logs })
        await execPromise('nvm install v14')
        await execPromise('npm install -g gr-tools')

        !logs && installing.succeed('nvm environment installed')
      } catch (error) {
        !logs && installing.fail('nvm environment not installed')
        console.error(error.message)
      }
    }
  },
  typescript: {
    title: 'TypeScript',
    key: 'typescript',
    setup: async ({ logs }) => {
      verifyBin(['npm'])

      const installing = ora('Installing typescript environment')
      !logs && installing.start()

      try {
        await execPromise('npm -g install typescript ts-node', { silent: !logs })
        !logs && installing.succeed('TypeScript environment installed')

        notify({ message: 'TypeScript environment installed' })
      } catch {
        !logs && installing.fail('TypeScript environment not installed')
      }
    }
  },
  virtualbox: {
    title: 'VirtualBox',
    key: 'virtualbox',
    setup: async ({ logs }) => {
      verifyBin(['apt'])

      const installing = ora('Installing VirtualBox environment')
      !logs && installing.start()

      try {
        await execPromise('sudo apt update', { silent: !logs })
        await execPromise('sudo apt -y install virtualbox', { silent: !logs })

        !logs && installing.succeed('VirtualBox environment installed')
        notify({ message: 'VirtualBox environment installed' })
      } catch (error) {
        !logs && installing.fail('VirtualBox environment not installed')
      }
    }
  },
  zsh: {
    title: 'ZSH - Oh My Zsh',
    key: 'zsh',
    setup: async ({ logs }) => {
      verifyBin(['apt', 'sh', 'wget', 'git'])

      const { password } = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: 'User password: ',
          validate: p => p ? true : 'Enter the password'
        }
      ])

      if (!logs) {
        console.warn('The options --logs is enable on zsh setup')
      }

      try {
        await execPromise('sudo apt -y install  zsh')
        await execPromise('sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"')
        await execPromise(`echo ${password} | chsh -s $(which zsh)`)

        notify({ message: 'zsh environment installed' })
      } catch {
        notify({ message: 'zsh environment not installed' })
      }
    }
  }
}

const setup = async (environment, { logs }) => {
  try {
    if (environments[environment]) {
      await environments[environment].setup({ logs })
    } else if (environment === undefined) {
      const answers = await inquirer.prompt({
        type: 'checkbox',
        name: 'environment',
        message: 'Select environments to setup',
        choices: Object.values(environments).map(env => ({
          name: env.title,
          value: env.key
        }))
      })

      for (const env of answers.environment) {
        try {
          await environments[env].setup({ logs })
        } catch {}
      }
    } else {
      throw new Error('Environment not found')
    }
  } catch {
    const message = 'An unexpected error happened'

    console.error(message)
    notify({ message, level: 'critical' })
  }
}

module.exports = setup
