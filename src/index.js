#!/usr/bin/env node

const cli = require('commander');

const { name, version } = require('../package.json');

const banner = require('./banner');
const clone = require('./commands/clone');
const setup = require('./commands/setup');
const update = require('./commands/update');
const { checkForUpdate } = require('./helpers');

banner({ version });

cli
  .name(name)
  .version(version);

cli
  .command('clone <origin>')
  .option('--npm-install', 'Executes \'npm install\' on repositories with package.json file')
  .description('Clone all my repositories or another user\'s repositories from the specified origin')
  .action(clone);

cli
  .command('update <software>')
  .description('Update a specified software')
  .action(update);

cli
  .command('setup [environment]')
  .description('Makes the setup of an specific environment')
  .action(setup);

cli.parse(process.argv);

checkForUpdate({ name, version });
