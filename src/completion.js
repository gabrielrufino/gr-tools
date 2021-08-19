'use strict'

const omelette = require('omelette')
const { readdir } = require('fs/promises')
const { join } = require('path')

const completion = omelette('gr-tools <command> <target>')

completion
  .onAsync('command', async ({ reply }) => {
    try {
      const blacklist = ['clean.test.js', 'index.js', 'screenshot.test.js']
      const paths = await readdir(join(__dirname, 'commands'))
      const commands = paths
        .filter(path => !blacklist.includes(path))

      reply(commands)
    } catch {}
  })

completion
  .onAsync('target', async ({ before, reply }) => {
    try {
      const paths = await readdir(join(__dirname, 'commands', before))
      const targets = paths
        .filter(path => !path.endsWith('.test.js') && path !== 'index.js')
        .map(path => path.replace('.js', ''))

      reply(targets)
    } catch {}
  })

module.exports = completion
