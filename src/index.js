#!/usr/bin/env node

'use strict'

const cli = require('commander')

const banner = require('./banner')
const clone = require('./commands/clone')
const completion = require('./completion')
const screenshot = require('./commands/screenshot')
const setup = require('./commands/setup')
const update = require('./commands/update')
const teardown = require('./commands/teardown/')
const { checkForUpdate } = require('./helpers')
const { name, version } = require('../package.json')

completion.next(() => {
  banner({ version })

  cli
    .name(name)
    .version(version)

  cli
    .command('clone <origin>')
    .option('-l, --logs', 'Prints cloning logs')
    .option('--npm-install', 'Executes \'npm install\' on repositories with package.json file')
    .option('--ssh', 'Clones the repositories using the SSH url')
    .option('--user <user>', 'Origin user', 'gabrielrufino')
    .description('Clone all my repositories or another user\'s repositories from the specified origin')
    .action(clone)

  cli
    .command('screenshot')
    .option('-f, --filename <filename>', 'Filename of the screenshot', undefined)
    .description('Screenshot of a screen area')
    .action(screenshot)

  cli
    .command('update <software>')
    .option('-l, --logs', 'Prints updating logs')
    .description('Update a specified software')
    .action(update)

  cli
    .command('setup [environment]')
    .option('-l, --logs', 'Prints setup logs')
    .description('Makes the setup of an specific environment')
    .action(setup)

  cli
    .command('teardown [environment]')
    .option('-l, --logs', 'Prints teardown logs')
    .description('Makes the teardown of an specific environment')
    .action(teardown)

  cli.parse(process.argv)

  checkForUpdate({ name, version })
})

completion.init()
