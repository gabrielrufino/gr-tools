#!/usr/bin/env node

const cli = require('commander');

const { bin, name, version } = require('../package.json');

const banner = require('./banner');
const update = require('./commands/update');
const { checkForUpdate } = require('./helpers');

banner({ version });

cli
  .name(Object.keys(bin))
  .version(version);

cli
  .command('update <software>')
  .description('Update a specified software')
  .action(update);

cli.parse(process.argv);

checkForUpdate({ name, version });
