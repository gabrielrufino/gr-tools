'use strict'

const omelette = require('omelette')

const commands = require('./commands')

const completion = omelette('gr-tools <command> <target>')

completion
  .on('command', ({ reply }) => {
    reply(commands.map(({ name }) => name))
  })
  .on('target', ({ before, reply }) => {
    const command = commands.find(({ name }) => name === before)

    if (command) {
      reply(command.targets)
    }
  })

module.exports = completion
