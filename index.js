#!/usr/bin/env node

const cli = require('commander')

const banner = require('./banner')
const clone = require('./commands/clone')
const screenshot = require('./commands/screenshot')
const setup = require('./commands/setup')
const update = require('./commands/update')
const { version } = require('./package.json')

banner({ version })

cli
  .version(version)

cli
  .command('clone <origin>')
  .description('Clone all my repositories in the origin specified')
  .action(clone)

cli
  .command('screenshot')
  .description('Screenshot of a screen area')
  .action(screenshot)

cli
  .command('update <software>')
  .description('Update a specified software')
  .action(update)

cli
  .command('setup <environment>')
  .description('Makes the setup of an specific environment')
  .action(setup)

cli.parse(process.argv)
