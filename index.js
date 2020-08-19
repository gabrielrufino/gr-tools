#!/usr/bin/env node

const cli = require('commander')
const compareVersions = require('compare-versions')
const latestVersion = require('latest-version')

const banner = require('./banner')
const clean = require('./commands/clean')
const clone = require('./commands/clone')
const npm = require('./commands/npm')
const screenshot = require('./commands/screenshot')
const setup = require('./commands/setup')
const update = require('./commands/update')
const { name, version } = require('./package.json')

banner({ version })

cli
  .name(name)
  .version(version)

cli
  .command('clone <origin>')
  .option('--user <user>', 'Origin user', 'gabrielrufino')
  .description('Clone all my repositories in the origin specified')
  .action(clone)

cli
  .command('clean')
  .description('Empty trash, etc...')
  .action(clean)

cli
  .command('npm <subcommand>')
  .description('Actions related to npm packages')
  .action(npm)

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
  .command('setup <environment>')
  .description('Makes the setup of an specific environment')
  .action(setup)

cli.parse(process.argv)

const checkForUpdate = async () => {
  const newVersion = await latestVersion(name)

  const updateAvailable = compareVersions(newVersion, version)

  if (updateAvailable) {
    console.log(`New version available: ${newVersion}`)
  }
}

checkForUpdate()
