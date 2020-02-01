#!/usr/bin/env node

const cli = require('commander')

const banner = require('./banner')
const clone = require('./commands/clone')
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
  .command('update <software>')
  .description('Update a specified software')
  .action(update)

cli.parse(process.argv)
