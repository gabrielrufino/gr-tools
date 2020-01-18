#!/usr/bin/env node

const cli = require('commander')

const { version } = require('./package.json')

cli
  .version(version)

cli.parse(process.argv)
