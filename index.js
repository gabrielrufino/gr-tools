#!/usr/bin/env node

const cli = require('commander')

const { version } = require('./package.json')

const clone = require('./commands/clone')
const update = require('./commands/update')

cli
  .version(version)

cli
  .command('clone <origin>')
  .description('Clone all my repositories in the origin specified')
  .action(clone)

cli
  .command('update')
  .description('Self update the CLI')
  .action(update)

cli.parse(process.argv)
