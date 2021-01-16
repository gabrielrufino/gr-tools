const clean = require('./clean')
const clone = require('./clone')
const scan = require('./scan')
const screenshot = require('./screenshot')
const setup = require('./setup')
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
    targets: ['development', 'gh', 'nvm', 'typescript'],
    action: setup
  },
  {
    name: 'update',
    command: 'update <software>',
    targets: ['me', 'system'],
    action: update
  }
]

module.exports = commands
