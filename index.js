#!/usr/bin/env node

const cli = require('commander')

const { version } = require('./package.json')

const clone = require('./commands/clone')

cli
  .version(version)

cli
  .command('clone <origin>')
  .description('Clone all my repositories in the origin specified')
  .action(clone)

cli.parse(process.argv)
