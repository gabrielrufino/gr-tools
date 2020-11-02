#!/usr/bin/env node

'use strict'

const cli = require('commander')

const banner = require('./banner')
const checkForUpdate = require('./helpers/check-for-update')
const clean = require('./commands/clean')
const clone = require('./commands/clone')
const screenshot = require('./commands/screenshot')
const setup = require('./commands/setup')
const update = require('./commands/update')
const { name, version } = require('../package.json')

banner({ version })

cli
  .name(name)
  .version(version)

cli
  .command('clone <origin>')
  .option('-l, --logs', 'Prints cloning logs')
  .option('--npm-install', 'Executes \'npm install\' on repositories with package.json file')
  .option('--user <user>', 'Origin user', 'gabrielrufino')
  .description('Clone all my repositories or another user\'s repositories from the specified origin')
  .action(clone)

cli
  .command('clean')
  .description('Empty trash, etc...')
  .action(clean)

cli
  .command('screenshot')
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

cli.parse(process.argv)

checkForUpdate({ name, version })
