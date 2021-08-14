const clean = require('./clean')
const clone = require('./clone')
const scan = require('./scan')
const screenshot = require('./screenshot')
const setup = require('./setup')
const teardown = require('./teardown')
const update = require('./update')

const commands = [
  {
    name: 'clean',
    command: 'clean',
    action: clean
  },
  {
    name: 'clone',
    command: 'clone <origin>',
    targets: ['github'],
    action: clone
  },
  {
    name: 'scan',
    command: 'scan <environment>',
    targets: ['network'],
    action: scan
  },
  {
    name: 'screenshot',
    command: 'screenshot',
    action: screenshot
  },
  {
    name: 'setup',
    command: 'setup [environment]',
    targets: [
      'development',
      'docker',
      'gh',
      'heroku',
      'kdenlive',
      'mongodb',
      'mysql',
      'nvm',
      'openjdk',
      'typescript',
      'virtualbox',
      'vscode',
      'workbench',
      'zsh'
    ],
    action: setup
  },
  {
    name: 'teardown',
    command: 'teardown [environment]',
    targets: [
      'development',
      'docker',
      'gh',
      'heroku',
      'kdenlive',
      'mongodb',
      'mysql',
      'nvm',
      'openjdk',
      'typescript',
      'virtualbox',
      'vscode',
      'workbench',
      'zsh'
    ],
    action: teardown
  },
  {
    name: 'update',
    command: 'update <software>',
    targets: ['me', 'gr-tools', 'system', 'repositories'],
    action: update
  }
]

module.exports = commands
